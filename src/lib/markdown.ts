import type { Root } from "hast";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeParse from "rehype-parse";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";

function entryHeadings() {
  return (tree: Root) => {
    const headings: Record<string, string> = { h1: "h4", h2: "h4", h3: "h5", h4: "h5", h5: "h6", h6: "h6" };
    visit(tree, "element", (node) => {
      const replacement = headings[node.tagName];
      if (replacement) node.tagName = replacement;
    });
  };
}

const markdown = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { footnoteLabel: "脚注", footnoteBackLabel: (index: number) => `脚注 ${index + 1} の本文へ戻る` })
  .use(rehypeSanitize)
  .use(entryHeadings)
  .use(rehypeStringify);

const html = unified().use(rehypeParse, { fragment: true }).use(rehypeSanitize).use(rehypeStringify);

export function renderMarkdown(source: string) {
  return String(markdown.processSync(source));
}

export function sanitizeHtml(source: string) {
  return String(html.processSync(source));
}
