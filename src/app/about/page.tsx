import Image from "next/image";
import icon from "@/public/icon/icon.jpeg";

export default function page() {
  return (
    <div className="bg-base text-gray-800 min-h-screen">
      {/* ページタイトル */}
      <section className="p-10 text-gray-500 text-center">
        <div className="w-[60%] min-w-[525px] mx-auto">
          <h2 className="text-3xl font-bold">筆者について</h2>
        </div>
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
          <h3 className="text-2xl font-semibold text-accentBlue">Retasusan</h3>
          <p className="mt-3 text-gray-600 max-w-lg mx-auto">
            ここに筆者の簡単なプロフィールやバックグラウンドを記載します。ブログを始めたきっかけや、伝えたいメッセージなどをお話しします。
          </p>
        </section>
      </section>
    </div>
  );
}
