import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/components/ui/Header";
import Footer from "@/app/components/ui/Footer";

export const metadata: Metadata = {
  title: "Retasusan's Blog",
  description: "Retasusanのブログ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <div className="pb-16">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
