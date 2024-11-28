import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import * as crypto from "crypto";

export async function POST(request: Request): Promise<Response> {
  const bodyText = await request.text();
  const bodyBuffer = Buffer.from(bodyText, "utf-8");

  const secret = process.env.MICROCMS_WEBHOOK_SIGNATURE_SECRET;
  console.log(secret);
  if (!secret) {
    console.error("Secret is empty.");
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }

  const signature = request.headers.get("X-MICROCMS-Signature");
  if (!signature) {
    console.error("Signature is empty.");
    return NextResponse.json({ message: "Signature missing" }, { status: 400 });
  }

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(bodyBuffer)
    .digest("hex");

  if (
    Buffer.from(signature).length !== Buffer.from(expectedSignature).length ||
    !crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    )
  ) {
    console.error("Invalid signature.");
    return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
  }

  try {
    revalidateTag("articles");
    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { message: "Revalidation failed" },
      { status: 500 }
    );
  }
}
