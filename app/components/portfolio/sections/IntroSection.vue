<script setup lang="ts">
const { profile, visibleSections } = usePortfolio();
const destination = visibleSections.find(section => section.id === "works") ?? visibleSections[0];
</script>
<template>
  <section class="intro" aria-labelledby="portfolio-heading">
    <p class="introLabel">Portfolio / {{ profile.name }}</p>
    <h1 id="portfolio-heading"><span v-for="(line, index) in profile.headline" :key="index">{{ line }}</span></h1>
    <p class="introText">{{ profile.introduction }}</p>
    <a v-if="destination" class="introLink" :href="`#${destination.id}`">{{ destination.label }}を見る ↓</a>
  </section>
</template>
