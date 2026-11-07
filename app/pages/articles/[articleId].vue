<script setup lang="ts">
import type { ArchiveDetail } from "../../../src/lib/archive";
import { formatDate } from "../../../src/libs/format";
import RichHtml from "../../components/blog/RichHtml.vue";
const route = useRoute();
const { data: article, error } = await useFetch<ArchiveDetail>(`/api/articles/${encodeURIComponent(String(route.params.articleId))}`);
if (error.value || !article.value) throw createError({ statusCode: error.value?.statusCode ?? 404, message: "記事が見つかりません" });
useSeoMeta({ title: () => `${article.value?.title} | Retasusan`, description: () => article.value?.description });
</script>
<template><article v-if="article" class="page-content"><NuxtLink to="/articles" class="back-link">← 記事一覧</NuxtLink><header class="detail-header"><h1>{{ article.title }}</h1><div class="tags"><span v-for="tag in article.tags" :key="tag"># {{ tag }}</span></div><div class="detail-dates"><span>公開 <time :datetime="article.createdAt">{{ formatDate(article.createdAt) }}</time></span><span>更新 <time :datetime="article.updatedAt">{{ formatDate(article.updatedAt) }}</time></span></div></header><RichHtml :content="article.content" /></article></template>
