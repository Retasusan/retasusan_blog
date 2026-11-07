import matter from "gray-matter";
import { parseDocument } from "yaml";
import type { z } from "zod";

export class ContentError extends Error {
  constructor(file: string, message: string) {
    super(`${file}: ${message}`);
    this.name = "ContentError";
  }
}

export function parseContent<T>(source: string, schema: z.ZodType<T>, file: string) {
  const normalized = source.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---\n") || !/^---[ \t]*$/m.test(normalized.slice(4))) {
    throw new ContentError(file, "先頭に --- で囲んだ YAML 設定欄が必要です");
  }
  let parsed: ReturnType<typeof matter>;
  try {
    parsed = matter(normalized, {
      language: "yaml",
      engines: {
        yaml: (value: string) => {
          const document = parseDocument(value, { schema: "core", uniqueKeys: true });
          if (document.errors.length) throw document.errors[0];
          if (document.warnings.length) throw document.warnings[0];
          return document.toJS({ maxAliasCount: 100 });
        },
      },
    });
  } catch (error) {
    throw new ContentError(file, `YAML を読み取れません: ${error instanceof Error ? error.message : String(error)}`);
  }
  const result = schema.safeParse(parsed.data);
  if (!result.success) {
    const issues = result.error.issues.map((issue) => `${issue.path.join(".") || "設定欄"}: ${issue.message}`);
    throw new ContentError(file, issues.join("\n  "));
  }
  return { data: result.data, body: parsed.content.trim() };
}
