<template>
  <div class="home-index">
    <el-row :gutter="20" class="data-cards">
      <el-col :span="6">
        <el-card class="card-item" shadow="hover">
          <div class="card-content">
            <div class="card-icon" style="background-color: #409eff;">
              <el-icon><box /></el-icon>
            </div>
            <div class="card-text">
              <div class="card-title">总库存</div>
              <div class="card-value">1,234</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="card-item" shadow="hover">
          <div class="card-content">
            <div class="card-icon" style="background-color: #67c23a;">
              <el-icon><plus /></el-icon>
            </div>
            <div class="card-text">
              <div class="card-title">今日入库</div>
              <div class="card-value">120</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="card-item" shadow="hover">
          <div class="card-content">
            <div class="card-icon" style="background-color: #f56c6c;">
              <el-icon><minus /></el-icon>
            </div>
            <div class="card-text">
              <div class="card-title">今日出库</div>
              <div class="card-value">85</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="card-item" shadow="hover">
          <div class="card-content">
            <div class="card-icon" style="background-color: #e6a23c;">
              <el-icon><tickets /></el-icon>
            </div>
            <div class="card-text">
              <div class="card-title">总分类</div>
              <div class="card-value">12</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="charts">
      <el-col :span="12">
        <el-card shadow="hover">
          <div id="pieChart" style="width: 100%; height: 400px;"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div id="lineChart" style="width: 100%; height: 400px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import { Box, Plus, Minus, Tickets } from '@element-plus/icons-vue';

let pieChart = null;
let lineChart = null;

const resizeCharts = () => {
  if (pieChart) {
    pieChart.resize();
  }
  if (lineChart) {
    lineChart.resize();
  }
};

onMounted(() => {
  // 初始化饼状图
  const pieChartDom = document.getElementById('pieChart');
  pieChart = echarts.init(pieChartDom);
  const pieOption = {
    title: {
      text: '分类库存占比',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '库存占比',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '电子产品' },
          { value: 735, name: '服装' },
          { value: 580, name: '食品' },
          { value: 484, name: '日用品' },
          { value: 300, name: '其他' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  pieChart.setOption(pieOption);

  // 初始化折线图
  const lineChartDom = document.getElementById('lineChart');
  lineChart = echarts.init(lineChartDom);
  const lineOption = {
    title: {
      text: '近七日出入库趋势'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['入库', '出库']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '入库',
        type: 'line',
        stack: '总量',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '出库',
        type: 'line',
        stack: '总量',
        data: [80, 92, 71, 94, 60, 180, 150]
      }
    ]
  };
  lineChart.setOption(lineOption);

  window.addEventListener('resize', resizeCharts);
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeCharts);
});

</script>

<style scoped>
.home-index {
  padding: 20px;
  background-color: #f0f2f5;
}

.data-cards {
  margin-bottom: 20px;
}

.card-item .el-card__body {
  padding: 0;
}

.card-content {
  display: flex;
  align-items: center;
  padding: 20px;
}

.card-icon {
  font-size: 40px;
  color: white;
  border-radius: 6px;
  padding: 15px;
  margin-right: 20px;
}

.card-text {
  font-size: 16px;
  color: #909399;
}

.card-title {
  margin-bottom: 10px;
}

.card-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}
</style>