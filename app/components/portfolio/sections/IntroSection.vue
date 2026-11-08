<script setup lang="ts">
const { profile } = usePortfolio();
</script>
<template>
  <section class="intro" aria-labelledby="portfolio-heading">
    <p class="introLabel">Portfolio / {{ profile.name }}</p>
    <h1 id="portfolio-heading"><span v-for="(line, index) in profile.headline" :key="index">{{ line }}</span></h1>
  </section>
</template>
