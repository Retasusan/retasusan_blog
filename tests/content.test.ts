import assert from "node:assert/strict";
import { test } from "node:test";
import { cpSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync, unlinkSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { stringify } from "yaml";
import { loadPortfolioContent } from "../src/lib/content/load";
import { parseContent } from "../src/lib/content/parse";
import { activitySchema, projectSchema } from "../src/lib/content/schema";
import { buildContent } from "../scripts/content-build";
import { watchMarkdown } from "../scripts/content-watch";
import type { PortfolioContent } from "../src/content/types";

function document(data: unknown, body = "") {
  return `---\n${stringify(data)}---\n\n${body}\n`;
}

function fixture(t: { after: (callback: () => void) => void }) {
  const temporary = mkdtempSync(join(tmpdir(), "portfolio-content-"));
  t.after(() => rmSync(temporary, { recursive: true, force: true }));
  const root = join(temporary, "content");
  for (const folder of ["projects", "activities", "skills"]) mkdirSync(join(root, folder), { recursive: true });
  writeFileSync(join(root, "profile.md"), document({
    name: "Example", tagline: "Developer", description: "Short bio", interests: [], socials: [],
  }, "A **Markdown** biography."));
  writeFileSync(join(root, "site.md"), document({ sections: [
    { id: "activities", label: "活動", enabled: true }, { id: "works", label: "作品", enabled: false },
  ] }));
  return { root, temporary };
}

const project = { title: "Project", summary: "What it does", technologies: ["TypeScript"] };
const activity = { title: "Event", date: "2026-10", kind: "event" };

test("frontmatter preserves date precision, BOM/CRLF, and Markdown code fences", () => {
  const source = '\uFEFF---\r\ntitle: Event\r\ndate: 2025\r\nendDate: 2026-03\r\n---\r\n\r\n## Notes\r\n\r\n```yaml\r\n---\r\nexample: true\r\n```';
  const result = parseContent(source, activitySchema, "activities/example.md");
  assert.equal(result.data.date, "2025");
  assert.equal(result.data.endDate, "2026-03");
  assert.ok(result.body.includes("```yaml\n---\nexample: true\n```"));
});

test("invalid dates, reversed periods, duplicate YAML keys and typos name the file", () => {
  assert.throws(() => parseContent(document({ ...activity, date: "2025-02-29" }), activitySchema, "invalid.md"), /invalid\.md: date:/);
  assert.throws(() => parseContent(document({ ...activity, date: "2026-10-31", endDate: "2026-09" }), activitySchema, "range.md"), /range\.md: endDate:/);
  assert.throws(() => parseContent('---\ntitle: One\ntitle: Two\nsummary: Text\n---\n', projectSchema, "duplicate.md"), /duplicate\.md: YAML/);
  assert.throws(() => parseContent(document({ ...project, technlogies: [] }), projectSchema, "typo.md"), /typo\.md:/);
});

test("only YAML metadata is accepted and links cannot use executable protocols", () => {
  assert.throws(() => parseContent('---js\n({title: "unsafe"})\n---\n', projectSchema, "script.md"), /script\.md:/);
  assert.throws(() => parseContent(document({ ...project, links: [{ label: "Link", href: "javascript:alert(1)" }] }), projectSchema, "links.md"), /links\.md: links\.0\.href/);
  assert.throws(() => parseContent('---\ntitle: Missing end', projectSchema, "unfinished.md"), /unfinished\.md:/);
});

test("new Markdown files are discovered, drafts excluded, and explicit order respected", (t) => {
  const { root, temporary } = fixture(t);
  writeFileSync(join(root, "projects", "later.md"), document({ ...project, order: 20 }, "**Later**"));
  writeFileSync(join(root, "projects", "first.md"), document({ ...project, order: 10 }, "First"));
  writeFileSync(join(root, "projects", "draft.md"), document({ ...project, draft: true }, "DRAFT CONTENT"));
  writeFileSync(join(root, "activities", "older.md"), document({ ...activity, date: "2025-12", endDate: "present" }));
  writeFileSync(join(root, "activities", "newer.md"), document({ ...activity, date: "2026-10" }));
  writeFileSync(join(root, "projects", "README.md"), "This is documentation.");
  const output = join(temporary, "generated.ts");
  const first = buildContent(root, output);
  assert.deepEqual(first.projects.map((item) => item.id), ["first", "later"]);
  assert.deepEqual(first.activities.map((item) => item.id), ["newer", "older"]);
  assert.equal(first.activities[1].endDate, "present");
  assert.equal(first.sections[1].enabled, false);
  assert.ok(!readFileSync(output, "utf8").includes("DRAFT CONTENT"));
  writeFileSync(join(root, "projects", "added.md"), document({ ...project, order: 5 }));
  assert.equal(buildContent(root, output).projects[0].id, "added");
  unlinkSync(join(root, "projects", "added.md"));
  assert.equal(buildContent(root, output).projects.length, 2);
});

test("duplicate stable IDs and missing screenshots fail instead of dropping entries", (t) => {
  const { root } = fixture(t);
  writeFileSync(join(root, "projects", "one.md"), document({ ...project, id: "stable" }));
  writeFileSync(join(root, "projects", "two.md"), document({ ...project, id: "stable" }));
  assert.throws(() => loadPortfolioContent(root), /two\.md: ID.*重複/);
  unlinkSync(join(root, "projects", "two.md"));
  writeFileSync(join(root, "projects", "one.md"), document({ ...project, image: { src: "/projects/missing.png", alt: "Screenshot" } }));
  assert.throws(() => loadPortfolioContent(root), /one\.md: 画像が見つかりません/);
});

test("an invalid edit preserves the last valid generated module", (t) => {
  const { root, temporary } = fixture(t);
  const output = join(temporary, "generated.ts");
  buildContent(root, output);
  const before = readFileSync(output, "utf8");
  writeFileSync(join(root, "activities", "broken.md"), document({ ...activity, date: "not-a-date" }));
  assert.throws(() => buildContent(root, output), /broken\.md/);
  assert.equal(readFileSync(output, "utf8"), before);
});

test("watching discovers additions, saves and deletions, and recovers after an invalid edit", async (t) => {
  const { root, temporary } = fixture(t);
  const output = join(temporary, "generated.ts");
  let latest: PortfolioContent | undefined;
  let error: unknown;
  const close = watchMarkdown({ root, output, delay: 10, onUpdate: (content) => { latest = content; }, onError: (value) => { error = value; } });
  t.after(close);
  async function until(check: () => boolean) {
    const deadline = Date.now() + 4000;
    while (!check() && Date.now() < deadline) await new Promise((done) => setTimeout(done, 15));
    assert.ok(check(), "Markdown watcher did not observe the change");
  }
  const file = join(root, "projects", "watch-test.md");
  writeFileSync(file, document(project, "First version"));
  await until(() => latest?.projects.length === 1);
  writeFileSync(file, document(project, "Saved version"));
  await until(() => latest?.projects[0].description === "Saved version");
  const valid = readFileSync(output, "utf8");
  writeFileSync(file, document({ ...project, title: "" }));
  await until(() => Boolean(error));
  assert.equal(readFileSync(output, "utf8"), valid);
  writeFileSync(file, document(project, "Recovered"));
  await until(() => latest?.projects[0].description === "Recovered");
  unlinkSync(file);
  await until(() => latest?.projects.length === 0);
});

test("the creation task makes valid drafts and never overwrites an existing entry", (t) => {
  const { root, temporary } = fixture(t);
  cpSync(resolve("content/_templates"), join(root, "_templates"), { recursive: true });
  const require = createRequire(resolve("package.json"));
  const args = ["--import", require.resolve("tsx"), resolve("scripts/content-new.ts"), "project", "new-project", 'A "quoted" title'];
  const created = spawnSync(process.execPath, args, { cwd: temporary, encoding: "utf8" });
  assert.equal(created.status, 0, created.stderr);
  const file = join(root, "projects", "new-project.md");
  const original = readFileSync(file, "utf8");
  const parsed = parseContent(original, projectSchema, file);
  assert.equal(parsed.data.title, 'A "quoted" title');
  assert.equal(parsed.data.draft, true);
  assert.equal(loadPortfolioContent(root).projects.length, 0);
  const duplicate = spawnSync(process.execPath, args, { cwd: temporary, encoding: "utf8" });
  assert.notEqual(duplicate.status, 0);
  assert.equal(readFileSync(file, "utf8"), original);
});
