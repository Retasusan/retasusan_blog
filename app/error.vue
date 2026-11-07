<script setup lang="ts">
import type { NuxtError } from "#app";
import SiteShell from "./components/ui/SiteShell.vue";
defineProps<{ error: NuxtError }>();
</script>
<template><SiteShell><div class="page-content error-page"><p class="sectionNote">{{ error.statusCode }}</p><h1 class="pageTitle">{{ error.statusCode === 404 ? 'ページが見つかりませんでした。' : 'ページを表示できませんでした。' }}</h1><p class="intro-description">{{ error.statusCode === 404 ? 'リンク先をご確認ください。' : '時間をおいてもう一度お試しください。' }}</p><button type="button" class="text-link" @click="clearError({ redirect: '/' })">← ホームへ戻る</button></div></SiteShell></template>
