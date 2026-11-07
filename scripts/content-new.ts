import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { contentIdSchema, periodDateSchema } from "../src/lib/content/schema";

const [kind, slug, title, dateInput] = process.argv.slice(2);
const folders = { project: "projects", activity: "activities", skill: "skills" } as const;

try {
  if (!kind || !Object.hasOwn(folders, kind) || !slug || !title?.trim()) {
    throw new Error('使い方: npm run content:new -- project|activity|skill ファイル名 "タイトル" [日付]');
  }
  contentIdSchema.parse(slug);
  const today = new Date();
  const localDate = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, "0"), String(today.getDate()).padStart(2, "0")].join("-");
  const date = periodDateSchema.parse(dateInput?.trim() || localDate);
  const source = readFileSync(resolve(`content/_templates/${kind}.md`), "utf8")
    .replaceAll('"{{title}}"', JSON.stringify(title.trim()))
    .replaceAll('"{{date|yyyy-MM-dd}}"', JSON.stringify(date));
  const destination = resolve("content", folders[kind as keyof typeof folders], `${slug}.md`);
  writeFileSync(destination, source, { flag: "wx" });
  console.log(`下書きを作成しました: ${destination}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
