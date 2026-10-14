---
layout: home
---

<script setup>
import QCHero from '../.vitepress/theme/components/QCHero.vue'
</script>

<!-- 使用自定义 QCHero 组件替代默认 hero 配置 -->
<QCHero 
  name="QC Flutter Flow"
  text="让Flutter开发变得简单"
  tagline="只需几分钟，构建精美的Flutter应用"
  :actions="[
    {
      theme: 'brand',
      text: '什么是 VitePress?',
      link: '/zh/guide/what-is-vitepress'
    },
    {
      theme: 'alt', 
      text: '快速开始',
      link: '/zh/guide/getting-started'
    }
  ]"
  image="/qc-logo.png"
  alt="QC Flutter Flow"
/>
