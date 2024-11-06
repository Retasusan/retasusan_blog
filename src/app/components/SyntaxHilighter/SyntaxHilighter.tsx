"use client";
import { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-jsx"; // JSX用のコンポーネント
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-python"; // Pythonの例（必要に応じて追加）

type Props = {
  content: string;
};

const highlight = (code: string, language = "markup") => {
  return Prism.highlight(code, Prism.languages[language], language);
};

export default function SyntaxHighlighter({ content }: Props) {
  const [highlightedContent, setHighlightedContent] = useState<string>(content);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    // `div[data-filename] pre code` 要素を全て取得
    const codeElements = doc.querySelectorAll("div[data-filename] pre code");

    // 各 `pre code` にシンタックスハイライトを適用
    codeElements.forEach((element) => {
      const language = element.classList[0]?.slice(9); // "language-" を取り除く
      if (language) {
        // 必要な言語コンポーネントがプリロードされているか確認
        const code = element.textContent || "";
        const highlightedCode = highlight(code, language);

        // ハイライトされたコードを元の HTML に設定
        element.innerHTML = highlightedCode;
      }
    });

    // ハイライトされたコンテンツを state に設定
    setHighlightedContent(doc.body.innerHTML);
  }, [content]);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: highlightedContent, // ハイライトされたコンテンツを表示
      }}
    />
  );
}
