import { getArticleDetail, getArticles } from "@/libs/client";
import "./style.css";
import SyntaxHilighter from "@/app/components/SyntaxHilighter/SyntaxHilighter";

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
      <div className="mb-10">
        <h1 className="mb-5">{article.title}</h1>
        <p>{`${article.createdAt}　:　${article.updatedAt}`}</p>
      </div>
      <SyntaxHilighter content={article.content} />
    </>
  );
}
