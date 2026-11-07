import { portfolioContent } from "../../src/content/generated";

export function usePortfolio() {
  return {
    ...portfolioContent,
    visibleSections: portfolioContent.sections.filter((section) => section.enabled),
  };
}
