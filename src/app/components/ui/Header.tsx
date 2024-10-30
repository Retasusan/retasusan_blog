import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-5 bg-white shadow-md">
      <Link href="/">
        <h1 className="text-3xl font-semibold text-accentGreen">
          Retasusan&apos;s Blog
        </h1>
      </Link>
      <nav className="flex gap-5">
        <div className="text-accentBlue hover:text-[#89d7ef] hover:underline">
          <Link href="/articles">記事</Link>
        </div>
        <div className="text-accentBlue hover:text-[#89d7ef] hover:underline">
          <Link href="/notifications">お知らせ</Link>
        </div>
        <div className="text-accentBlue hover:text-[#89d7ef] hover:underline">
          <Link href="/about">筆者について</Link>
        </div>
      </nav>
    </header>
  );
}
