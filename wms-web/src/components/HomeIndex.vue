<template>
  <div style="padding: 15px;">
    <el-card>
      <h2>欢迎您，{{ user.name }}！</h2>
      <p>今天是 {{ currentDate }}</p>
    </el-card>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="6">
        <el-card class="data-card" shadow="hover">
          <div class="card-content">
            <i class="el-icon-user-solid card-icon" style="background-color: #409EFF;"></i>
            <div class="card-text">
              <p class="card-num">{{ counts.userCount }}</p>
              <p class="card-desc">用户总数</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="data-card" shadow="hover">
          <div class="card-content">
            <i class="el-icon-s-goods card-icon" style="background-color: #67C23A;"></i>
            <div class="card-text">
              <p class="card-num">{{ counts.goodsCount }}</p>
              <p class="card-desc">货品总数</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="data-card" shadow="hover">
          <div class="card-content">
            <i class="el-icon-office-building card-icon" style="background-color: #E6A23C;"></i>
            <div class="card-text">
              <p class="card-num">{{ counts.storageCount }}</p>
              <p class="card-desc">仓库总数</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="data-card" shadow="hover">
          <div class="card-content">
            <i class="el-icon-s-order card-icon" style="background-color: #F56C6C;"></i>
            <div class="card-text">
              <p class="card-num">{{ counts.recordCount }}</p>
              <p class="card-desc">记录总数</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="24">
        <el-card>
          <div ref="echarts" style="height: 400px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 1. 按需引入 ECharts 的核心模块和必要组件
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 2. 注册你需要的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer
]);

export default {
  name: "HomeIndex",
  data() {
    return {
      user: {},
      currentDate: new Date().toLocaleDateString(),
      counts: {
        userCount: 0,
        goodsCount: 0,
        storageCount: 0,
        recordCount: 0
      },
      chartInstance: null
    };
  },
  methods: {
    // 初始化用户信息
    initUser() {
      let userStr = sessionStorage.getItem("user");
      if (userStr) {
        this.user = JSON.parse(userStr);
      }
    },
    // 获取统计数据
    fetchCounts() {
      // 用户总数
      this.$axios.get(this.$httpUrl + '/user/count').then(res => res.data).then(res => {
        if(res.code === 200){
          this.counts.userCount = res.data;
        }
      });
      // 货品总数
      this.$axios.get(this.$httpUrl + '/goods/count').then(res => res.data).then(res => {
        if(res.code === 200){
          this.counts.goodsCount = res.data;
        }
      });
      // 仓库总数
      this.$axios.get(this.$httpUrl + '/storage/count').then(res => res.data).then(res => {
        if(res.code === 200){
          this.counts.storageCount = res.data;
        }
      });
      // 记录总数
      this.$axios.get(this.$httpUrl + '/record/count').then(res => res.data).then(res => {
        if(res.code === 200){
          this.counts.recordCount = res.data;
        }
      });
    },
    // 初始化 Echarts
    initEcharts() {
      // 3. 初始化 Echarts 实例 (这部分代码保持不变)
      this.chartInstance = echarts.init(this.$refs.echarts);
      // 模拟数据，后续可以替换为真实接口数据
      const option = {
        title: {
          text: '近7日出入库统计'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['入库', '出库']
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '入库',
            type: 'bar',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '出库',
            type: 'bar',
            data: [80, 92, 71, 94, 60, 180, 150]
          }
        ]
      };
      this.chartInstance.setOption(option);
    }
  },
  created() {
    this.initUser();
    this.fetchCounts();
  },
  mounted() {
    this.initEcharts();
  }
};
</script>

<style scoped>
.data-card {
  height: 120px;
}
.card-content {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
}
.card-icon {
  font-size: 50px;
  color: white;
  border-radius: 8px;
  padding: 15px;
  width: 80px;
  height: 80px;
  text-align: center;
  line-height: 50px;
}
.card-text {
  text-align: center;
}
.card-num {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}
.card-desc {
  color: #999;
  margin: 0;
}
</style>