import { loadPortfolioContent } from "../src/lib/content/load";

try {
  const content = loadPortfolioContent();
  console.log(`検証 OK: 制作物 ${content.projects.length}件 / 活動 ${content.activities.length}件 / スキル ${content.skillGroups.length}件`);
  console.log("下書きは公開データに含まれません。");
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
