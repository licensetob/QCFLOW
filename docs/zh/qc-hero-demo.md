---
layout: page
---

<script setup>
import QCHero from '../.vitepress/theme/components/QCHero.vue'
</script>

# QC Hero 组件演示

这是一个独立的 QC Hero 组件，您可以轻松地修改其中的内容。

## 默认配置

<QCHero />

## 自定义配置示例

<QCHero 
  name="自定义标题"
  text="这是自定义的文本内容"
  tagline="这是自定义的副标题"
  :image="{ src: '/qc-logo.png', alt: '自定义Logo' }"
  :actions="[
    { theme: 'brand', text: '开始使用', link: '/zh/guide/getting-started' },
    { theme: 'alt', text: '了解更多', link: '/zh/guide/what-is-vitepress' }
  ]"
/>

## 如何使用

1. **在 Markdown 文件中使用：**
   ```vue
   <script setup>
   import QCHero from '../.vitepress/theme/components/QCHero.vue'
   </script>
   
   <QCHero 
     name="您的标题"
     text="您的文本"
     tagline="您的副标题"
     :image="{ src: '/your-logo.png', alt: 'Your Logo' }"
     :actions="[
       { theme: 'brand', text: '按钮1', link: '/link1' },
       { theme: 'alt', text: '按钮2', link: '/link2' }
     ]"
   />
   ```

2. **在 Vue 组件中使用：**
   ```vue
   <template>
     <QCHero 
       :name="heroData.name"
       :text="heroData.text"
       :tagline="heroData.tagline"
       :image="heroData.image"
       :actions="heroData.actions"
     />
   </template>
   
   <script setup>
   import QCHero from './QCHero.vue'
   
   const heroData = {
     name: 'QC Flutter Flow',
     text: '让Flutter开发变得简单',
     tagline: '只需几分钟，构建精美的Flutter应用',
     image: { src: '/qc-logo.png', alt: 'QC Flutter Flow' },
     actions: [
       { theme: 'brand', text: '什么是 VitePress?', link: '/zh/guide/what-is-vitepress' },
       { theme: 'alt', text: '快速开始', link: '/zh/guide/getting-started' }
     ]
   }
   </script>
   ```

## 组件属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `name` | String | 'QC Flutter Flow' | 主标题 |
| `text` | String | '让Flutter开发变得简单' | 副标题 |
| `tagline` | String | '只需几分钟，构建精美的Flutter应用' | 描述文本 |
| `image` | Object | `{ src: '/qc-logo.png', alt: 'QC Flutter Flow' }` | 图片配置 |
| `actions` | Array | 默认按钮数组 | 操作按钮列表 |

## 样式自定义

组件使用了 VitePress 的 CSS 变量，您可以通过覆盖这些变量来自定义样式：

```css
:root {
  --vp-c-brand-1: #your-brand-color;
  --vp-c-brand-2: #your-brand-hover-color;
  --vp-c-text-1: #your-text-color;
  --vp-c-text-2: #your-secondary-text-color;
}
```