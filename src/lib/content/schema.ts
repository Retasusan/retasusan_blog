import { z } from "zod";
import { portfolioSectionIds } from "../../content/types";

const text = z.string().trim().min(1, "空欄にできません");
const id = text.regex(/^[\p{L}\p{N}]+(?:[-_][\p{L}\p{N}]+)*$/u, "ID は文字・数字・ハイフン・アンダースコアで指定してください");
const href = text.refine((value) => {
  if (/^\/(?!\/)/.test(value)) return true;
  try { return ["https:", "http:", "mailto:"].includes(new URL(value).protocol); }
  catch { return false; }
}, "https:// で始まる URL または / で始まるサイト内パスを指定してください");

const link = z.object({
  label: text,
  href,
  _template: z.string().optional(),
}).strict().transform(({ label, href }) => ({ label, href }));

const metadata = {
  id: id.optional(),
  order: z.number().finite().optional(),
  draft: z.boolean().default(false),
  slug: z.string().optional(),
  fmContentType: z.string().optional(),
};

export function isValidPeriodDate(value: string) {
  if (!/^\d{4}(?:-\d{2}){0,2}$/.test(value)) return false;
  const parsed = new Date(value);
  return Number.isFinite(parsed.valueOf()) && parsed.toISOString().slice(0, value.length) === value;
}

export const periodDateSchema = z.preprocess(
  (value) => typeof value === "number" && Number.isInteger(value) ? String(value) : value,
  text.refine(isValidPeriodDate, "日付は YYYY / YYYY-MM / YYYY-MM-DD の形式で指定してください"),
);

function lastDay(value: string) {
  const [year, month = 12, day] = value.split("-").map(Number);
  return day ? new Date(value).valueOf() : Date.UTC(year, month, 0, 23, 59, 59);
}

export const projectSchema = z.object({
  ...metadata,
  type: z.literal("project").optional(),
  title: text,
  summary: text,
  category: text.default("制作物"),
  technologies: z.array(text).default([]),
  links: z.array(link).default([]),
  featured: z.boolean().default(false),
  image: z.object({
    src: text.refine((value) => /^\/projects\//.test(value) && !value.split("/").includes("..") && !/[?#]/.test(value), "画像は /projects/ 以下のパスで指定してください"),
    alt: text,
  }).strict().optional(),
}).strict();

export const activitySchema = z.object({
  ...metadata,
  type: z.literal("activity").optional(),
  title: text,
  date: periodDateSchema,
  endDate: z.union([z.literal("present"), periodDateSchema]).optional(),
  kind: z.enum(["work", "event", "project", "learning"]).default("event"),
  links: z.array(link).default([]),
}).strict().superRefine((value, context) => {
  if (value.endDate && value.endDate !== "present" && lastDay(value.endDate) < new Date(value.date).valueOf()) {
    context.addIssue({ code: "custom", path: ["endDate"], message: "終了日は開始日以降にしてください" });
  }
});

export const skillSchema = z.object({
  ...metadata,
  type: z.literal("skill").optional(),
  title: text,
  technologies: z.array(text).default([]),
}).strict();

export const profileSchema = z.object({
  type: z.literal("profile").optional(),
  title: z.string().optional(),
  name: text,
  tagline: text,
  headline: z.array(text).min(1).max(3).default(["Webアプリと、", "ネットワークのこと。"]),
  description: text,
  personalNote: z.string().default(""),
  interests: z.array(text).default([]),
  socials: z.array(z.object({
    label: text, href, description: z.string().default(""), _template: z.string().optional(),
  }).strict().transform(({ label, href, description }) => ({ label, href, description }))).default([]),
}).strict();

export const siteSchema = z.object({
  type: z.literal("site").optional(),
  title: z.string().optional(),
  sections: z.array(z.object({
    id: z.enum(portfolioSectionIds), label: text, enabled: z.boolean().default(true), _template: z.string().optional(),
  }).strict().transform(({ id, label, enabled }) => ({ id, label, enabled }))),
}).strict();

export const contentIdSchema = id;
