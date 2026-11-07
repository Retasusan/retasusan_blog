import { existsSync, readFileSync, readdirSync } from "node:fs";
import { basename, join, resolve, sep } from "node:path";
import type { z } from "zod";
import type { PortfolioContent } from "../../content/types";
import { ContentError, parseContent } from "./parse";
import { activitySchema, contentIdSchema, profileSchema, projectSchema, siteSchema, skillSchema } from "./schema";

type Entry<T> = { data: T; body: string; file: string; id: string };
type Ordered = { id?: string; order?: number; draft: boolean };

function read<T>(root: string, file: string, schema: z.ZodType<T>) {
  const path = join(root, file);
  if (!existsSync(path)) throw new ContentError(path, "ファイルが見つかりません");
  return parseContent(readFileSync(path, "utf8"), schema, path);
}

function collection<T extends Ordered>(root: string, folder: string, schema: z.ZodType<T>) {
  const directory = join(root, folder);
  if (!existsSync(directory)) throw new ContentError(directory, "管理フォルダーが見つかりません");
  const entries: Entry<T>[] = [];
  const ids = new Map<string, string>();
  for (const file of readdirSync(directory).filter((name) => name.endsWith(".md") && !/^[_.]|^README\.md$/i.test(name)).sort()) {
    const record = read(root, join(folder, file), schema);
    const path = join(directory, file);
    const id = record.data.id ?? basename(file, ".md");
    const valid = contentIdSchema.safeParse(id);
    if (!valid.success) throw new ContentError(path, "ファイル名を英数字・文字・ハイフンにするか、設定欄に id を指定してください");
    if (ids.has(id)) throw new ContentError(path, `ID「${id}」が ${ids.get(id)} と重複しています`);
    ids.set(id, file);
    entries.push({ ...record, file: path, id });
  }
  return entries.filter((entry) => !entry.data.draft);
}

function compare<T extends Ordered>(a: Entry<T>, b: Entry<T>) {
  return (a.data.order ?? 1000) - (b.data.order ?? 1000) || a.file.localeCompare(b.file, "en");
}

export function loadPortfolioContent(root = resolve(process.cwd(), "content")): PortfolioContent {
  const profile = read(root, "profile.md", profileSchema);
  if (!profile.body) throw new ContentError(join(root, "profile.md"), "本文に自己紹介を書いてください");
  const site = read(root, "site.md", siteSchema);
  if (new Set(site.data.sections.map((section) => section.id)).size !== site.data.sections.length) {
    throw new ContentError(join(root, "site.md"), "セクション ID が重複しています");
  }
  const projects = collection(root, "projects", projectSchema).sort(compare).map(({ data, body, id, file }) => {
    if (data.image) {
      const publicDirectory = resolve(root, "..", "public");
      const imagePath = resolve(publicDirectory, `.${data.image.src}`);
      if (!imagePath.startsWith(`${join(publicDirectory, "projects")}${sep}`) || !existsSync(imagePath)) {
        throw new ContentError(file, `画像が見つかりません: public${data.image.src}`);
      }
    }
    return {
      id, title: data.title, summary: data.summary, category: data.category,
      technologies: data.technologies, links: data.links, featured: data.featured,
      ...(body ? { description: body } : {}),
      ...(data.image ? { image: { src: data.image.src as `/projects/${string}`, alt: data.image.alt } } : {}),
    };
  });
  const activities = collection(root, "activities", activitySchema).sort((a, b) =>
    (a.data.order ?? 1000) - (b.data.order ?? 1000) || b.data.date.localeCompare(a.data.date) || a.file.localeCompare(b.file, "en"),
  ).map(({ data, body, id }) => ({
    id, title: data.title, date: data.date, kind: data.kind, links: data.links,
    ...(data.endDate ? { endDate: data.endDate } : {}),
    ...(body ? { description: body } : {}),
  }));
  const skillGroups = collection(root, "skills", skillSchema).sort(compare).map(({ data, body, id }) => ({
    id, title: data.title, technologies: data.technologies, ...(body ? { description: body } : {}),
  }));
  return {
    profile: {
      name: profile.data.name, tagline: profile.data.tagline, headline: profile.data.headline,
      introduction: profile.data.description, body: profile.body,
      personalNote: profile.data.personalNote, interests: profile.data.interests, socials: profile.data.socials,
    },
    projects, activities, skillGroups, sections: site.data.sections,
  };
}
