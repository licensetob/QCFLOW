---
layout: home
---

<script setup>
import QCHero from '../.vitepress/theme/components/QCHero.vue'
</script>

<!-- 使用自定义 QCHero 组件替代默认 hero 配置 -->
<QCHero 
  name="QC Flutter Flow"
  text="Flutter Development Made Easy"
  tagline="Build Beautiful Flutter Apps in Minutes"
  :actions="[
    {
      theme: 'brand',
      text: 'What is VitePress?',
      link: '/guide/what-is-vitepress'
    },
    {
      theme: 'alt', 
      text: 'Quickstart',
      link: '/guide/getting-started'
    }
  ]"
  image="/qc-logo.png"
  alt="QC Flutter Flow"
/>
