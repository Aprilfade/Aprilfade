<template>
  <div class="home-container" ref="homeContainerRef">
    <canvas id="particle-canvas" class="particle-canvas"></canvas>

    <el-container class="main-layout-container">
      <el-aside :width="asideW + 'px'" class="aside-container">
        <MyAside :isCollapse="isCollapse"></MyAside>
      </el-aside>

      <el-container class="content-container">
        <el-header style="height: 55px;">
          <MyHeader @doCollapse="doCollapse" :isCollapse="isCollapse"></MyHeader>
        </el-header>

        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import MyHeader from "@/components/MyHeader.vue";
import MyAside from "@/components/MyAside.vue";
// 修复：从 vue 中引入 nextTick
import { onMounted, onUnmounted, ref, nextTick } from "vue";

// --- 布局控制 ---
const isCollapse = ref(false);
const asideW = ref(200);
// 修复：为根元素创建一个 ref
const homeContainerRef = ref(null);

const doCollapse = () => {
  isCollapse.value = !isCollapse.value;
  asideW.value = isCollapse.value ? 64 : 200;
};

// --- 粒子背景动画 ---
let animationFrameId;

const initParticleCanvas = () => {
  const canvas = document.getElementById('particle-canvas');
  const container = homeContainerRef.value;

  // 修复：增加一个健壮性检查，确保 canvas 和 container 都存在
  if (!canvas || !container) {
    console.error('Canvas or container not found for particle animation.');
    return;
  }

  const ctx = canvas.getContext('2d');
  let particles = [];
  const particleCount = 100;

  const resizeCanvas = () => {
    // 确保 container 存在
    if (container) {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      createParticles();
    }
  };

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = Math.random() * 0.8 - 0.4;
      this.vy = Math.random() * 0.8 - 0.4;
      this.radius = Math.random() * 1.5 + 1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fill();
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
      if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
    }
  }

  const createParticles = () => {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  };

  const connectParticles = () => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 - distance / 120})`;
          ctx.lineWidth = 0.3;
          ctx.stroke();
        }
      }
    }
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    connectParticles();
    animationFrameId = requestAnimationFrame(animate);
  };

  resizeCanvas();
  animate();

  window.addEventListener('resize', resizeCanvas);
};

const cancelParticleAnimation = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
};


onMounted(() => {
  // 修复：使用 nextTick 确保在DOM完全渲染后才初始化粒子动画
  nextTick(() => {
    initParticleCanvas();
  });
});

onUnmounted(() => {
  cancelParticleAnimation();
  // 注意：此处不移除 resize 监听器，因为 MyHome 一般不卸载。
  // 如果需要，可以像这样添加：window.removeEventListener('resize', resizeCanvas);
  // 但 resizeCanvas 需要在 onUnmounted 的作用域中可访问。
});

</script>

<style scoped>
.home-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #2c3e50, #34495e);
  overflow: hidden;
}

.particle-canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
}

.main-layout-container {
  height: 100%;
  position: relative;
  z-index: 2;
  background-color: transparent !important;
}

.aside-container {
  transition: width 0.3s ease;
  background-color: transparent !important;
  overflow-x: hidden;
}

.content-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.el-header, .el-main {
  background-color: transparent !important;
}

.el-main {
  padding: 0;
  flex-grow: 1;
  overflow-y: auto;
}
</style>