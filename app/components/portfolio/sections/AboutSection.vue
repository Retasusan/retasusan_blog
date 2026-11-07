<script setup lang="ts">
import Section from "../Section.vue";
import MarkdownBody from "../MarkdownBody.vue";
defineProps<{ number: number }>();
const { profile } = usePortfolio();
</script>
<template>
  <Section id="about" :number="number" title="自己紹介">
    <MarkdownBody :content="profile.body" class="biography" />
    <p v-if="profile.personalNote" class="personalNote">{{ profile.personalNote }}</p>
    <dl class="interests"><dt>関心</dt><dd>{{ profile.interests.join(' / ') }}</dd></dl>
  </Section>
</template>
