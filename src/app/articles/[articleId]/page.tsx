import { getArticleDetail, getArticles } from "@/libs/client";
import "./style.css";

export async function generateStaticParams() {
  const { contents } = await getArticles(100);
  return contents.map((article) => ({
    articleId: article.id,
  }));
}

export default async function StaticDetailPage(props: {
  params: Promise<{ articleId: string }>;
}) {
  const params = await props.params;
  const articleId = params.articleId;
  const article = await getArticleDetail(articleId);

  return (
    <>
      <p>{article.title}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${article.content}`,
        }}
      />
    </>
  );
}
