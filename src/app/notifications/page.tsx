import Link from "next/link";
import { getNotifications } from "@/libs/client";

export default async function page() {
  const { contents } = await getNotifications(100);

  if (!contents) {
    return <h1>No Contents</h1>;
  }

  return (
    <div className="bg-base text-gray-800 min-h-screen">
      {/* ページタイトル */}
      <section className="p-10 text-gray-500 text-center">
        <div className="w-[60%] min-w-[525px] mx-auto">
          <h2 className="text-3xl font-bold">お知らせ一覧</h2>
        </div>
      </section>

      {/* 記事リスト */}
      <section className="w-[70%] min-w-[600px] max-w-[1000px] mx-auto m-10">
        <div className="">
          {/* 記事カード */}
          {contents?.map((notification) => (
            <div
              key={notification.id}
              className="bg-cardGray p-5 m-7 rounded-lg shadow-lg hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-accentBlue">
                {notification.title}
              </h3>
              <p className="mt-2 text-gray-600">{notification.description}</p>
              <Link
                href={`/Notifications/${notification.id}`}
                className="mt-3 inline-block text-gray-600 hover:underline"
              >
                続きを読む
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
