import Image from "next/image";
import icon from "@/public/icon/icon.jpeg";
import Link from "next/link";
import { getArticles, getNotifications } from "@/libs/client";
import shrine from "@/public/shrine.jpeg";

export default async function page() {
  const articles = await getArticles(6);
  const notifications = await getNotifications(6);
  const baner = await getNotifications(1);

  if (!articles || !notifications) {
    return <h1>No Contents</h1>;
  }

  const formattedDate: (date: string) => string = (date: string) => {
    return date.split("-").join("/");
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
              <div className="bg-cardGray p-5 rounded-lg shadow-lg hover:shadow-xl transition">
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
          <h2 className="text-2xl font-semibold text-gray-700 mb-5">
            最近の記事
          </h2>
          <div className="grid grid-cols-auto-fit-300 gap-6">
            {/* 記事カード */}
            {/* カード間のマージンを設定 */}
            {articles.contents?.map((article, i) => (
              <div
                key={i}
                className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                {/* 記事タイトル */}
                <h3 className="text-lg font-semibold text-blue-600 cursor-default">
                  {article.title}
                </h3>

                {/* 記事説明 */}
                <p className="mt-2 text-gray-700 cursor-default">
                  {article.description}
                </p>

                {/* 続きを読むリンク */}
                <Link
                  href={`/articles/${article.id}`}
                  className="inline-block mt-4 text-white bg-[#40aad4] px-4 py-2 rounded-lg hover:bg-[#2db8ef] focus:ring-4 focus:ring-blue-200 transition-all"
                >
                  続きを読む
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* お知らせセクション */}
        <section id="articles" className="bg-base p-[40px]">
          <h2 className="text-2xl font-semibold text-gray-700 mb-5">
            最近のお知らせ
          </h2>
          <div className="w-[101%] border-collapse min-w-[500px] ml-[-3px]">
            {notifications.contents.map((content, i) => (
              <ul
                key={i}
                className={`${
                  i % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                } hover:bg-gray-200 transition-colors`}
              >
                <li>
                  <Link
                    href={`/notifications/${content.id}`}
                    className="flex items-center w-full px-4 py-3 text-gray-800 hover:underline"
                  >
                    <span className="w-24 text-left border-none pl-2">
                      {formattedDate(content.createdAt.slice(0, 10))}
                    </span>
                    <span className="w-44 font-medium border-none">
                      {content.title}
                    </span>
                    <span className="flex-1 border-none">
                      {content.description}
                    </span>
                  </Link>
                </li>
              </ul>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
