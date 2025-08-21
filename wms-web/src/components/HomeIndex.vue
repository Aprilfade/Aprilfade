<template>
  <el-container style="height: 100vh;">
    <el-aside :style="{ width: aside_width }" style="background-color: rgb(238, 241, 246);">
      <MyAside :is-collapse="isCollapse"></MyAside>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px; border-bottom: 1px solid #eee;">
        <MyHeader @doCollapse="doCollapse" :icon="icon"></MyHeader>
      </el-header>

      <el-main style="padding: 10px;">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
// 3. 引入 vue 的 ref 和 computed，以及子组件
import { ref, computed } from 'vue';
import MyAside from "./MyAside.vue";
import MyHeader from "./MyHeader.vue";
// Element Plus 的图标需要单独引入
import { Fold, Expand } from '@element-plus/icons-vue';

// 4. 定义响应式状态 (等同于 data)
const isCollapse = ref(false);

// 5. 定义计算属性 (等同于 computed)
const aside_width = computed(() => (isCollapse.value ? '64px' : '200px'));
const icon = computed(() => (isCollapse.value ? Expand : Fold));

// 6. 定义方法 (等同于 methods)
const doCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
</script>

<style scoped>
.el-header {
  --el-header-padding: 0 20px; /* Element Plus 中调整 Header 内边距的方式 */
  display: flex;
  align-items: center;
}
.el-aside {
  transition: width 0.3s;
  -webkit-transition: width 0.3s;
  -moz-transition: width 0.3s;
  -o-transition: width 0.3s;
}
</style>