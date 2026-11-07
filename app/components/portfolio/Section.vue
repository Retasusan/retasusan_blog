<script setup lang="ts">
import type { PortfolioSectionId } from "../../../src/content/types";
defineProps<{ id: PortfolioSectionId; title: string; number: number }>();
</script>
<template>
  <section :id="id" class="section" :aria-labelledby="`${id}-heading`">
    <header class="sectionHeader"><h2 :id="`${id}-heading`">{{ title }}</h2></header>
    <slot />
  </section>
</template>
