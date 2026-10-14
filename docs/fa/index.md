---
layout: home
---

<script setup>
import QCHero from '../.vitepress/theme/components/QCHero.vue'
</script>

<!-- 使用自定义 QCHero 组件替代默认 hero 配置 -->
<QCHero 
  name="QC Flutter Flow"
  text="توسعه Flutter آسان شد"
  tagline="ساخت برنامه‌های زیبای Flutter در چند دقیقه"
  :actions="[
    {
      theme: 'brand',
      text: 'ویت‌پرس چیست؟',
      link: '/fa/guide/what-is-vitepress'
    },
    {
      theme: 'alt', 
      text: 'شروع سریع',
      link: '/fa/guide/getting-started'
    }
  ]"
  image="/qc-logo.png"
  alt="QC Flutter Flow"
/>
