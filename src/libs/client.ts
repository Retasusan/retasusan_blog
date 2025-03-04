import { createClient } from "microcms-js-sdk";

export type Articles = {
  title: string;
  description: string;
  tags: string[];
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
};

export type Article = {
  title: string;
  content: string;
  description: string;
  tags: string[];
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
};

export type Notifications = {
  title: string;
  description: string;
  tags: string[];
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
};

export type Notification = {
  title: string;
  content: string;
  description: string;
  tags: string[];
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
};

if (!process.env.SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN,
  apiKey: process.env.API_KEY,
});

// ブログ一覧を取得
export const getArticles = async (limit: number) => {
  if (limit <= 0) {
    throw new Error("Limit must be greater than 0");
  }
  const articles = await client.getList<Articles>({
    endpoint: "articles",
    queries: { limit },
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

// ブログ一覧を取得
export const getNotifications = async (limit: number) => {
  const notifications = await client.getList<Notifications>({
    endpoint: "notifications",
    queries: {
      limit,
    },
  });
  return notifications;
};

// ブログの詳細を取得
export const getNotificationDetail = async (contentId: string) => {
  const notification = await client.getListDetail<Notification>({
    endpoint: "notifications",
    contentId,
  });
  return notification;
};
