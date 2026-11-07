<script setup lang="ts">
import type { ArchiveList } from "../../../src/lib/archive";
import { formatDate } from "../../../src/libs/format";
import CMSNotice from "../../components/blog/CMSNotice.vue";
const { data, error } = await useFetch<ArchiveList>("/api/notifications");
if (error.value) throw createError({ statusCode: error.value.statusCode ?? 502, message: "お知らせを取得できませんでした" });
useSeoMeta({ title: "お知らせ | Retasusan", description: "ブログの更新やRetasusanからのお知らせ。" });
</script>
<template><div class="page-content"><NuxtLink to="/" class="back-link">← ホーム</NuxtLink><header class="page-intro"><h1>お知らせ</h1></header><CMSNotice :configured="data?.configured ?? false" /><div class="news-list"><NuxtLink v-for="note in data?.contents ?? []" :key="note.id" :to="`/notifications/${note.id}`" class="news-row"><time :datetime="note.createdAt">{{ formatDate(note.createdAt) }}</time><span>{{ note.title }}</span><span aria-hidden="true">↗</span></NuxtLink></div><p v-if="!data?.contents.length" class="emptyNote">新しいお知らせはまだありません。</p></div></template>
