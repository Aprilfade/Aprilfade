<template>
  <div>
    <p>当前时间：{{ currentTime }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const currentTime = ref('');
let timer = null;

const updateTime = () => {
  const now = new Date();
  // 使用 toLocaleString() 来格式化日期和时间
  currentTime.value = now.toLocaleString();
};

// onMounted 会在组件加载完成后执行
onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

// onBeforeUnmount 会在组件销毁前执行，用于清理定时器
onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>