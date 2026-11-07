<script setup lang="ts">
import Section from "../Section.vue";
defineProps<{ number: number }>();
const { profile } = usePortfolio();
</script>
<template>
  <Section id="contact" :number="number" title="ほかの場所">
    <dl class="contactList"><div v-for="social in profile.socials" :key="social.href"><dt><a :href="social.href">{{ social.label }} ↗</a></dt><dd>{{ social.description }}</dd></div></dl>
  </Section>
</template>
