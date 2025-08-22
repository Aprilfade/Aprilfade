// wms-web/src/components/MyHeader.vue

<template>
  <div style="display: flex; line-height: 60px;">
    <div>
      <i :class="icon" style="font-size: 20px;cursor: pointer;" @click="collapse"></i>
    </div>
    <div style="flex: 1;text-align: center;font-size: 30px;">
      <span>欢迎来到仓库管理系统</span>
    </div>
    <el-dropdown>
      <span v-if="user">{{ user.name }}</span>
      <i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="toUser">个人中心</el-dropdown-item>
        <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </div>
</template>

<script>
export default {
  name: "MyHeader",
  data(){
    return {
      // 修改1：初始化 user 为一个空对象，而不是尝试解析可能不存在的 sessionStorage
      user: {}
    }
  },
  props:{
    icon:String
  },
  methods:{
    toUser(){
      console.log('to_user')
      this.$router.push("/Home")
    },
    logout(){
      console.log('logout')
      this.$router.push("/")
      sessionStorage.clear()
    },
    collapse(){
      this.$emit('doCollapse')
    }
  },
  // 修改2：在 created 钩子中安全地获取用户信息
  created(){
    const userStr = sessionStorage.getItem("CurUser");
    if (userStr) {
      this.user = JSON.parse(userStr);
    }
  }
}
</script>

<style scoped>

</style>