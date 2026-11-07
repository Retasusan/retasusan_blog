import assert from "node:assert/strict";
import { test } from "node:test";
import { filterArticles, type ArchiveItem } from "../src/lib/archive";

const items: ArchiveItem[] = [
  { id: "rails", title: "Rails の認証", description: "Auth0 を試す", tags: ["Ruby", "Auth0"], createdAt: "2025-01-01", updatedAt: "2025-01-01" },
  { id: "vue", title: "Vue で制作", description: "TypeScript で画面を実装", tags: ["Vue"], createdAt: "2026-01-01", updatedAt: "2026-01-01" },
  { id: "network", title: "ネットワーク", description: "監視を学ぶ", createdAt: "2026-02-01", updatedAt: "2026-02-01" },
];

test("article search matches title, description and tags, including trimmed case-insensitive input", () => {
  assert.deepEqual(filterArticles(items, " auth0 ", "").map(item => item.id), ["rails"]);
  assert.deepEqual(filterArticles(items, "typescript", "").map(item => item.id), ["vue"]);
  assert.deepEqual(filterArticles(items, "監視", "").map(item => item.id), ["network"]);
});

test("combining search and tag filters and resetting retains the original article order", () => {
  assert.deepEqual(filterArticles(items, "認証", "Ruby").map(item => item.id), ["rails"]);
  assert.equal(filterArticles(items, "認証", "Vue").length, 0);
  assert.deepEqual(filterArticles(items, "", ""), items);
});
