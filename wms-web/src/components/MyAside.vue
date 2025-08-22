<template>
  <el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      :collapse-transition="false"
      default-active="/Home/MyMain"
      router
  >
    <el-menu-item index="/Home/MyMain">
      <el-icon><house /></el-icon>
      <template #title>首页</template>
    </el-menu-item>

    <el-sub-menu index="/admin">
      <template #title>
        <el-icon><setting /></el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/Home/admin/MyAdmin">管理员管理</el-menu-item>
        <el-menu-item index="/Home/user/MyUser">用户管理</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <el-sub-menu index="/data">
      <template #title>
        <el-icon><document-copy /></el-icon>
        <span>基础数据</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/Home/storage/MyStorage">仓库管理</el-menu-item>
        <el-menu-item index="/Home/goodstype/MyGoodstype">分类管理</el-menu-item>
        <el-menu-item index="/Home/goods/MyGoods">货品管理</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <el-menu-item index="/Home/record/MyRecord">
      <el-icon><files /></el-icon>
      <template #title>出入库管理</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { defineProps } from 'vue';
import { House, Setting, DocumentCopy, Files } from '@element-plus/icons-vue';

// 使用 defineProps 接收父组件传递的 isCollapse 状态
const props = defineProps({
  isCollapse: Boolean,
});
</script>

<style scoped>
.el-menu {
  height: 100%; /* 添加这一行 */
  border-right: none;
}
</style>