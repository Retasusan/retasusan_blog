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
        <section className="p-10 bg-cardGray rounded-lg shadow-lg">
          <Image
            src={icon}
            alt="icon"
            width={100}
            height={100}
            className="rounded-full mx-auto my-3"
          />
          <h3 className="text-2xl font-semibold text-accentBlue text-center">
            Retasusan
          </h3>
          <div className="mt-3 text-gray-600 mx-auto">
            <div>
              <div className="m-5">
                <h4 className="text-3xl pb-2 border-solid border-gray-400 border-b-2">
                  使用技術
                </h4>
                <ul className="my-2 mx-5 list-disc">
                  <li>TypeScript</li>
                  <li>JavaScript</li>
                  <li>React</li>
                  <li>Next.js</li>
                  <li>Python</li>
                  <li>C++</li>
                  <li>Ruby</li>
                  <li>Ruby on Rails</li>
                </ul>
              </div>

              <div className="m-5">
                <h4 className="text-3xl pb-2 border-solid border-gray-400 border-b-2">
                  制作物
                </h4>
                <ul className="my-2 mx-5 list-disc">
                  <li>todo list</li>
                  <li>Webスクレイピングアプリ</li>
                  <li>Discord bot</li>
                  <li>ハッカソンでのアプリ</li>
                </ul>
              </div>

              <div className="m-5">
                <h4 className="text-3xl pb-2 border-solid border-gray-400 border-b-2">
                  競技プログラミング
                </h4>
                <div>アカウント</div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
