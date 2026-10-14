---
layout: home
---

<script setup>
import QCHero from '../.vitepress/theme/components/QCHero.vue'
</script>

<!-- 使用自定义 QCHero 组件替代默认 hero 配置 -->
<QCHero 
  name="QC Flutter Flow"
  text="Desarrollo Flutter Simplificado"
  tagline="Construye hermosas aplicaciones Flutter en minutos"
  :actions="[
    {
      theme: 'brand',
      text: 'Qué es VitePress?',
      link: '/es/guide/what-is-vitepress'
    },
    {
      theme: 'alt', 
      text: 'Iniciar',
      link: '/es/guide/getting-started'
    }
  ]"
  image="/qc-logo.png"
  alt="QC Flutter Flow"
/>
