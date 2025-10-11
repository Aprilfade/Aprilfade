<template>
  <div class="home-index-content">
    <el-row :gutter="20" class="data-cards">
      <el-col :span="6" v-for="(card, index) in cards" :key="card.title">
        <el-card
            class="card-item"
            shadow="hover"
            :ref="el => cardRefs[index] = el"
        >
          <div class="card-content">
            <div class="card-icon" :style="{ backgroundColor: card.color }">
              <el-icon><component :is="card.icon" /></el-icon>
            </div>
            <div class="card-text">
              <div class="card-title">{{ card.title }}</div>
              <div class="card-value">{{ card.animatedValue.value }}</div>
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
import { onMounted, onUnmounted, ref, shallowRef } from 'vue';
import * as echarts from 'echarts';
import VanillaTilt from 'vanilla-tilt';
import { Box, Plus, Minus, Tickets } from '@element-plus/icons-vue';

// --- 响应式数据定义 ---
const cardRefs = ref([]);
const cards = ref([
  { title: '总库存', value: 1234, animatedValue: ref(0), icon: Box, color: '#409eff' },
  { title: '今日入库', value: 120, animatedValue: ref(0), icon: Plus, color: '#67c23a' },
  { title: '今日出库', value: 85, animatedValue: ref(0), icon: Minus, color: '#f56c6c' },
  { title: '总分类', value: 12, animatedValue: ref(0), icon: Tickets, color: '#e6a23c' }
]);

// --- ECharts 实例 ---
const pieChartInstance = shallowRef(null);
const lineChartInstance = shallowRef(null);

// --- 动画与特效函数 ---

// 数字滚动动画
const animateValue = (targetRef, endValue, duration) => {
  let startValue = 0;
  let startTime = null;
  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    targetRef.value = Math.floor(progress * (endValue - startValue) + startValue);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

// 初始化图
const initCharts = () => {
  // 销毁旧实例，防止重复渲染
  if (pieChartInstance.value) {
    pieChartInstance.value.dispose();
  }
  if (lineChartInstance.value) {
    lineChartInstance.value.dispose();
  }

  // 饼状图
  const pieChartDom = document.getElementById('pieChart');
  if (pieChartDom) {
    pieChartInstance.value = echarts.init(pieChartDom);
    const pieOption = {
      title: { text: '分类库存占比', left: 'center', textStyle: { color: '#333', fontWeight: 'bold' } },
      tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c} ({d}%)' },
      legend: { orient: 'vertical', left: 'left', top: '10%', icon: 'circle' },
      series: [{ name: '库存占比', type: 'pie', radius: [20, 110], center: ['50%', '60%'], roseType: 'area', itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 2 }, data: [ { value: 1048, name: '电子产品' }, { value: 735, name: '服装' }, { value: 580, name: '食品' }, { value: 484, name: '日用品' }, { value: 300, name: '其他' } ], emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } } }]
    };
    pieChartInstance.value.setOption(pieOption);
  }

  // 折线图
  const lineChartDom = document.getElementById('lineChart');
  if (lineChartDom) {
    lineChartInstance.value = echarts.init(lineChartDom);
    const lineOption = {
      title: { text: '近七日出入库趋势' },
      tooltip: { trigger: 'axis' },
      legend: { data: ['入库', '出库'] },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: { type: 'category', boundaryGap: false, data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
      yAxis: { type: 'value' },
      series: [{ name: '入库', type: 'line', smooth: true, areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(80,141,255,0.3)' }, { offset: 1, color: 'rgba(80,141,255,0)' }]) }, data: [120, 132, 101, 134, 90, 230, 210], markPoint: { data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }] }, markLine: { data: [{ type: 'average', name: '平均值' }] } }, { name: '出库', type: 'line', smooth: true, areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(255,100,100,0.3)' }, { offset: 1, color: 'rgba(255,100,100,0)' }]) }, data: [80, 92, 71, 94, 60, 180, 150] }]
    };
    lineChartInstance.value.setOption(lineOption);
  }
};

// --- 生命周期钩子 ---
onMounted(() => {
  // 为数据卡片启动数字动画
  cards.value.forEach(card => {
    animateValue(card.animatedValue, card.value, 1500);
  });

  // 初始化 3D 倾斜效果
  VanillaTilt.init(cardRefs.value.map(el => el.$el), {
    max: 15,
    speed: 400,
    glare: true,
    'max-glare': 0.5,
  });

  // 直接初始化图表
  initCharts();

  // 监听窗口大小变化以重绘图表
  const resizeCharts = () => {
    if (pieChartInstance.value) pieChartInstance.value.resize();
    if (lineChartInstance.value) lineChartInstance.value.resize();
  };
  window.addEventListener('resize', resizeCharts);

  // 在组件卸载时清理
  onUnmounted(() => {
    window.removeEventListener('resize', resizeCharts);
    if (pieChartInstance.value) pieChartInstance.value.dispose();
    if (lineChartInstance.value) lineChartInstance.value.dispose();
  });
});
</script>

<style scoped>
.home-index-content {
  padding: 20px;
}

.data-cards {
  margin-bottom: 20px;
}

.card-item {
  transition: all 0.3s ease-in-out;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  color: white;
  transform-style: preserve-3d;
}

.card-item:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.card-content {
  display: flex;
  align-items: center;
  padding: 20px;
}

.card-icon {
  font-size: 40px;
  color: white;
  border-radius: 50%;
  padding: 15px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
}

.card-item:hover .card-icon {
  transform: rotateY(180deg);
}

.card-text {
  font-size: 16px;
}

.card-title {
  color: #bdc3c7;
  margin-bottom: 10px;
}

.card-value {
  font-size: 28px;
  font-weight: bold;
  color: #ecf0f1;
}

/* 图表卡片样式 */
.charts .el-card {
  border-radius: 12px;
  border: none;
  background-color: rgba(255, 255, 255, 0.95);
}
</style>