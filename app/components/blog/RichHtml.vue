<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { sanitizeHtml } from "../../../src/lib/markdown";
const props = defineProps<{ content: string }>();
const container = ref<HTMLElement>();
const html = computed(() => sanitizeHtml(props.content));
let prism: Promise<typeof import('prismjs')> | undefined;
async function highlight() {
  await nextTick();
  if (!container.value) return;
  prism ??= import("prismjs");
  const module = await prism;
  const highlighter = ("default" in module ? module.default : module) as typeof import("prismjs");
  highlighter.highlightAllUnder(container.value);
}
onMounted(highlight);
watch(() => props.content, highlight);
</script>
<template><div ref="container" class="article-prose" v-html="html" /></template>
