<template>
  <div class="login-container">
    <!-- 品牌标识 -->
    <div class="logo-wrapper">
      <img src="@/assets/logo.png" alt="仓储管理系统 Logo" class="login-logo" />
    </div>

    <!-- 登录表单 -->
    <div class="login-form">
      <h1>用户登录</h1>
      <el-form :model="loginForm" label-width="80px" :rules="rules" ref="loginForm">
        <el-form-item label="账号" prop="no">
          <el-input v-model="loginForm.no" placeholder="请输入账号" size="small"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirm" :loading="loading">确 定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyLogin",
  data(){
    return{
      confirm_disabled:false,
      loginForm:{
        no:'',
        password:''
      },

      // 输入信息长度验证
      rules: {
        no: [  // 修改为 no
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输密码', trigger: 'blur' }
        ],
      }

    }
  },
  methods:{
    // 登录后跳转到主页
    confirm(){
      this.confirm_disabled=true;
      this.$refs.loginForm.validate((valid) => {
        if (valid) { //valid成功为true，失败为false
          //去后台验证用户名密码，并返回token
          this.$axios.post(this.$httpUrl+'/user/login',this.loginForm).then(res=>{
            console.log('后端返回:',res.data);
            if(res.data.code==200){
              //存储
              sessionStorage.setItem("CurUser",JSON.stringify(res.data.data.user))

              console.log(res.data.data.menu)
              this.$store.commit("setMenu",res.data.data.menu)
              //跳转到主页
              this.$router.replace('/HomeIndex');
            }else{
              this.confirm_disabled=false;
              alert('用户名或密码错误！');
              return false;
            }
          });
        } else {
          this.confirm_disabled=false;
          console.log('校验失败');
          return false;
        }
      });
    }
  }
}
</script>
<style  >
.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中 */
  align-items: center;      /* 水平居中 */
  background: linear-gradient(to right, #088ada, #0cecec); /* 背景色渐变 */
}


.login-form {
  width: 400px;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.login-form:hover {
  transform: scale(1.02);
}

.login-form h1 {
  margin-bottom: 20px;
  text-align: center;
}

.el-input__inner:focus {
  border-color: #7f00ff !important; /* 聚焦时边框颜色 */
}

.el-button--primary {
  width: 100%;
}

.logo-wrapper {
  margin-bottom: 10px; /* 与登录框之间留出间距 */
}

.login-logo {
  width: 90px; /* 设置合适的宽度 */
  height: auto; /* 保持图片比例 */
}
</style>