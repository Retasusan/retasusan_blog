<script setup lang="ts">
import Sidebar from "./Sidebar.vue";
import SiteFooter from "./SiteFooter.vue";
</script>

<template>
  <a class="skip-link" href="#main-content">本文へ移動</a>
  <div class="site-shell">
    <Sidebar />
    <div class="content-pane">
      <main id="main-content"><slot /></main>
      <SiteFooter />
    </div>
  </div>
</template>
