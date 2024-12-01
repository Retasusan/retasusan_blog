import Link from "next/link";
import { getArticles } from "@/libs/client";
import Image from "next/image";
import home from "@/public/icon/home.svg";
import clock from "@/public/icon/clock.svg";
import arrow from "@/public/icon/arrow.svg";

export default async function page() {
  const { contents } = await getArticles(100);

  if (!contents) {
    return <h1>No Contents</h1>;
  }

  const formattedTime = (createdAt: string): string => {
    const date = new Date(createdAt);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <div className="bg-base text-gray-800 min-h-screen">
      <div className="flex items-center bg-[#f4f3f3] h-10">
        <Link href="/" className="flex flex-row items-center mx-3">
          <Image src={home} alt="home icon" width={20} height={20} />
          Home
        </Link>
        &gt;
        <Link href="/articles" className="flex mx-3">
          記事一覧
        </Link>
      </div>
      {/* ページタイトル */}
      <section className="px-20 py-10 text-gray-500 text-center">
        <div className="w-[60%] min-w-[525px] mx-auto">
          <h2 className="text-3xl font-bold">記事一覧</h2>
        </div>
      </section>

      {/* 記事リスト */}
      <section className="w-[90%] min-w-[700px] max-w-[850px] mx-auto px-28 m-10">
        {/* カード間のマージンを設定 */}
        {contents?.map((article, i) => (
          <div
            key={i}
            className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all mb-12"
          >
            <div className="flex">
              {article.thumbnail?.url && (
                <Image
                  src={article.thumbnail?.url}
                  height={100}
                  width={100}
                  alt={"thumbnail"}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "7px",
                    marginLeft: "10px",
                  }}
                />
              )}
              <div className="ml-2 mt-[-3px]">
                {/* 記事タイトル */}
                <h3 className="ml-3 text-xl font-semibold text-blue-600 cursor-default">
                  {article.title}
                </h3>

                {/* 記事説明 */}
                <p className="mt-[-3px] ml-3 text-gray-700 cursor-default">
                  {article.description}
                </p>

                {/* 投稿日時 */}
                <div className="flex items-center ml-2 mt-8">
                  {/* 公開日 */}
                  <div className="flex-shrink-0">
                    <Image
                      src={clock}
                      width={15}
                      height={15}
                      alt="clock icon"
                    />
                  </div>
                  <span className="ml-1 text-gray-600 mt-[1px] text-sm">
                    {formattedTime(article.createdAt)}
                  </span>
                  {/* 最終更新日 */}
                  <div className="flex-shrink-0 ml-3">
                    <Image
                      src={arrow}
                      width={15}
                      height={15}
                      alt="arrow icon"
                    />
                  </div>
                  <span className="ml-1 text-gray-600 mt-[1px] text-sm">
                    {formattedTime(article.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
            <div>
              {/* タグ */}
              <div className="mt-5 flex space-x-2">
                {article.tags?.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-600 text-xs font-medium py-1 px-3 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ボタン */}
            <div className="flex justify-center max-w-[600px]">
              <Link
                href={`/articles/${article.id}`}
                className="w-full text-center mt-4 bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-full hover:bg-blue-600 transition-colors"
              >
                続きを読む
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
