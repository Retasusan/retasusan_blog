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
  const createDate = article.createdAt.slice(0, 10);
  const updateDate = article.updatedAt.slice(0, 10);

  return (
    <div className="m-16 border-2 border-solid border-slate-400 rounded-lg p-5 w-[90%] max-w-[1100px] mx-auto">
      <div className="mb-10">
        <h1 className="mb-5">{article.title}</h1>
        <p>{`created Date:${createDate}`}</p>
        <p>{`updatedDate:${updateDate}`}</p>
      </div>
      <SyntaxHilighter content={article.content} />
    </div>
  );
}
