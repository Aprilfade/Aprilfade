<template>
  <div style="display: flex; width: 100%; align-items: center;">
    <div style="cursor: pointer;">
      <el-icon :size="20" @click="collapse">
        <component :is="icon" />
      </el-icon>
    </div>
    <div style="flex: 1; text-align: center; font-size: 20px;">
      <span>欢迎来到仓库管理系统</span>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ user?.name || '用户' }}
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
// 2. 引入 defineProps 和 defineEmits 来处理父子通信
import { defineProps, defineEmits } from 'vue';
// 3. 引入 Element Plus 的图标和消息提示
import { ArrowDown } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';

// 4. 定义 props 接收父组件传来的 icon
const props = defineProps({
  icon: Object // 因为图标是组件，所以类型是 Object
});

// 5. 定义 emit，用于向父组件发送事件
const emit = defineEmits(['doCollapse']);

const router = useRouter();
const store = useStore();

const user = ref(JSON.parse(sessionStorage.getItem('CurUser')));

const toUser = () => {
  // 注意：在Vue3中，个人中心等通常是主页的子路由，这里暂时跳转到根
  router.push('/');
};

const logout = () => {
  ElMessageBox.confirm('您确定要退出登录吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    store.commit('setMenu', []); // 清空 Vuex 中的菜单
    sessionStorage.clear();
    router.push('/login');
    ElMessage({
      type: 'success',
      message: '退出登录成功',
    });
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消退出登录',
    });
  });
};

// 6. 调用 emit 发送事件
const collapse = () => {
  emit('doCollapse');
};
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>