import Image from "next/image";
import icon from "@/public/icon/icon.jpeg";
import twitter from "@/public/icon/twitter.svg";
import atcoder from "@/public/icon/atcoder.svg";
import github from "@/public/icon/github.svg";
import qiita from "@/public/icon/qiita-icon.png";
import zenn from "@/public/icon/logo-only.svg";
import Link from "next/link";
import home from "@/public/icon/home.svg";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "筆者について",
  description: "Retasusan's Blog筆者であるRetasusanについてのページ",
};

export default function page() {
  return (
    <div className="bg-base text-gray-800 min-h-screen">
      <div className="flex items-center bg-[#f4f3f3] h-10">
        <Link href="/" className="flex flex-row items-center mx-3">
          <Image src={home} alt="home icon" width={20} height={20} />
          Home
        </Link>
        &gt;
        <Link href="/articles" className="flex mx-3">
          筆者について
        </Link>
      </div>

      {/* ページタイトル */}
      <section className="p-10 text-gray-500 text-center">
        <div className="w-[60%] min-w-[525px] mx-auto">
          <h2 className="text-3xl font-bold cursor-default">筆者について</h2>
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
        <section className="p-10 bg-cardGray rounded-lg shadow-lg cursor-default">
          <div className="mt-3 text-gray-600 mx-auto">
            <div>
              <div className="m-5">
                <h4 className="text-3xl pb-2 border-solid border-gray-400 border-b-2 mb-3">
                  プロフィール
                </h4>
                <div>名前：Retasusan</div>
                <div>所属：とある大学の情報系学部</div>
                <div>好きなもの：甘いもの、期間限定の飲み物</div>
                <div>
                  一言：ネットワークエンジニア志望だけど、普段はRubyを書いています。
                </div>
              </div>

              <div className="m-5">
                <h4 className="text-3xl pb-2 border-solid border-gray-400 border-b-2 mb-3">
                  略歴
                </h4>
                <div>2024年3月：高校卒業</div>
                <div>2024年4月：大学入学</div>
                <div>2024年10月：アプリケーション開発の長期インターンシップ採用</div>
                <div>2025年11月：上記インターンシップを辞職</div>
                <div>2025年11月：アルバイト(ネットワークエンジニア)採用</div>
              </div>

              <div className="m-5">
                <h4 className="text-3xl pb-2 border-solid border-gray-400 border-b-2 mb-3">
                  やってきたこと(イベント参加、ハッカソン出場、NOCなど)
                </h4>
                <div>2024年4月：初チーム開発</div>
                <div>2024年6月：初ハッカソン(登竜門Hack関西)参加：入賞</div>
                <div>2024年7月：JANOG54一般参加</div>
                <div>2024年7月：ICPC参加：3完</div>
                <div>2024年7月：BitSummit一般参加</div>
                <div>2024年9月：KC3 2024参加：入賞なし</div>
                <div>2024年9月：技育ハッカソン</div>
                <div>2024年10月：インターンシップ採用</div>
                <div>2024年10月：NaniwaNOG2一般参加</div>
                <div>2024年10月：Kyoto Tech Talk#6参加</div>
                <div>2024年12月：Kyoto.go#56参加</div>
                <div>2025年1月：Kyoto.kt キックオフ参加</div>
                <div>2025年2月：Kyoto.kt#1参加</div>
                <div>2025年2月：Progate BAR参加</div>
                <div>2025年2月：KC3 Hack参加</div>
                <div>2025年3月：Kyoto.cs#0参加</div>
                <div>2025年3月：Kyoto.rb参加</div>
                <div>2025年3月：Kyoto.kt#2参加</div>
                <div>2025年3月：Kyoto.rb参加</div>
                <div>2025年4月：Kyoto.cs#1参加</div>
                <div>2025年4月：RubyKaigi2025 SMSさんの支援で参加</div>
                <div>2025年4月：SmartHR Drinkup at RubyKaigi 2025 Day 0 参加</div> 
                <div>2025年4月：RubyKaigi Uchiage by Sakura internet 参加</div> 
                <div>2025年4月：Wellness up! Morning CrossFit at RubyKaigi Day4参加</div> 
                <div>2025年5月：Kyoto.cs#2参加</div> 
                <div>2025年5月：Kyoto.kt#3参加</div> 
                <div>2025年5月：Kyoto Tech Talk 学生枠にてLT登壇</div> 
                <div>2025年5月：Kyoto.cs#3 参加</div> 
                <div>2025年6月：Ropppongi.rb#31参加</div> 
              <div>2025年6月：ANDPAD ✖️ 関西Ruby会議08 Day0 晩餐会 参加</div> 
                <div>2025年6月：関西Ruby会議参加</div> 
                <div>2025年7月：ICPC参加：1完</div> 
                <div>2025年7月：Cloudflare Workers Tech Talk in Kyoto#1 参加</div> 
                <div>2025年7月：Kyoto.kt#4参加</div> 
                <div>2025年7月：NaniwaNOG NOC 採択</div> 
                <div>2025年7月：SECCON Beginners CTF 2025 参加：最終222位</div> 
                <div>2025年8月：SPAJAM：優秀賞</div> 
                <div>2025年8月：Kyoto.なんか#7参加</div> 
                <div>2025年8月：NaniwaNOG NOCとして参加</div> 
                <div>2025年8月：ICTSC予選：通過</div> 
                <div>2025年9月：SmartHR夏季インターンシップ参加</div> 
                <div>2025年9月：TwoGateハッカソン参加</div> 
                <div>2025年9月：Roppongi.rb Proposals on Rails 参加</div> 
                <div>2025年9月：Kaigi on Rails 参加</div> 
                <div>2025年10月：JANOG NOC採択</div> 
                <div>2025年10月：Kyoto.rb Meetup 参加</div> 
                <div>2025年11月：Kyoto.kt#5参加</div> 
                <div>2025年11月：まっちゃ139勉強会</div> 
                <div>2025年12月：Kyoto Teck Talk#9 参加</div> 
                <div>2025年12月：ICTSC 二時予選：敗退</div> 
                <div>2025年12月：Kyoto.rb Meetup 参加</div> 
                <div>2026年1月：Kyoto.kt#6 参加</div> 
                <div>2026年1月：「つながらない」から始めるネットワーク入門</div> 
                <div>2026年2月：JANOC NOC(ケーブルチーム)として参加</div> 
                <div>2026年2月：さくらの夕べ in 大阪 参加</div> 
                <div>2026年2月：Go College 参加</div> 
                <div>2026年2月：KC3 Hack 参加</div> 
                <div>2026年2月：ケーブルテクノフェア in Kansai 2026 参加</div> 
                <div>2026年2月：ネットワークゆるLT大会 in 京都 参加</div>
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
                <div className="mt-4 ml-0 flex justify-between w-[30%]">
                  <a
                    href="https://x.com/retasusan_510"
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
