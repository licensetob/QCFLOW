<template>
  <div 
    class="mist-effect" 
    :data-animated="animated !== false ? 'true' : 'false'"
    :data-blur-intensity="blurIntensity ? 'true' : 'false'"
    :data-background-image="backgroundImage ? 'true' : 'false'"
    :data-custom-size="size ? 'true' : 'false'"
    :style="{
      '--custom-blur-intensity': blurIntensity,
      '--custom-background-image': backgroundImage,
      '--custom-width': size?.width,
      '--custom-height': size?.height
    }"
  >
    <div class="mist-container">
      <div class="mist-bg" />
      <div class="mist-content">
        <slot>
          <!-- 这里可以放置任何需要迷雾效果背景的内容 -->
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 定义组件的 props
defineProps<{
  // 迷雾效果的模糊程度，默认使用 CSS 变量
  blurIntensity?: string
  // 背景渐变颜色
  backgroundImage?: string
  // 容器尺寸
  size?: {
    width: string
    height: string
  }
  // 是否启用动画效果
  animated?: boolean
}>()
</script>

<style scoped>
.mist-effect {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mist-container {
  position: relative;
  width: 400px;
  height: 400px;
}

.mist-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle at center, 
    rgba(46, 223, 4, 1.0) 0%,
    rgba(46, 223, 4, 0.95) 5%,
    rgba(46, 223, 4, 0.9) 10%,
    rgba(46, 223, 4, 0.85) 15%,
    rgba(46, 223, 4, 0.8) 20%,
    rgba(46, 223, 4, 0.75) 25%,
    rgba(46, 223, 4, 0.7) 30%,
    rgba(46, 223, 4, 0.65) 35%,
    rgba(46, 223, 4, 0.6) 40%,
    rgba(46, 223, 4, 0.55) 45%,
    rgba(46, 223, 4, 0.5) 50%,
    rgba(46, 223, 4, 0.45) 55%,
    rgba(46, 223, 4, 0.4) 60%,
    rgba(46, 223, 4, 0.35) 65%,
    rgba(46, 223, 4, 0.3) 70%,
    rgba(46, 223, 4, 0.25) 75%,
    rgba(46, 223, 4, 0.2) 80%,
    rgba(46, 223, 4, 0.15) 85%,
    rgba(46, 223, 4, 0.1) 90%,
    rgba(46, 223, 4, 0.05) 95%,
    transparent 100%
  );
  filter: var(--vp-home-hero-image-filter, blur(80px));
  transform: translate(-50%, -50%);
  z-index: 1;
  animation: mistFloat 10s ease-in-out infinite;
}

/* 迷雾浮动动画 */
@keyframes mistFloat {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
  }
  25% {
    transform: translate(-48%, -52%) scale(1.05);
    opacity: 0.6;
  }
  50% {
    transform: translate(-52%, -48%) scale(1.1);
    opacity: 0.7;
  }
  75% {
    transform: translate(-50%, -54%) scale(1.05);
    opacity: 0.6;
  }
}

/* 添加第二层迷雾效果 */
.mist-bg::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120%;
  height: 120%;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 60%,
    rgba(46, 223, 4, 0.5) 0%,
    rgba(46, 223, 4, 0.4) 30%,
    rgba(46, 223, 4, 0.3) 60%,
    transparent 100%
  );
  transform: translate(-50%, -50%);
  animation: mistFloat 14s ease-in-out infinite reverse;
  z-index: -1;
  filter: blur(60px);
}

/* 响应式设计 */
@media (min-width: 640px) {
  .mist-container {
    width: 300px;
    height: 300px;
  }
  
  .mist-bg {
    width: 350px;
    height: 350px;
    filter: var(--vp-home-hero-image-filter, blur(100px));
  }
}

@media (min-width: 960px) {
  .mist-container {
    width: 100%;
    height: 100%;
    min-width: 320px;
    min-height: 320px;
  }
  
  .mist-bg {
    width: 380px;
    height: 380px;
    filter: var(--vp-home-hero-image-filter, blur(120px));
  }
}

/* 动画控制 */
.mist-effect[data-animated="false"] .mist-bg,
.mist-effect[data-animated="false"] .mist-bg::before {
  animation: none;
}

/* 悬停效果 */
.mist-effect:hover .mist-bg {
  animation-duration: 3s;
  transform: translate(-50%, -50%) scale(1.1);
}

.mist-effect:hover .mist-bg::before {
  animation-duration: 4s;
}

/* 插槽内容样式 */
.mist-content {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  /* 插槽内容容器样式 */
}

/* 自定义 CSS 变量支持 */
.mist-effect[data-blur-intensity] .mist-bg {
  filter: blur(var(--custom-blur-intensity));
}

.mist-effect[data-background-image] .mist-bg {
  background-image: var(--custom-background-image);
}

.mist-effect[data-custom-size] .mist-container {
  width: var(--custom-width);
  height: var(--custom-height);
}
</style>