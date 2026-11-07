<script setup lang="ts">
import { computed, ref } from "vue";
import type { ArchiveItem } from "../../../src/lib/archive";
import { filterArticles } from "../../../src/lib/archive";
import { formatDate } from "../../../src/libs/format";
const props = defineProps<{ articles: ArchiveItem[] }>();
const query = ref("");
const tag = ref("");
const tags = computed(() => [...new Set(props.articles.flatMap(article => article.tags ?? []))]);
const filtered = computed(() => filterArticles(props.articles, query.value, tag.value));
function reset() { query.value = ""; tag.value = ""; }
</script>
<template>
  <div v-if="articles.length" class="article-tools">
    <label class="search-field"><span class="sr-only">記事を検索</span><input v-model="query" type="search" placeholder="タイトル・キーワードで検索"></label>
    <div v-if="tags.length" class="filter-tags" role="group" aria-label="タグで絞り込み"><button type="button" :aria-pressed="!tag" :class="{ selected: !tag }" @click="tag = ''">すべて</button><button v-for="item in tags" :key="item" type="button" :aria-pressed="tag === item" :class="{ selected: tag === item }" @click="tag = item">{{ item }}</button></div>
    <p class="result-count" role="status">{{ filtered.length }} 件の記事</p>
  </div>
  <div class="article-list">
    <article v-for="article in filtered" :key="article.id" class="article-row"><NuxtLink :to="`/articles/${article.id}`" class="article-link"><div class="article-row-body"><div class="article-meta"><time :datetime="article.createdAt">{{ formatDate(article.createdAt) }}</time></div><h2>{{ article.title }} <span aria-hidden="true">↗</span></h2><p class="article-description">{{ article.description }}</p><div class="tags"><span v-for="item in article.tags" :key="item"># {{ item }}</span></div></div><img v-if="article.thumbnail?.url" class="article-thumbnail" :src="article.thumbnail.url" alt="" loading="lazy"></NuxtLink></article>
    <div v-if="!filtered.length" class="empty-state"><h2>{{ articles.length ? '記事が見つかりませんでした' : '記事はこれから。' }}</h2><p>{{ articles.length ? 'キーワードやタグを変えて探してみてください。' : '新しい記事が公開されるまで、少しお待ちください。' }}</p><button v-if="articles.length" type="button" class="text-link" @click="reset">絞り込みをリセット</button></div>
  </div>
</template>
