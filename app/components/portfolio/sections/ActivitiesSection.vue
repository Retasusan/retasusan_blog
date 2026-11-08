<script setup lang="ts">
import type { Activity } from "../../../../src/content/types";
import { computed } from "vue";
import Section from "../Section.vue";
import MarkdownBody from "../MarkdownBody.vue";
defineProps<{ number: number }>();
const { activities } = usePortfolio();
const kindLabels: Record<Activity["kind"], string> = {
  work: "インターン・アルバイト", internship: "インターン・アルバイト", conference: "カンファレンス", hackathon: "ハッカソン", contest: "コンテスト", event: "イベント", project: "制作", learning: "学び",
};
const groupDefinitions: { id: string; title: string; kinds: Activity["kind"][] }[] = [
  { id: "conference", title: "カンファレンス", kinds: ["conference"] },
  { id: "internship", title: "インターン・アルバイト", kinds: ["internship", "work"] },
  { id: "hackathon", title: "ハッカソン", kinds: ["hackathon"] },
  { id: "contest", title: "コンテスト", kinds: ["contest"] },
  { id: "event", title: "イベント", kinds: ["event"] },
  { id: "other", title: "職歴・学び・制作", kinds: ["work", "learning", "project"] },
];
const groups = computed(() => groupDefinitions
  .map(group => ({ ...group, entries: activities.filter(activity => group.kinds.includes(activity.kind)) }))
  .filter(group => group.entries.length > 0));
</script>
<template>
  <Section id="activities" :number="number" title="経歴と活動">
    <p class="sectionNote">項目を開くと、担当したことや出典を読めます。</p>
    <section v-for="group in groups" :key="group.id" class="activityGroup" :aria-labelledby="`activity-group-${group.id}`">
      <h3 :id="`activity-group-${group.id}`" class="activityGroupTitle">{{ group.title }} <span>{{ group.entries.length }}</span></h3>
      <details class="activityGroupDetails" :open="group.entries.length <= 4">
      <summary class="activityGroupSummary"><span class="activityGroupAction activityGroupActionOpen">一覧を見る</span><span class="activityGroupAction activityGroupActionClose">閉じる</span></summary>
      <ol class="activityList">
        <li v-for="activity in group.entries" :id="`activity-${activity.id}`" :key="activity.id">
          <details class="activity" :open="activity.endDate === 'present'">
            <summary>
              <span class="activityHeading"><span v-if="group.id === 'other'" class="activityKind">{{ kindLabels[activity.kind] }}</span><span class="activityTitle">{{ activity.title }}</span></span>
              <span class="activityPeriod"><time :datetime="activity.date">{{ activity.date.replaceAll('-', '.') }}</time><template v-if="activity.endDate"><span class="periodSeparator">—</span><span v-if="activity.endDate === 'present'">現在</span><time v-else :datetime="activity.endDate">{{ activity.endDate.replaceAll('-', '.') }}</time></template></span>
            </summary>
            <div class="activityContent"><MarkdownBody v-if="activity.description" :content="activity.description" class="activityDescription" /><div v-if="activity.links?.length" class="activityLinks"><a v-for="link in activity.links" :key="link.href" :href="link.href">{{ link.label }} ↗</a></div><p v-if="!activity.description && !activity.links?.length" class="sectionNote">{{ activity.title }}</p></div>
          </details>
        </li>
      </ol>
      </details>
    </section>
    <p v-if="!activities.length" class="emptyNote">活動の記録を、これから追加していきます。</p>
  </Section>
</template>
