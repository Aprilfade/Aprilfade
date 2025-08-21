<template>
  <div class="loginBody">
    <div class="loginDiv">
      <div class="login-content">
        <h1 class="login-title">用户登录</h1>
        <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
          <el-form-item prop="no">
            <el-input type="text" placeholder="请输入账号" v-model="loginForm.no" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="loginForm.password" show-password autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="confirm" :disabled="confirm_disabled" style="width: 100%;">确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
// 2. 从 vue 和其他库中导入所需的函数
import { ref, reactive, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus'; // 引入Element Plus的消息提示

// 3. 获取当前组件实例、路由和Vuex store
const { proxy } = getCurrentInstance();
const router = useRouter();
const store = useStore();

// 4. 定义响应式状态 (等同于 Vue 2 的 data)
const confirm_disabled = ref(false); // 使用 ref 处理基本类型
const loginForm = reactive({ // 使用 reactive 处理对象
  no: '',
  password: ''
});
const rules = reactive({
  no: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
});

// 5. 创建一个 ref 来关联模板中的 el-form 实例 (等同于 this.$refs.loginForm)
const loginFormRef = ref(null);

// 6. 将 methods 中的方法转换为一个函数
const confirm = async () => {
  if (!loginFormRef.value) return; // 确保表单实例存在

  // 使用 await 让验证逻辑更清晰
  await loginFormRef.value.validate((valid) => {
    if (valid) {
      confirm_disabled.value = true;
      // 7. 使用 proxy 访问全局挂载的属性
      proxy.$axios.post('/api/user/login', loginForm).then(res => {
        if (res.data.code === 200) {
          sessionStorage.setItem("CurUser", JSON.stringify(res.data.data.user));
          store.commit("setMenu", res.data.data.menu); // 使用 store
          router.replace('/'); // 使用 router
        } else {
          confirm_disabled.value = false;
          ElMessage.error('校验失败，用户名或密码错误！'); // 使用 Element Plus 的消息提示
        }
      }).catch(() => {
        confirm_disabled.value = false;
        ElMessage.error('请求失败，请稍后再试');
      });
    } else {
      ElMessage.warning('请输入账号和密码');
      return false;
    }
  });
};
</script>

<style scoped>
.loginBody {
  width: 100%;
  height: 100%;
  background-color: #B3C0D1;
}
.loginDiv {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -250px;
  width: 450px;
  height: 330px;
  background: #fff;
  border-radius: 5%;
}
.login-title {
  margin: 20px 0;
  text-align: center;
}
.login-content {
  width: 400px;
  height: 250px;
  position: absolute;
  top: 25px;
  left: 25px;
}
</style>