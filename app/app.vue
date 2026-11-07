<script setup lang="ts">
import SiteShell from "./components/ui/SiteShell.vue";
const { profile } = usePortfolio();
useSeoMeta({ title: () => `${profile.name} | Portfolio`, description: () => profile.introduction });
</script>

<template>
  <SiteShell><NuxtPage /></SiteShell>
</template>
