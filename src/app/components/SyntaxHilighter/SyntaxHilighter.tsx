"use client";
import { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-python";

type Props = {
  content: string;
};

const highlight = (code: string, language = "markup") => {
  return Prism.highlight(code, Prism.languages[language], language);
};

const processContent = (content: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");

  const codeElements = doc.querySelectorAll("div[data-filename] pre code");

  codeElements.forEach((element) => {
    const language = element.classList[0]?.slice(9); // "language-" を取り除く
    if (language) {
      const code = element.textContent || "";
      const highlightedCode = highlight(code, language);
      element.innerHTML = highlightedCode;
    }
  });

  return doc.body.innerHTML;
};

export default function SyntaxHighlighter({ content }: Props) {
  const [highlightedContent, setHighlightedContent] = useState<string>(() =>
    processContent(content)
  );

  useEffect(() => {
    setHighlightedContent(processContent(content));
  }, [content]);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: highlightedContent,
      }}
    />
  );
}
