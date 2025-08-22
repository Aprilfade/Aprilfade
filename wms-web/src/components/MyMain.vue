<template>
  <div>
    <h1>欢迎来到主页！</h1>
    <p>当前时间是：{{ currentTime }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { format } from 'date-fns';

const currentTime = ref('');
let timer = null;

const updateTime = () => {
  currentTime.value = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
};

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style scoped>
h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
}
</style>