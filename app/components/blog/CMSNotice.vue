<script setup lang="ts">
defineProps<{ configured: boolean }>();
const development = import.meta.dev;
</script>
<template><aside v-if="development && !configured" class="cms-notice"><strong>プレビュー表示</strong><p>microCMS が未設定です。SERVICE_DOMAIN と API_KEY を設定すると記事を表示できます。</p></aside></template>
