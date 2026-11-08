<script setup lang="ts">
const { profile, visibleSections } = usePortfolio();
const destination = visibleSections.find(section => section.id === "works") ?? visibleSections[0];
const links = profile.socials.filter(link => ["GitHub", "Zenn"].includes(link.label));
</script>
<template>
  <section class="intro" aria-labelledby="portfolio-heading">
    <p class="introLabel">Portfolio / {{ profile.name }}</p>
    <h1 id="portfolio-heading"><span v-for="(line, index) in profile.headline" :key="index">{{ line }}</span></h1>
    <p class="introText">{{ profile.introduction }}</p>
    <a v-if="destination" class="introLink" :href="`#${destination.id}`">{{ destination.label }}を見る ↓</a>
    <nav v-if="links.length" class="introLinks" aria-label="主要リンク"><a v-for="link in links" :key="link.href" :href="link.href">{{ link.label }} ↗</a></nav>
  </section>
</template>
