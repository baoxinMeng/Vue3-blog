<template>
  <div class="app">
    <TopNavigation />
    <div class="routerview">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import TopNavigation from "@/components/TopNavigation/index.vue";
</script>

<style scoped lang="scss"></style>
