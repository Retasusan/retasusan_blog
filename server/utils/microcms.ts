import { createClient } from "microcms-js-sdk";
import type { H3Event } from "h3";
import type { ArchiveDetail, ArchiveItem, ArchiveList } from "../../src/lib/archive";

type Endpoint = "articles" | "notifications";

function getClient(event: H3Event) {
  const config = useRuntimeConfig(event);
  const cloudflareEnv = event.context.cloudflare?.env as {
    SERVICE_DOMAIN?: string;
    API_KEY?: string;
  } | undefined;
  const serviceDomain = cloudflareEnv?.SERVICE_DOMAIN || process.env.SERVICE_DOMAIN || config.microcmsServiceDomain;
  const apiKey = cloudflareEnv?.API_KEY || process.env.API_KEY || config.microcmsApiKey;
  return serviceDomain && apiKey ? createClient({ serviceDomain, apiKey }) : null;
}

export async function getArchiveList(event: H3Event, endpoint: Endpoint): Promise<ArchiveList> {
  const client = getClient(event);
  if (!client) return { contents: [], configured: false };
  try {
    const result = await client.getList<ArchiveItem>({ endpoint, queries: { limit: 100 } });
    return { contents: result.contents, configured: true };
  } catch {
    throw createError({ statusCode: 502, message: "記事データを取得できませんでした" });
  }
}

export async function getArchiveDetail(event: H3Event, endpoint: Endpoint) {
  const id = getRouterParam(event, "id");
  if (!id) throw createError({ statusCode: 400, message: "記事 ID が必要です" });
  const client = getClient(event);
  if (!client) throw createError({ statusCode: 404, message: "記事が見つかりません" });
  try {
    return await client.getListDetail<ArchiveDetail>({ endpoint, contentId: id });
  } catch (error) {
    if (error instanceof Error && /status:\s*404/.test(error.message)) {
      throw createError({ statusCode: 404, message: "記事が見つかりません" });
    }
    throw createError({ statusCode: 502, message: "記事データを取得できませんでした" });
  }
}
