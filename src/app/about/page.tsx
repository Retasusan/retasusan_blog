import Image from "next/image";
import icon from "@/public/icon/icon.jpeg";
import twitter from "@/public/icon/twitter.svg";
import atcoder from "@/public/icon/atcoder.svg";
import github from "@/public/icon/github.svg";
import qiita from "@/public/icon/qiita-icon.png";
import zenn from "@/public/icon/logo-only.svg";
import Link from "next/link";

export default function page() {
  return (
    <div className="bg-base text-gray-800 min-h-screen">
      {/* ページタイトル */}
      <section className="p-10 text-gray-500 text-center">
        <div className="w-[60%] min-w-[525px] mx-auto">
          <h2 className="text-3xl font-bold">筆者について</h2>
          <Image
            src={icon}
            alt="icon"
            width={300}
            height={300}
            className="mx-auto my-3"
          />
        </div>
      </section>

      <section className="w-[70%] min-w-[600px] max-w-[1000px] mx-auto m-10">
        {/* プロフィールセクション */}
        <section className="p-10 bg-cardGray rounded-lg shadow-lg">
          <div className="mt-3 text-gray-600 mx-auto">
            <div>
              <div className="m-5">
                <h4 className="text-3xl pb-2 border-solid border-gray-400 border-b-2 mb-3">
                  プロフィール
                </h4>
                <div>名前：Retasusan</div>
                <div>所属：とある大学の情報系学部</div>
                <div>好きなもの：甘いもの、期間限定の飲み物</div>
                <div>一言：はやくつよつよエンジニアになりたい...</div>
              </div>

              <div className="m-5">
                <h4 className="text-3xl pb-2 border-solid border-gray-400 border-b-2 mb-3">
                  略歴
                </h4>
                <div>2024年3月：高校卒業</div>
                <div>
                  2024年4月：大学入学、大学の部活にて新入生チーム制作を経験
                </div>
                <div>2024年6月：ハッカソン初参加</div>
                <div>2024年7月：JANOG初参加、ICPC初参加</div>
                <div>2024年10月：長期インターン採用</div>
              </div>

              <div className="m-5">
                <h4 className="text-3xl pb-2 border-solid border-gray-400 border-b-2">
                  使用してきた技術
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
                  <li>初ハッカソンでのアプリ</li>
                  <li>旧ブログ</li>
                  <li>タイピングアプリ</li>
                  <li>2回目ハッカソンでのアプリ</li>
                </ul>
                <div>
                  詳しくは
                  <Link
                    href="https://github.com/"
                    className="text-blue-500 focus-underline visited:text-fuchsia-800 hover:text-blue-700"
                  >
                    GitHub
                  </Link>
                  にて
                </div>
              </div>

              <div className="m-5">
                <h4 className="text-3xl pb-2 border-solid border-gray-400 border-b-2">
                  各種アカウント
                </h4>
                <div className="mt-4 ml-0 flex justify-between">
                  <a
                    href="https://x.com/Yamada_medjed"
                    className="text-blue-500 focus-underline visited:text-fuchsia-800 hover:text-blue-700"
                  >
                    <Image
                      src={twitter}
                      alt="X"
                      width={30}
                      height={30}
                      className="inline mr-2"
                    />
                  </a>
                  {/* GibHubアカウント */}
                  <a
                    href="https://github.com/"
                    className="text-blue-500 focus-underline visited:text-fuchsia-800 hover:text-blue-700"
                  >
                    <Image
                      src={github}
                      alt="GitHub"
                      width={30}
                      height={30}
                      className="inline mr-2"
                    />
                  </a>
                  {/* AtCoderアカウント */}
                  <a
                    href="https://atcoder.jp/users/fubukisan"
                    className="text-blue-500 focus-underline visited:text-fuchsia-800 hover:text-blue-700"
                  >
                    <Image
                      src={atcoder}
                      alt="AtCoder"
                      width={30}
                      height={30}
                      className="inline mr-2"
                    />
                  </a>

                  {/* qiita */}
                  <a
                    href="https://qiita.com/Retasusan"
                    className="text-blue-500 focus-underline visited:text-fuchsia-800 hover:text-blue-700"
                  >
                    <Image
                      src={qiita}
                      alt="X"
                      width={30}
                      height={30}
                      className="inline mr-2"
                    />
                  </a>

                  {/* zenn */}
                  <a
                    href="https://zenn.dev/retasusan"
                    className="text-blue-500 focus-underline visited:text-fuchsia-800 hover:text-blue-700"
                  >
                    <Image
                      src={zenn}
                      alt="X"
                      width={30}
                      height={30}
                      className="inline mr-2"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
