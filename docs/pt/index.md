---
layout: home
---

<script setup>
import QCHero from '../.vitepress/theme/components/QCHero.vue'
</script>

<!-- 使用自定义 QCHero 组件替代默认 hero 配置 -->
<QCHero 
  name="QC Flutter Flow"
  text="Desenvolvimento Flutter Simplificado"
  tagline="Crie Belos Aplicativos Flutter em Minutos"
  :actions="[
    {
      theme: 'brand',
      text: 'O que é VitePress?',
      link: '/pt/guide/what-is-vitepress'
    },
    {
      theme: 'alt', 
      text: 'Iniciar',
      link: '/pt/guide/getting-started'
    }
  ]"
  image="/qc-logo.png"
  alt="QC Flutter Flow"
/>
