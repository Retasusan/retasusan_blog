<script setup lang="ts">
import type { Project } from "../../../src/content/types";
import MarkdownBody from "./MarkdownBody.vue";
defineProps<{ project: Project }>();
</script>

<template>
  <article :id="`project-${project.id}`" class="projectCard" :class="{ featuredProject: project.featured }">
    <div class="projectHeading">
      <p class="projectCategory">{{ project.category }}</p>
      <h3>{{ project.title }}</h3>
      <p class="projectSummary">{{ project.summary }}</p>
      <ul class="technologyList" aria-label="使用技術"><li v-for="technology in project.technologies" :key="technology">{{ technology }}</li></ul>
    </div>
    <div class="projectBody">
      <figure v-if="project.image" class="projectImage"><img :src="project.image.src" :alt="project.image.alt" loading="lazy"></figure>
      <MarkdownBody v-if="project.description" :content="project.description" class="projectDescription" />
      <div v-if="project.links.length" class="projectLinks"><a v-for="link in project.links" :key="link.href" :href="link.href" :aria-label="`${project.title}: ${link.label}`">{{ link.label }} ↗</a></div>
    </div>
  </article>
</template>
