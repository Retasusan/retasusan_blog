<script setup lang="ts">
import AboutSection from "../components/portfolio/sections/AboutSection.vue";
import SkillsSection from "../components/portfolio/sections/SkillsSection.vue";
import ActivitiesSection from "../components/portfolio/sections/ActivitiesSection.vue";
const { profile } = usePortfolio();
useSeoMeta({ title: `${profile.name} | プロフィール`, description: profile.introduction });
</script>
<template><div class="portfolio subpage"><NuxtLink class="back-link" to="/">← ホーム</NuxtLink><h1 class="pageTitle">プロフィール</h1><AboutSection :number="1" /><SkillsSection :number="2" /><ActivitiesSection :number="3" /></div></template>
