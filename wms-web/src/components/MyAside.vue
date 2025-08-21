<template>
  <el-menu
      class="el-menu-vertical-demo"
      style="height: 100%; border-right: none;"
      :default-active="activePath"
      router
      :collapse="isCollapse"
      :collapse-transition="false"
  >
    <div style="height: 60px; line-height: 60px; text-align: center; font-size: 20px; font-weight: bold;">
      <img src="../assets/logo.png" alt="" style="width: 20px; position: relative; top: 5px; right: 5px;">
      <span v-show="!isCollapse">仓储管理</span>
    </div>


    <template v-for="menu in menuList" :key="menu.id">
      <el-menu-item :index="'/' + menu.menuclick" v-if="!menu.children || menu.children.length === 0">
        <el-icon><component :is="menu.menuIcon" /></el-icon>
        <template #title>
          <span>{{ menu.menuName }}</span>
        </template>
      </el-menu-item>
      <el-sub-menu :index="menu.id + ''" v-else>
        <template #title>
          <el-icon><component :is="menu.menuIcon" /></el-icon>
          <span v-if="!isCollapse">{{ menu.menuName }}</span>
        </template>
        <el-menu-item :index="'/' + item.menuclick" v-for="item in menu.children" :key="item.id">
          <el-icon><component :is="item.menuIcon" /></el-icon>
          <template #title>
            <span>{{ item.menuName }}</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

// 关键：定义并接收来自父组件的 isCollapse 状态
defineProps({
  isCollapse: Boolean
});

const store = useStore();
const route = useRoute();
const menuList = computed(() => store.state.menu);
const activePath = computed(() => route.path);
</script>

<style scoped>
/* 可以在这里添加样式 */
</style>