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
          <div className="w-full min-w-[800px] h-[40%] bg-gradient-to-b from-transparent to-black flex items-center justify-center lg:min-w-0 lg:h-full">
            <p className="text-white mb-20 text-center text-4xl font-bold animate-fade-in-bottom lg:mb-[-20%] lg:text-7xl sm:text-5xl sm:min-w-[%]">
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
              <div className="bg-cardGray p-5 rounded-lg shadow-lg hover:shadow-lg transition">
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
            {articles.contents?.map((article, i) => (
              <div
                key={i}
                className="bg-cardGray p-5 rounded-lg shadow-lg hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-accentBlue">
                  {article.title}
                </h3>
                <p className="mt-2 text-gray-600">{article.description}</p>
                <Link
                  href={`/articles/${article.id}`}
                  className="mt-3 inline-block text-gray-600 hover:underline"
                >
                  続きを読む
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* お知らせセクション */}
        <section id="articles" className="p-10 bg-base">
          <h2 className="text-2xl font-semibold text-gray-700 mb-5">
            最近のお知らせ
          </h2>
          <div className="grid grid-cols-auto-fit-300 gap-6">
            {/* 記事カード */}
            {notifications.contents?.map((notification, i) => (
              <div
                key={i}
                className="bg-cardGray p-5 rounded-lg shadow-lg hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-accentBlue">
                  {notification.title}
                </h3>
                <p className="mt-2 text-gray-600">{notification.description}</p>
                <Link
                  href={`/notifications/${notification.id}`}
                  className="mt-3 inline-block text-gray-600 hover:underline"
                >
                  続きを読む
                </Link>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
