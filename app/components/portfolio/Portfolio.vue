<script setup lang="ts">
import type { Component } from "vue";
import type { PortfolioSectionId } from "../../../src/content/types";
import IntroSection from "./sections/IntroSection.vue";
import WorksSection from "./sections/WorksSection.vue";
import AboutSection from "./sections/AboutSection.vue";
import SkillsSection from "./sections/SkillsSection.vue";
import ActivitiesSection from "./sections/ActivitiesSection.vue";
import ContactSection from "./sections/ContactSection.vue";
const { visibleSections } = usePortfolio();
const registry: Record<PortfolioSectionId, Component> = {
  works: WorksSection, about: AboutSection, skills: SkillsSection, activities: ActivitiesSection, contact: ContactSection,
};
</script>
<template>
  <div class="portfolio"><IntroSection /><component :is="registry[section.id]" v-for="(section, index) in visibleSections" :key="section.id" :number="index + 1" /></div>
</template>
