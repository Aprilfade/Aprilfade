<template>
  <div>
    <el-icon @click="doCollapse">
      <Fold v-if="!icon" />
      <Expand v-else />
    </el-icon>
    <el-breadcrumb separator="/" class="bread">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, i) in breadList" :key="i">{{
          item
        }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        欢迎您！{{ user.name }}
        <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="toUser">个人中心</el-dropdown-item>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { Fold, Expand, ArrowDown } from '@element-plus/icons-vue';

// --- 状态和变量 ---
const icon = ref(false);
const router = useRouter();

// 从 sessionStorage 中获取用户信息
const user = computed(() => {
  const userStr = sessionStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : {};
});

// 计算面包屑导航列表
const breadList = computed(() => {
  return router.currentRoute.value.meta.bread || [];
});

// 定义组件触发的事件
const emit = defineEmits(['doCollapse']);

// --- 方法 ---
const doCollapse = () => {
  icon.value = !icon.value;
  emit('doCollapse'); // 触发父组件的 doCollapse 事件
};

const toUser = () => {
  router.push('/Home'); // 跳转到个人中心页面
};

const logout = () => {
  sessionStorage.clear();
  router.replace('/'); // 跳转到登录页
};
</script>

<style scoped lang="scss">
.el-icon {
  font-size: 33px;
  cursor: pointer;
}

.bread {
  display: inline-block;
  margin-left: 10px;
  font-size: 20px;
}

.el-dropdown {
  float: right;
  line-height: 60px;
  cursor: pointer;
}
</style>