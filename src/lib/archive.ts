export type ArchiveItem = {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  thumbnail?: { url: string; width?: number; height?: number };
};

export type ArchiveDetail = ArchiveItem & { content: string };
export type ArchiveList = { contents: ArchiveItem[]; configured: boolean };

export function filterArticles(articles: ArchiveItem[], query: string, tag: string) {
  const search = query.trim().toLocaleLowerCase();
  return articles.filter((article) =>
    (!tag || article.tags?.includes(tag)) &&
    [article.title, article.description, ...(article.tags ?? [])].join(" ").toLocaleLowerCase().includes(search),
  );
}
