<template>
  <el-container class="main-container">
    <el-aside :width="aside_width" class="main-aside">
      <MyAside :is-collapse="isCollapse" />
    </el-aside>

    <el-container>
      <el-header class="main-header">
        <MyHeader @doCollapse="doCollapse" />
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import MyAside from "@/components/MyAside.vue";
import MyHeader from "@/components/MyHeader.vue";

// 控制是否折叠的核心状态
const isCollapse = ref(false);

// 根据 isCollapse 状态动态计算侧边栏宽度
const aside_width = computed(() => (isCollapse.value ? '64px' : '200px'));

// 这个方法会由 MyHeader 组件触发
const doCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
</script>

<style scoped>
.main-container {
  height: 100vh;
}

.main-aside {
  background-color: rgb(238, 241, 246);
  transition: width 0.3s;
}

.main-header {
  border-bottom: 1px solid #ccc;
  background-color: #B3C0D1;
}
</style>