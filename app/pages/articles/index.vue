<script setup lang="ts">
import type { ArchiveList } from "../../../src/lib/archive";
import ArticleList from "../../components/blog/ArticleList.vue";
import CMSNotice from "../../components/blog/CMSNotice.vue";
const { data, error } = await useFetch<ArchiveList>("/api/articles");
if (error.value) throw createError({ statusCode: error.value.statusCode ?? 502, message: "記事を取得できませんでした" });
useSeoMeta({ title: "記事一覧 | Retasusan", description: "技術のメモや日々の記録。Retasusanの記事一覧。" });
</script>
<template><div class="page-content"><NuxtLink class="back-link" to="/">← ホーム</NuxtLink><header class="page-intro"><h1>記事</h1><p class="intro-description">技術のこと、日々のこと。</p></header><CMSNotice :configured="data?.configured ?? false" /><ArticleList :articles="data?.contents ?? []" /></div></template>
