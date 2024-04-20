<template>
  <div class="topNav">
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      class="el-menu-demo"
      :router="true"
      active-text-color="#53297b"
      background-color="none"
      @select="handleSelect">
      <el-menu-item index="/">
        <img style="width: 60px" src="./img/docs.svg" alt="HOME" />
      </el-menu-item>
      <el-menu-item index="/docs">文档</el-menu-item>
      <el-menu-item index="/blog">博客</el-menu-item>
      <el-menu-item index="/interview">面试题</el-menu-item>
      <el-menu-item index="/questions">问题</el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const activeIndex = ref("0");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style scoped lang="scss">
.topNav {
  margin: 5px;
  :deep(.el-menu--horizontal > .el-menu-item) {
    border-bottom: none;
    --el-menu-hover-bg-color: none;
  }
  .is-active {
    font-weight: 700;
    font-size: 105%;
  }
}
</style>
