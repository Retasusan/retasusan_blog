<script setup lang="ts">
import Section from "../Section.vue";
import ProjectCard from "../ProjectCard.vue";
defineProps<{ number: number }>();
const { projects } = usePortfolio();
</script>
<template>
  <Section id="works" :number="number" title="制作したもの">
    <div class="worksList"><ProjectCard v-for="project in projects" :key="project.id" :project="project" /></div>
    <p v-if="!projects.length" class="emptyNote">制作物は、これから少しずつ追加していきます。</p>
  </Section>
</template>
