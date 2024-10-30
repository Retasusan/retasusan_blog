import { createClient } from "microcms-js-sdk";

export type Article = {
  title: string;
  content: string;
  description: string;
};

if (!process.env.SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.API_KEY) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN,
  apiKey: process.env.API_KEY,
});

// ブログ一覧を取得
export const getArticles = async (limit: number) => {
  const articles = await client.getList<Article>({
    endpoint: "articles",
    queries: {
      limit,
    },
  });
  return articles;
};

// ブログの詳細を取得
export const getArticleDetail = async (contentId: string) => {
  const article = await client.getListDetail<Article>({
    endpoint: "articles",
    contentId,
  });
  return article;
};
