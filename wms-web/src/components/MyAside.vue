<template>
  <div>
    <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        background-color="transparent"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        :collapse="isCollapse"
        :collapse-transition="false"
    >
      <div class="logo-container">
        <img src="../assets/logo.png" class="logo-img" />
        <span v-if="!isCollapse" class="logo-text">仓库管理系统</span>
      </div>

      <el-menu-item index="/HomeIndex">
        <el-icon><home-filled /></el-icon>
        <span>首页</span>
      </el-menu-item>

      <el-sub-menu index="/user" v-if="user && user.roleId === 0">
        <template #title>
          <el-icon><avatar /></el-icon>
          <span>账户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/user/admin">管理员管理</el-menu-item>
          <el-menu-item index="/user/normalUser">用户管理</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

      <el-menu-item index="/storage" v-if="user && user.roleId === 0">
        <el-icon><office-building /></el-icon>
        <span>仓库管理</span>
      </el-menu-item>

      <el-menu-item index="/goodstype" v-if="user && user.roleId !== 2">
        <el-icon><grid /></el-icon>
        <span>分类管理</span>
      </el-menu-item>

      <el-menu-item index="/goods">
        <el-icon><goods /></el-icon>
        <span>物品管理</span>
      </el-menu-item>

      <el-menu-item index="/record">
        <el-icon><document-copy /></el-icon>
        <span>记录管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { HomeFilled, Avatar, OfficeBuilding, Grid, Goods, DocumentCopy } from '@element-plus/icons-vue';
// 修复：引入 onMounted
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// 接收父组件传递的 isCollapse 属性
const props = defineProps({
  isCollapse: Boolean
});

// 修复：将 user 定义为响应式的 ref，初始值为 null
const user = ref(null);
const route = useRoute();

// 修复：在 onMounted 生命周期钩子中安全地获取和解析用户信息
onMounted(() => {
  const userJson = sessionStorage.getItem('CurUser');
  if (userJson) {
    try {
      user.value = JSON.parse(userJson);
    } catch (e) {
      console.error("无法解析SessionStorage中的用户信息:", e);
      // 可选：在此处处理错误，例如跳转回登录页
    }
  }
});

// 动态计算当前激活的菜单项
const activeMenu = computed(() => {
  return route.path;
});
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  border-right: none; /* 去除菜单右侧的边框 */
  height: 100vh;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 55px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  white-space: nowrap; /* 防止文字换行 */
  overflow: hidden;
}
.logo-img {
  width: 32px;
  height: 32px;
  margin-right: 10px;
}

/* 当菜单折叠时，隐藏文字并调整logo的边距 */
.el-menu--collapse .logo-container .logo-text {
  display: none;
}
.el-menu--collapse .logo-container .logo-img {
  margin-right: 0;
}

.el-menu-item, .el-sub-menu__title {
  color: #ccc;
}
.el-menu-item:hover, .el-sub-menu__title:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}
</style>