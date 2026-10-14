---
layout: home
---

<script setup>
import QCHero from '../.vitepress/theme/components/QCHero.vue'
</script>

<!-- 使用自定义 QCHero 组件替代默认 hero 配置 -->
<QCHero 
  name="QC Flutter Flow"
  text="Упрощенная разработка Flutter"
  tagline="Создавайте красивые приложения Flutter за минуты"
  :actions="[
    {
      theme: 'brand',
      text: 'Что такое VitePress?',
      link: '/ru/guide/what-is-vitepress'
    },
    {
      theme: 'alt', 
      text: 'Первые шаги',
      link: '/ru/guide/getting-started'
    }
  ]"
  image="/qc-logo.png"
  alt="QC Flutter Flow"
/>
