<script setup lang="ts">
import { computed } from "vue";
import { renderMarkdown } from "../../../src/lib/markdown";
const props = defineProps<{ content: string }>();
const html = computed(() => renderMarkdown(props.content));
</script>
<template><div class="markdown" v-html="html" /></template>
