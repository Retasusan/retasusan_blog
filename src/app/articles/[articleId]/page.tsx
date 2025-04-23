import { getArticleDetail, getArticles } from "@/libs/client";
import "@/app/style/tagElement.css";
import SyntaxHilighter from "@/app/components/SyntaxHilighter/SyntaxHilighter";
import tag from "@/public/icon/tag.svg";
import home from "@/public/icon/home.svg";
import clock from "@/public/icon/clock.svg";
import arrow from "@/public/icon/arrow.svg";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import icon from "@/public/icon/icon.jpeg";
import twitter from "@/public/icon/twitter.svg";
import atcoder from "@/public/icon/atcoder.svg";
import github from "@/public/icon/github.svg";
import qiita from "@/public/icon/qiita-icon.png";
import zenn from "@/public/icon/logo-only.svg";

export async function generateStaticParams() {
  const { contents } = await getArticles(100);
  return contents.map((article) => ({
    articleId: article.id,
  }));
}

export const generateMetadata = async (props: {
  params: Promise<{ articleId: string }>;
}): Promise<Metadata> => {
  const params = await props.params;
  const articleId = params.articleId;
  const article = await getArticleDetail(articleId);

  return {
    title: article.title,
    description: article.description,
  };
};

export default async function StaticDetailPage(props: {
  params: Promise<{ articleId: string }>;
}) {
  const params = await props.params;
  const articleId = params.articleId;
  const article = await getArticleDetail(articleId);
  const createDate = article.createdAt.slice(0, 10).split("-").join("/");
  const updateDate = article.updatedAt.slice(0, 10).split("-").join("/");

  return (
    <div className="min-h-screen">
      <div className="flex items-center bg-[#f4f3f3] h-10">
        <Link href="/" className="flex flex-row items-center mx-3">
          <Image src={home} alt="home icon" width={20} height={20} />
          Home
        </Link>
        &gt;
        <Link href="/articles" className="flex mx-3">
          記事一覧
        </Link>
        &gt;
        <Link href={`/articles/${article.id}`} className="flex mx-3">
          {article.title}
        </Link>
      </div>
      <div className="m-16 border-2 border-solid border-slate-400 rounded-lg p-5 w-[90%] max-w-[1100px] mx-auto shadow-xl">
        <div className="mb-10 pb-3 border-b-2 border-gray-300 border-solid">
          <h1 className="text-5xl mb-5">{article.title}</h1>
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-[3px] ml-1">
              <Image src={tag} alt="tag icon" width={20} height={20} />
            </div>
            <div className="flex flex-wrap gap-2 ml-2">
              {article.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-600 text-xs font-medium py-1 px-3 rounded-full whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="ml-1 mt-2">
            <div className="flex">
              <Image src={clock} alt="calendar icon" width={20} height={20} />
              {`作成日:${createDate}`}
            </div>
            <div className="flex">
              <Image src={arrow} alt="arrow icon" width={20} height={20} />
              {`更新日:${updateDate}`}
            </div>
          </div>
        </div>
        <SyntaxHilighter content={article.content} />
        <div className="border-b-[1px] border-solid border-gray-500 my-10" />
        <div className="m-3">
          <div className="flex justify-start mx-auto mb-8">
            <div>
              <Image src={icon} alt="icon" width={100} height={100} />
            </div>
            <div className="ml-5">
              <p className="font-bold text-3xl mt-1">Retasusan</p>
              <p className="mt-2 text-xl">しがない大学生エンジニア</p>
              <p className="text-xl">普段はRubyを書いているとされている。</p>
            </div>
          </div>
          <div className="w-[25%]">
            <p className="text-2xl mb-2">Contact</p>
            <div className="mt-2 ml-0 flex justify-between">
              <a
                href="https://x.com/retasusan_510"
                className="text-blue-500 focus-underline visited:text-fuchsia-800 hover:text-blue-700"
              >
                <Image
                  src={twitter}
                  alt="X"
                  width={30}
                  height={30}
                  className="inline mr-2"
                />
              </a>
              {/* GibHubアカウント */}
              <a
                href="https://github.com/"
                className="text-blue-500 focus-underline visited:text-fuchsia-800 hover:text-blue-700"
              >
                <Image
                  src={github}
                  alt="GitHub"
                  width={30}
                  height={30}
                  className="inline mr-2"
                />
              </a>
              {/* AtCoderアカウント */}
              <a
                href="https://atcoder.jp/users/fubukisan"
                className="text-blue-500 focus-underline visited:text-fuchsia-800 hover:text-blue-700"
              >
                <Image
                  src={atcoder}
                  alt="AtCoder"
                  width={30}
                  height={30}
                  className="inline mr-2"
                />
              </a>

              {/* qiita */}
              <a
                href="https://qiita.com/Retasusan"
                className="text-blue-500 focus-underline visited:text-fuchsia-800 hover:text-blue-700"
              >
                <Image
                  src={qiita}
                  alt="X"
                  width={30}
                  height={30}
                  className="inline mr-2"
                />
              </a>

              {/* zenn */}
              <a
                href="https://zenn.dev/retasusan"
                className="text-blue-500 focus-underline visited:text-fuchsia-800 hover:text-blue-700"
              >
                <Image
                  src={zenn}
                  alt="X"
                  width={30}
                  height={30}
                  className="inline mr-2"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
