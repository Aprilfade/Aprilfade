<template>
  <div style="display: flex; line-height: 60px; align-items: center;">
    <div>
      <el-icon style="font-size: 24px; cursor: pointer;" @click="collapse">
        <component :is="icon" />
      </el-icon>
    </div>
    <div style="flex: 1; text-align: center; font-size: 20px; font-weight: bold;">
      <span>仓库管理系统</span>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ user.name }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
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
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {ElMessage, ElMessageBox} from 'element-plus';

const router = useRouter();
const user = ref(JSON.parse(sessionStorage.getItem('CurUser')));
const icon = ref('Fold');

// 定义组件可以发出的事件
const emit = defineEmits(['doCollapse']);

const collapse = () => {
  // 发出 doCollapse 事件给父组件
  emit("doCollapse");
  // 切换图标
  icon.value = icon.value === 'Fold' ? 'Expand' : 'Fold';
};

const toUser = () => {
  router.push('/Home');
};

const logout = () => {
  ElMessageBox.confirm('您确定要退出登录吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    ElMessage({
      type: 'success',
      message: '退出登录成功',
    });
    // 清除会话并跳转到登录页
    sessionStorage.clear();
    router.push("/login");
    // 刷新页面以确保路由守卫重新检查状态
    window.location.reload();
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消退出登录',
    });
  });
};
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>