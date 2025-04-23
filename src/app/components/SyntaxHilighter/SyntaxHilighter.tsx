"use client";
import { useEffect, useState, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-markdown";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/toolbar/prism-toolbar.css";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-python";

import "@/app/style/articleStyle.css";

type Props = {
  content: string;
};

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: Element) => void;
      };
    };
  }
}

export default function SyntaxHighlighter({ content }: Props) {
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && containerRef.current) {
      containerRef.current.querySelectorAll("pre code").forEach((block) => {
        block.classList.add("line-numbers", "copy-to-clipboard"); // プラグインのクラスを追加
        Prism.highlightElement(block);
      });

      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load(containerRef.current);
      }
    }
  }, [isClient, content]);

  useEffect(() => {
    if (
      !document.querySelector(
        "script[src='https://platform.twitter.com/widgets.js']"
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  if (!isClient) {
    return <div>Loading the content...</div>;
  }

  return (
    <div
      ref={containerRef}
      className="prose article-content"
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
}
