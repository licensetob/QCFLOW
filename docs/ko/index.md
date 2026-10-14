---
layout: home
---

<script setup>
import QCHero from '../.vitepress/theme/components/QCHero.vue'
</script>

<!-- 使用自定义 QCHero 组件替代默认 hero 配置 -->
<QCHero 
  name="QC Flutter Flow"
  text="Flutter 개발을 쉽게"
  tagline="몇 분 안에 아름다운 Flutter 앱 구축"
  :actions="[
    {
      theme: 'brand',
      text: 'VitePress란 무엇인가?',
      link: '/ko/guide/what-is-vitepress'
    },
    {
      theme: 'alt', 
      text: '빠른 시작',
      link: '/ko/guide/getting-started'
    }
  ]"
  image="/qc-logo.png"
  alt="QC Flutter Flow"
/>
