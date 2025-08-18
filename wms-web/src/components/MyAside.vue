<template>
  <el-menu
      style="height: 100vh;"
      default-active="/home"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true">

    <el-menu-item index="/home">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>

    <el-menu-item :index="'/home/' + item.menuclick" v-for="item in menu" :key="item.id">
      <i :class="item.menuicon"></i>
      <span slot="title">{{ item.menuname }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "MyAside",
  computed: {
    // **核心修正：直接返回从 store 获取的扁平化菜单列表**
    menu() {
      return this.$store.state.menuList;
    }
  }
};
</script>

<style scoped>
</style>