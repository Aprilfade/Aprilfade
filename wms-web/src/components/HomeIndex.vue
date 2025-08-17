


<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside :width="aside_width" style="background-color: rgb(238, 241, 246);height:100vh;margin-left: -1px; ">
    <MyAside :isCollapse="isCollapse"> </MyAside>
    </el-aside>

    <el-container style="height: 100%; padding: 20px">
      <el-header style="height:100%;text-align: right; font-size: 12px">
        <MyHeader @doCollapse="doCollapse" :icon="icon">  </MyHeader>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>




import MyHeader from "@/components/MyHeader.vue";
import MyAside from "@/components/MyAside.vue";

export default {
  name: 'HomeIndex',
  components: {MyAside,MyHeader},
  data(){
    return {
      isCollapse:false,
      aside_width: '200px',
      icon:'el-icon-s-fold'
    }
  },
  methods:{
    doCollapse(){
       console.log(1111)
      this.isCollapse = !this.isCollapse
      if(this.isCollapse){
        this.aside_width = '60px'
        this.icon = 'el-icon-s-unfold'
      }else{
        this.aside_width = '200px'
        this.icon = 'el-icon-s-fold'
      }
    }
  }
}

</script>
<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}
.el-main{
  padding: 5px;
}
.el-aside {
  color: #333;
}
</style>