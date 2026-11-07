<script setup lang="ts">
import Section from "../Section.vue";
import MarkdownBody from "../MarkdownBody.vue";
defineProps<{ number: number }>();
const { skillGroups } = usePortfolio();
</script>
<template>
  <Section id="skills" :number="number" title="使ってきた技術">
    <div class="skillsList"><div v-for="group in skillGroups" :key="group.id" class="skillGroup"><h3>{{ group.title }}</h3><p>{{ group.technologies.join(' / ') }}</p><MarkdownBody v-if="group.description" :content="group.description" /></div></div>
    <p v-if="!skillGroups.length" class="emptyNote">使ってきた技術を整理しています。</p>
  </Section>
</template>
