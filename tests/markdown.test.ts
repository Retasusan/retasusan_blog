import assert from "node:assert/strict";
import { test } from "node:test";
import { renderMarkdown, sanitizeHtml } from "../src/lib/markdown";

test("Markdown renders rich text, GFM tables, tasks, and fenced code", () => {
  const source = '# Entry notes\n\n**Important** and [Source](https://example.com)\n\n- [x] Done\n- [ ] Next\n\n| Item | Result |\n| --- | --- |\n| Test | OK |\n\n```ts\nconst result = 1 < 2;\n```';
  const html = renderMarkdown(source);
  assert.ok(html.includes("<h4>Entry notes</h4>"));
  assert.ok(!html.includes("<h1>"));
  assert.ok(html.includes("<strong>Important</strong>"));
  assert.ok(html.includes('<a href="https://example.com">Source</a>'));
  assert.ok(html.includes("<table>"));
  assert.ok(html.includes('type="checkbox"'));
  assert.ok(html.includes("disabled"));
  assert.ok(html.includes("language-ts"));
  assert.match(html, /1 (?:&lt;|&#x3C;) 2/);
});

test("Markdown does not execute raw HTML or executable links", () => {
  const html = renderMarkdown('<script>alert(1)</script>\n\n[Bad](javascript:alert%281%29)');
  assert.ok(!html.includes("<script>"));
  assert.ok(!html.includes('href="javascript:'));
});

test("CMS HTML keeps article structure while removing scripts, handlers and executable links", () => {
  const html = sanitizeHtml('<h2>Heading</h2><p><a href="https://example.com">Source</a></p><img src="/projects/sample.png" alt="Sample" onerror="alert(1)"><script>alert(1)</script><a href="javascript:alert(1)">Bad</a><pre><code class="language-ts">const n = 1;</code></pre>');
  assert.ok(html.includes('<h2>Heading</h2>'));
  assert.ok(html.includes('href="https://example.com"'));
  assert.ok(html.includes('alt="Sample"'));
  assert.ok(html.includes('class="language-ts"'));
  assert.ok(!html.includes('<script>'));
  assert.ok(!html.includes('onerror'));
  assert.ok(!html.includes('javascript:'));
});
