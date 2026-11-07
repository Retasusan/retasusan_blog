<script setup lang="ts">
const { profile } = usePortfolio();
</script>
<template>
  <footer class="site-footer">
    <p>ここまで読んでいただき、ありがとうございます。</p>
    <div class="footer-inner"><span>© {{ new Date().getFullYear() }} {{ profile.name }}</span><a href="#main-content">ページの先頭へ ↑</a></div>
  </footer>
</template>
