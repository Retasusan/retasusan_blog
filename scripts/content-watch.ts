import { watch } from "node:fs";
import { resolve } from "node:path";
import type { PortfolioContent } from "../src/content/types";
import { buildContent } from "./content-build";

type Options = {
  root?: string;
  output?: string;
  delay?: number;
  onUpdate: (content: PortfolioContent) => void;
  onError: (error: unknown) => void;
};

export function watchMarkdown({ root = resolve("content"), output, delay = 120, onUpdate, onError }: Options) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const watcher = watch(root, { recursive: true }, (_, filename) => {
    if (!filename?.endsWith(".md")) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      try { onUpdate(buildContent(root, output)); }
      catch (error) { onError(error); }
    }, delay);
  });
  watcher.on("error", onError);
  return () => { watcher.close(); clearTimeout(timer); };
}
