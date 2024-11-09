import Image from "next/image";
import icon from "@/public/icon/icon.jpeg";

export default function page() {
  return (
    <div className="bg-base text-gray-800 min-h-screen">
      {/* ページタイトル */}
      <section className="p-10 text-center bg-accentBlue">
        <h2 className="text-3xl font-bold text-white">筆者について</h2>
        <p className="text-white mt-2">
          筆者のバックグラウンドとブログの目的についてご紹介します。
        </p>
      </section>

      <section className="w-[70%] min-w-[600px] max-w-[1000px] mx-auto m-10">
        {/* プロフィールセクション */}
        <section className="p-10 bg-gray-200 text-center">
          <Image
            src={icon}
            alt="icon"
            width={100}
            height={100}
            className="rounded-full mx-auto my-3"
          />
          <h3 className="text-2xl font-semibold text-accentBlue">筆者名</h3>
          <p className="mt-3 text-gray-600 max-w-lg mx-auto">
            ここに筆者の簡単なプロフィールやバックグラウンドを記載します。ブログを始めたきっかけや、伝えたいメッセージなどをお話しします。
          </p>
        </section>
      </section>

      {/* ブログの目的とテーマ */}
      <section className="p-10 bg-accentGreen text-white text-center">
        <h3 className="text-2xl font-semibold">ブログのテーマ</h3>
        <p className="mt-3 max-w-xl mx-auto">
          このブログでは、プログラミングやインターネットセキュリティに関する情報を共有し、読者が新しい視点や知識を得られるよう心掛けています。
        </p>
      </section>
    </div>
  );
}
