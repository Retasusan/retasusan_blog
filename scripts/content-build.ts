import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { loadPortfolioContent } from "../src/lib/content/load";

export function buildContent(root = resolve("content"), output = resolve("src/content/generated.ts")) {
  const content = loadPortfolioContent(root);
  const source = `// Generated from content/*.md. Edit the Markdown, not this file.\nimport type { PortfolioContent } from "./types";\n\nexport const portfolioContent: PortfolioContent = ${JSON.stringify(content, null, 2)};\n`;
  if (!existsSync(output) || readFileSync(output, "utf8") !== source) {
    mkdirSync(dirname(output), { recursive: true });
    const temporary = `${output}.${process.pid}.tmp`;
    writeFileSync(temporary, source);
    renameSync(temporary, output);
  }
  return content;
}

if (process.argv[1] && resolve(process.argv[1]) === resolve("scripts/content-build.ts")) {
  try {
    const content = buildContent();
    console.log(`Content: 制作物 ${content.projects.length} / 活動 ${content.activities.length} / スキル ${content.skillGroups.length}`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
