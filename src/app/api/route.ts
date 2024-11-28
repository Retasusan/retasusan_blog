// Next.jsのAPIルートで使用されるリクエストとレスポンスの型をインポート
import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const secret = process.env.MICROCMS_WEBHOOK_SIGNATURE_SECRET;
  if (req.method !== "POST") return res.status(405).send("Method not allowed");
  if (!req.headers["x-microcms-signature"])
    return res.status(401).send("Invalid signature");
  if (!secret) return res.status(500).send("Server configuration error");

  const signature = req.headers["x-microcms-signature"] as string;
  // シークレット値とリクエストボディをハッシュ化
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (signature !== expectedSignature)
    return res.status(401).send("Invalid signature");

  try {
    await res.revalidate("/projects");
    return res.status(200).send("Revalidated");
  } catch {
    return res.status(500).send("Error revalidating");
  }
}
