<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

const route = useRoute();
const nuxt = useNuxtApp();
const { profile, visibleSections } = usePortfolio();
const activeSection = ref("");
let observer: IntersectionObserver | undefined;
let introObserver: IntersectionObserver | undefined;
let removePageHook: (() => void) | undefined;

function disconnect() { observer?.disconnect(); introObserver?.disconnect(); }
async function observeSections() {
  disconnect();
  activeSection.value = "";
  await nextTick();
  if (route.path !== "/" || !("IntersectionObserver" in window)) return;
  observer = new IntersectionObserver((entries) => {
    const entry = entries.find((item) => item.isIntersecting);
    if (entry) activeSection.value = entry.target.id;
  }, { rootMargin: "-10% 0px -60% 0px" });
  for (const section of visibleSections) {
    const element = document.getElementById(section.id);
    if (element) observer.observe(element);
  }
  introObserver = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) activeSection.value = "";
  });
  const intro = document.getElementById("portfolio-heading");
  if (intro) introObserver.observe(intro);
}

onMounted(() => {
  observeSections();
  removePageHook = nuxt.hook("page:finish", observeSections);
});
watch(() => route.path, observeSections);
onBeforeUnmount(() => { disconnect(); removePageHook?.(); });
</script>

<template>
  <header class="sidebar">
    <div class="sidebarInner">
      <div class="identity">
        <NuxtLink to="/" class="name">{{ profile.name }}</NuxtLink>
        <p class="tagline">{{ profile.tagline }}</p>
        <img src="/icons/avatar.jpeg" :alt="`${profile.name}のアイコン`" width="40" height="40" class="avatar">
        <p class="description">Web とネットワーク。<br>制作と、仕事と、日々の記録。</p>
      </div>
      <nav class="nav" aria-label="ポートフォリオのセクション">
        <NuxtLink
          v-for="section in visibleSections" :key="section.id" :to="`/#${section.id}`"
          :aria-current="(route.path === '/' && activeSection === section.id) || (route.path === '/about' && section.id === 'about') ? 'location' : undefined"
          @click="activeSection = section.id"
        >{{ section.label }}<span>{{ section.id === 'works' ? 'Projects' : section.id === 'about' ? 'About' : section.id === 'skills' ? 'Tools' : section.id === 'activities' ? 'Archive' : 'Elsewhere' }}</span></NuxtLink>
        <NuxtLink to="/articles" :aria-current="route.path.startsWith('/articles') ? 'page' : undefined">記事<span>Writing</span></NuxtLink>
      </nav>
    </div>
    <div class="sidebarBottom">
      <a v-for="social in profile.socials.filter(item => ['GitHub', 'Scrapbox', 'X'].includes(item.label))" :key="social.href" :href="social.href">{{ social.label }} ↗</a>
    </div>
  </header>
</template>
