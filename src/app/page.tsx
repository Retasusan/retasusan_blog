import Image from "next/image";
import icon from "@/public/icon/icon.jpeg";
import Link from "next/link";
import { getArticles, getNotifications } from "@/libs/client";

export default async function page() {
  const articles = await getArticles(5);
  const notifications = await getNotifications(5);

  if (!articles || !notifications) {
    return <h1>No Contents</h1>;
  }

  return (
    <div className="bg-base text-gray-800 w-full">
      {/* ヒーローセクション */}
      <section className="p-10 bg-accentBlue text-white text-center">
        <div className="w-[60%] min-w-[525px] max-w-[] mx-auto">
          <h2 className="text-3xl font-bold">ようこそ！</h2>
          <p className="mt-2">最新の記事やお知らせをご覧ください。</p>
          <Link
            href="/articles"
            className="mt-5 inline-block bg-accentGreen text-white py-2 px-4 rounded hover:bg-white hover:text-accentGreen"
          >
            最新記事を見る
          </Link>
        </div>
      </section>

      <section className="w-[70%] min-w-[600px] max-w-[1000px] mx-auto">
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
                className="bg-accentGray p-5 rounded-lg shadow hover:shadow-lg transition"
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
        <section id="announcements" className="p-10 bg-white">
          <h2 className="text-2xl font-semibold text-gray-700 mb-5">
            最近のお知らせ
          </h2>
          <ul className="space-y-3">
            {notifications.contents.map((notification, i) => (
              <li
                key={i}
                className="p-4 bg-accentGray rounded shadow-md hover:shadow-lg"
              >
                <h3 className="text-accentBlue font-semibold">
                  {notification.title}
                </h3>
                <p className="text-gray-600">{notification.description}</p>
                <Link
                  href={`/notifications/${notification.id}`}
                  className="mt-3 inline-block text-gray-600 hover:underline"
                >
                  続きを読む
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </section>

      {/* 筆者についてセクション */}
      <section
        id="about"
        className="p-10 bg-accentGreen text-center flex flex-col"
      >
        <h2 className="text-2xl font-semibold justify-center">筆者について</h2>
        <Image
          src={icon}
          alt="icon"
          width={100}
          height={100}
          className="rounded-full mx-auto my-3"
        />
        <p className="mt-5 max-w-lg mx-auto justify-center">
          ここに筆者の簡単なプロフィールや自己紹介が入ります。ブログのテーマや目的などについても触れてください。
        </p>
      </section>

      {/* フッター */}
      <footer className="p-5 bg-gray-200 text-center">
        <p>&copy; 2024 My Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}
