<template>
  <div class="login-container">
    <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
    >
      <div class="title-container">
        <h3 class="title">试题管理系统</h3>
      </div>

      <el-form-item prop="no">
        <el-input
            v-model="loginForm.no"
            placeholder="请输入账号"
            :prefix-icon="User"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
            :prefix-icon="Lock"
            @keyup.enter="handleLogin"
        />
      </el-form-item>

      <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click.prevent="handleLogin"
      >
        登 录
      </el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';
import axios from 'axios'; // 在 Vue 3 中，我们通常在组件内直接导入 axios

// --- 响应式数据 ---
const router = useRouter();
const store = useStore();
const loginFormRef = ref(null); // 用于引用表单
const loading = ref(false);

const loginForm = reactive({
  no: '',
  password: '',
});

const loginRules = reactive({
  no: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

// --- 方法 ---
const handleLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true;
      // 注意：这里的 httpUrl 需要根据你的项目配置进行调整
      const httpUrl = 'http://localhost:8090'; // 假设的后端地址
      axios
          .post(httpUrl + "/user/login", loginForm)
          .then((res) => {
            if (res.data.code === 200) {
              // 登录成功
              // --- 这里是修改的部分 ---
              store.commit("setMenu", res.data.data.menu);
              store.commit("SET_TOKEN", res.data.data.token); // 修改为大写
              store.commit("SET_USER", res.data.data.user);   // 修改为大写
              // --- 修改结束 ---

              router.replace("/Home");
              ElMessage.success("登录成功！");
            } else {
              ElMessage.error(res.data.msg);
            }
          })
          .catch((err) => {
            console.error(err);
            ElMessage.error('登录失败，请检查网络或联系管理员');
          })
          .finally(() => {
            loading.value = false;
          });
    } else {
      console.log('表单验证失败');
      return false;
    }
  });
};
</script>
<style lang="scss" scoped>
.login-container {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-image: url('../assets/back.jpg');
  background-size: cover;
}

.login-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 160px 35px 0;
  margin: 0 auto;
  overflow: hidden;
}

.title-container {
  position: relative;
  .title {
    font-size: 26px;
    color: #eee;
    margin: 0 auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}

// 使用 :deep() 来穿透修改 Element Plus 组件内部样式
:deep(.el-input) {
  height: 47px;
  width: 100%;

  .el-input__wrapper {
    background: rgba(0, 0, 0, 0.1);
    box-shadow: none;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
  }

  .el-input__inner {
    background: transparent;
    border: 0;
    -webkit-appearance: none;
    border-radius: 0;
    padding: 12px 5px 12px 15px;
    color: #eee;
    height: 47px;
    caret-color: #fff;

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.1) inset !important;
      -webkit-text-fill-color: #fff !important;
    }
  }
}
</style>