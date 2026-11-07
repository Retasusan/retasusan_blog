<script setup lang="ts">
import type { ArchiveDetail } from "../../../src/lib/archive";
import { formatDate } from "../../../src/libs/format";
import RichHtml from "../../components/blog/RichHtml.vue";
const route = useRoute();
const { data: note, error } = await useFetch<ArchiveDetail>(`/api/notifications/${encodeURIComponent(String(route.params.notificationId))}`);
if (error.value || !note.value) throw createError({ statusCode: error.value?.statusCode ?? 404, message: "お知らせが見つかりません" });
useSeoMeta({ title: () => `${note.value?.title} | Retasusan`, description: () => note.value?.description });
</script>
<template><article v-if="note" class="page-content"><NuxtLink to="/notifications" class="back-link">← お知らせ一覧</NuxtLink><header class="detail-header"><h1>{{ note.title }}</h1><div class="detail-dates"><span>公開 <time :datetime="note.createdAt">{{ formatDate(note.createdAt) }}</time></span><span>更新 <time :datetime="note.updatedAt">{{ formatDate(note.updatedAt) }}</time></span></div></header><RichHtml :content="note.content" /></article></template>
