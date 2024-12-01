// pages/api/preview.ts

import { NextApiRequest, NextApiResponse } from "next";

export default function preview(req: NextApiRequest, res: NextApiResponse) {
  const { slug, secret } = req.query;

  // セキュリティキーをチェック (microCMS側の設定と一致する値を使用)
  if (secret !== process.env.MICROCMS_PREVIEW_SECRET || !slug) {
    return res.status(401).json({ message: "Invalid token or slug missing" });
  }

  // Previewモードを有効化
  res.setPreviewData({});

  // 対象のページにリダイレクト
  res.redirect(`/articles/${slug}`);
}
