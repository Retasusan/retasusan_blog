import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { buildContent } from "./content-build";
import { watchMarkdown } from "./content-watch";

try {
  buildContent();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}

const stopWatching = watchMarkdown({
  onUpdate: () => console.log("[content] Markdown を反映しました"),
  onError: (error) => console.error("[content]", error instanceof Error ? error.message : error),
});

const require = createRequire(resolve("package.json"));
const args = process.argv.slice(2);
const dotenv = existsSync(resolve(".env.local")) && !args.some(arg => arg.startsWith("--dotenv"))
  ? ["--dotenv", ".env.local"]
  : [];
const child = spawn(process.execPath, [resolve(dirname(require.resolve("nuxt/package.json")), "bin/nuxt.mjs"), "dev", ...dotenv, ...args], { stdio: "inherit" });

function stop(signal: NodeJS.Signals) {
  stopWatching();
  if (child.exitCode === null) child.kill(signal);
}
process.on("SIGINT", () => stop("SIGINT"));
process.on("SIGTERM", () => stop("SIGTERM"));
child.on("error", (error) => { console.error(error); stop("SIGTERM"); process.exitCode = 1; });
child.on("exit", (code) => { stopWatching(); process.exitCode = code ?? 0; });
