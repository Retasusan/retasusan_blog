<script setup lang="ts">
import type { Activity } from "../../../../src/content/types";
import Section from "../Section.vue";
import MarkdownBody from "../MarkdownBody.vue";
defineProps<{ number: number }>();
const { activities } = usePortfolio();
const kinds: Record<Activity['kind'], string> = { work: "仕事", event: "イベント", project: "制作", learning: "学び" };
</script>
<template>
  <Section id="activities" :number="number" title="経歴と活動">
    <p class="sectionNote">項目を開くと、担当したことや出典を読めます。</p>
    <ol class="activityList">
      <li v-for="activity in activities" :id="`activity-${activity.id}`" :key="activity.id">
        <details class="activity" :open="activity.endDate === 'present'">
          <summary>
            <span class="activityHeading"><span class="activityKind">{{ kinds[activity.kind] }}</span><span class="activityTitle">{{ activity.title }}</span></span>
            <span class="activityPeriod"><time :datetime="activity.date">{{ activity.date.replaceAll('-', '.') }}</time><template v-if="activity.endDate"><span class="periodSeparator">—</span><span v-if="activity.endDate === 'present'">現在</span><time v-else :datetime="activity.endDate">{{ activity.endDate.replaceAll('-', '.') }}</time></template></span>
          </summary>
          <div class="activityContent"><MarkdownBody v-if="activity.description" :content="activity.description" class="activityDescription" /><div v-if="activity.links?.length" class="activityLinks"><a v-for="link in activity.links" :key="link.href" :href="link.href">{{ link.label }} ↗</a></div><p v-if="!activity.description && !activity.links?.length" class="sectionNote">{{ activity.title }}</p></div>
        </details>
      </li>
    </ol>
    <p v-if="!activities.length" class="emptyNote">活動の記録を、これから追加していきます。</p>
  </Section>
</template>
