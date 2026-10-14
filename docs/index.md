---
layout: home
---

<script setup>
import QCHero from './.vitepress/theme/components/QCHero.vue'
</script>

<QCHero 
  name="QC Flutter Flow"
  text="让多端应用开发变得简单"
  tagline="可视化拖拽画布 · 142 个中文函数逻辑编排 · AI 对话一键生成全栈应用"
  :actions="[
    {
      theme: 'brand',
      text: '10 分钟快速上手',
      link: '/guide/getting-started'
    },
    {
      theme: 'alt', 
      text: '浏览 90+ 内置组件',
      link: '/reference/components'
    },
    {
      theme: 'alt', 
      text: '查询 142 个中文函数',
      link: '/reference/dsl-functions'
    }
  ]"
  image="/qc-logo.png"
  alt="QC Flutter Flow"
/>
