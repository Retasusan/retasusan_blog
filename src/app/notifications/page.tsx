import Link from "next/link";

export default function page() {
  return (
    <div className="bg-base text-gray-800">
      {/* ページタイトル */}
      <section className="p-10 text-center bg-accentBlue">
        <h2 className="text-3xl font-bold text-white">お知らせ一覧</h2>
        <p className="text-white mt-2">
          すべてのお知らせを一覧でご覧いただけます
        </p>
      </section>

      {/* 記事リスト */}
      <section className="w-[70%] min-w-[600px] max-w-[1000px] mx-auto m-10">
        <div className="">
          {/* 記事カード */}
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="bg-accentGray p-5 m-7 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-accentBlue">
                お知らせタイトル {i + 1}
              </h3>
              <p className="mt-2 text-gray-600">
                これはお知らせの簡単な説明です。
              </p>
              <Link
                href="/"
                className="mt-3 inline-block text-gray-600 hover:underline"
              >
                続きを読む
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* フッター */}
      <footer className="p-5 bg-gray-200 text-center">
        <p>&copy; 2024 My Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}
