import { getArticleDetail, getArticles } from "@/libs/client";

export async function generateStaticParams() {
  const { contents } = await getArticles();
  return contents.map((article) => ({
    articleId: article.id,
  }));
}

export default async function StaticDetailPage({
  params,
}: {
  params: { articleId: string };
}) {
  const articleId = await params.articleId;
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
