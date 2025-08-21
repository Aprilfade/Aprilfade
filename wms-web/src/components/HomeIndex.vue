<template>
  <div style="text-align: center; background-color: #f1f1f3; height: 100%; padding: 0; margin: 0;">
    <h1 v-if="user" style="font-size: 50px;">{{ '欢迎你！' + user.name }}</h1>

    <el-descriptions v-if="user" title="个人中心" :column="2" border style="width: 90%; margin: 20px auto; text-align: center;">
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon><avatar /></el-icon>
            <span>账号</span>
          </div>
        </template>
        {{ user.no }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon><iphone /></el-icon>
            <span>电话</span>
          </div>
        </template>
        {{ user.phone }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon><male /></el-icon>
            <span>性别</span>
          </div>
        </template>
        <el-tag :type="user.sex === 1 ? 'primary' : 'danger'" disable-transitions>
          {{ user.sex === 1 ? "男" : "女" }}
        </el-tag>
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon><tickets /></el-icon>
            <span>角色</span>
          </div>
        </template>
        <el-tag type="success" disable-transitions>
          {{ user.roleId === 0 ? "超级管理员" : (user.roleId === 1 ? "管理员" : "用户") }}
        </el-tag>
      </el-descriptions-item>
    </el-descriptions>

    <DateUtils />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DateUtils from "@/components/DateUtils.vue";

// 从 sessionStorage 中获取用户信息并设置为响应式数据
const user = ref(JSON.parse(sessionStorage.getItem('CurUser')));
</script>

<style scoped>
.cell-item {
  display: flex;
  align-items: center;
}
.cell-item span {
  margin-left: 8px;
}
</style>