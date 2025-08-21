<template>
  <el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="height: 100vh; border-right: none;"
      :default-active="route.path"
      :collapse="props.isCollapse"
      :collapse-transition="false"
      router
  >
    <el-menu-item index="/">
      <el-icon><home-filled /></el-icon>
      <span>首页</span>
    </el-menu-item>

    <el-sub-menu :index="item.id + ''" v-for="item in menu" :key="item.id">
      <template #title>
        <el-icon><component :is="iconMap[item.menuicon]" /></el-icon>
        <span>{{ item.menuname }}</span>
      </template>

      <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="'/' + subItem.menuclick">
        <el-icon><component :is="iconMap[subItem.menuicon]" /></el-icon>
        <span>{{ subItem.menuname }}</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { defineProps } from 'vue';
// 3. 引入所有需要用到的图标
import { HomeFilled, User, Box, Files, Tickets, Suitcase, Document } from '@element-plus/icons-vue';

// 4. 定义一个图标映射对象
const iconMap = {
  'el-icon-s-custom': User,
  'el-icon-user-solid': User,
  'el-icon-s-goods': Box,
  'el-icon-s-order': Files,
  'el-icon-s-management': Suitcase,
  'el-icon-document': Document,
  'el-icon-tickets': Tickets
};

const store = useStore();
const route = useRoute(); // 获取当前路由信息，用于高亮菜单

// 5. 定义props，接收父组件传来的isCollapse
const props = defineProps({
  isCollapse: Boolean
});

// 6. 使用 computed 从 Vuex store 中获取菜单数据
const menu = computed(() => store.state.menu);
</script>

<style scoped>
/* 可以在这里添加自定义样式 */
</style>