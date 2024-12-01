import Image from "next/image";
import icon from "@/public/icon/icon.jpeg";
import Link from "next/link";
import { getArticles, getNotifications } from "@/libs/client";
import shrine from "@/public/shrine.jpeg";
import clock from "@/public/icon/clock.svg";
import arrow from "@/public/icon/arrow.svg";

export default async function page() {
  const articles = await getArticles(6);
  const notifications = await getNotifications(6);
  const baner = await getNotifications(1);

  if (!articles || !notifications) {
    return <h1>No Contents</h1>;
  }

  const formattedTime = (createdAt: string): string => {
    const date = new Date(createdAt);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <div className="bg-base text-gray-800 w-full min-h-screen">
      {baner.contents.map((note, i) => (
        <div
          key={i}
          className="flex items-center bg-gradient-to-r from-cyan-400 to-teal-300 px-6 py-4"
        >
          <div className="bg-white text-cyan-500 font-bold text-sm px-4 py-1 rounded-full shadow-md">
            NEWS
          </div>
          {/* ニュースの内容 */}
          <Link
            href={`/notifications/${note.id}`}
            className="ml-4 text-white flex-1 truncate"
          >
            {note.title}
          </Link>
        </div>
      ))}
      <section className="relative">
        <Image
          src={shrine}
          alt="神社の写真"
          fill
          className="object-contain !relative min-w-[600px] max-w-[1200px] mx-auto"
        />
        <div className="absolute inset-0 flex items-end justify-center">
          <div className="w-full min-w-[800px] h-[40%] bg-gradient-to-b from-transparent to-black flex items-center justify-center lg:min-w-0">
            <p className="text-white mb-10 text-center text-4xl font-bold animate-fade-in-bottom lg:mb-0 lg:text-7xl sm:text-5xl">
              Welcome to Retasusan&apos;s Blog!
            </p>
          </div>
        </div>
      </section>

      {/* ヒーローセクション */}
      <section className="p-10 text-gray-500 text-center">
        <div className="w-[60%] min-w-[525px] mx-auto">
          <h2 className="text-3xl font-bold">ようこそ！</h2>
          <p className="mt-2 text-xl">最新の記事やお知らせ一覧</p>
        </div>
      </section>

      <section className="w-[70%] min-w-[600px] max-w-[1000px] mx-auto">
        {/* 筆者について */}
        <Link href="/about">
          <section id="articles" className="p-10 bg-base">
            <div className="grid grid-cols-auto-fit-300 gap-6">
              {/* 自己紹介カード */}
              <div className="bg-gray-100 p-5 rounded-lg shadow-lg hover:shadow-xl transition">
                <div className="flex gap-6">
                  <Image
                    src={icon}
                    alt="icon"
                    width={70}
                    height={70}
                    className="rounded-full my-3"
                  />
                  <div className="text-gray-600">
                    <h2 className="text-xl font-bold">筆者について</h2>
                    <div className="text-xl">Retasusan</div>
                    <p>ネットワークに興味がある大学生</p>
                    <div>アイコン置き場</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Link>
        {/* 記事セクション */}
        <section id="articles" className="p-10 bg-base">
          <h2 className="text-3xl font-bold text-gray-700 border-b pb-2 mb-4">
            最近の記事
          </h2>
          <div className="grid grid-cols-auto-fit-300 gap-6">
            {/* 記事カード */}
            {/* カード間のマージンを設定 */}
            {articles.contents?.map((article, i) => (
              <div
                key={i}
                className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
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
                    <h3 className="ml-3 text-2xl font-semibold text-blue-600 cursor-default">
                      {article.title}
                    </h3>

                    {/* 記事説明 */}
                    <p className="ml-3 mt-[-3px] text-gray-700 cursor-default">
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
                <div className="w-full flex justify-center">
                  <Link
                    href={`/articles/${article.id}`}
                    className="w-full text-center mt-4 bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    続きを読む
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* お知らせセクション */}
        <section id="articles" className="bg-base p-[40px]">
          <h2 className="text-3xl font-bold text-gray-700 border-b pb-2 mb-4">
            最近のお知らせ
          </h2>
          <div className="w-[101%] border-collapse min-w-[500px] ml-[-3px] p-3 shadow-xl rounded-lg bg-gray-100">
            {notifications.contents.map((content, i) => (
              <div
                key={i}
                className={`${
                  i % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                } transition-colors`}
              >
                <span className="p-4 text-gray-500 text-lg">
                  {formattedTime(content.createdAt.slice(0, 10))}
                </span>
                <Link
                  href={`/notifications/${content.id}`}
                  className="hover:underline"
                >
                  <span className="p-4 text-gray-500 text-lg">
                    {content.title}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
