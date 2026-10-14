<template>
    <!-- 主容器：整个Hero区域的最外层容器，设置全屏高度和居中布局 -->
    <div class="qc-hero">
        <!-- 内容容器：限制最大宽度，控制内容的整体布局 -->
        <div class="container">
            <!-- 文本内容区域：包含标题、副标题、描述和按钮 -->
            <div class="main">
                <!-- 主标题区域 -->
                <h1 class="heading">
                    <!-- 品牌名称：带有品牌色的主要标题 -->
                    <span class="name clip">{{ name }}</span>
                    <!-- 副标题文本：主要描述文字 -->
                    <span class="text">{{ text }}</span>
                </h1>
                <!-- 标语：描述性文本，位于标题下方 -->
                <p class="tagline">{{ tagline }}</p>

                <!-- 操作按钮区域：包含所有的行动按钮 -->
                <div class="actions">
                    <!-- 单个按钮容器 -->
                    <div v-for="action in actions" :key="action.link" class="action">
                        <!-- 按钮链接：根据主题应用不同样式 -->
                        <a :href="withBase(action.link)" :class="['btn', `btn-${action.theme}`]" :target="action.target"
                            :rel="action.rel">
                            {{ action.text }}
                        </a>
                    </div>
                </div>
            </div>
            <!-- 图片区域：包含logo和背景效果 -->
            <div class="image">
                <!-- 圆形迷雾动画组件 -->
                <CircleFogAnimation :animated="true">
                    <div class="logo" :style="{ backgroundImage: `url(${withBase('/qc-logo.png')})` }"></div>
                </CircleFogAnimation>
                
                <!-- <img :src="image.src" :alt="image.alt" class="image-src" /> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { withBase } from 'vitepress'
import CircleFogAnimation from './CircleFogAnimation.vue'

defineProps({
    name: {
        type: String,
        default: 'QC Flutter Flow'
    },
    text: {
        type: String,
        default: '让Flutter开发变得简单'
    },
    tagline: {
        type: String,
        default: '只需几分钟，构建精美的Flutter应用'
    },
    image: {
        type: Object,
        default: () => ({
            src: '/qc-logo.png',
            alt: 'QC Flutter Flow'
        })
    },
    actions: {
        type: Array,
        default: () => [
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
        ]
    }
})
</script>

<style scoped>
/* =========================== 主容器样式 =========================== */
/* qc-hero: Hero区域的最外层容器，设置全屏高度和完全居中布局 */
.logo {
    width: 300px;
    height: 300px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
}
.qc-hero {
    padding: 0;
    /* 移除左右内边距，让内容可以紧贴边缘 */
    text-align: center;
    /* 文本居中对齐 */
    height: 100vh;
    /* 设置为视窗全高 */
    display: flex;
    /* 使用弹性布局 */
    align-items: center;
    /* 垂直居中 */
    justify-content: center;
    /* 水平居中 */
    position: relative;
    /* 相对定位，为子元素提供定位参考 */
}

/* container: 内容容器，限制最大宽度并控制整体布局 */
.container {
    width: 100%;
    max-width: 1200px;
    /* 最大宽度限制 */
    margin: 0 auto;
    /* 水平居中 */
    padding: 0;
    /* 左右内边距 */
    display: flex;
    /* 弹性布局 */
    flex-direction: column;
    /* 垂直排列（移动端） */
    align-items: center;
    justify-content: space-between;
    gap: 48px;
    /* 子元素间距 */
}

/* =========================== 内容区域样式 =========================== */
/* main: 文本内容区域，包含标题、描述和按钮 */
.main {
    display: block;
    /* 块级显示 */
    text-align: left;
    /* 文本居中 */
    order: 1;
    /* 排序：在移动端显示在第一位 */
}

/* image: 图片区域容器 */
.image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 400px;
    order: 2;
    /* 排序：在移动端显示在第二位 */
}

/* =========================== 文本样式 =========================== */
/* heading: 主标题容器 */
.heading {
    margin: 0;
    /* 移除默认边距 */
    line-height: 1.2;
    /* 行高设置 */
    font-size: 3.5rem;
    /* 字体大小 */
    font-weight: 700;
    /* 字体粗细 */
}

/* name: 品牌名称，使用品牌色显示 */
.name {
    color: var(--vp-c-brand-1);
    /* 品牌主色 */
    display: block;
    /* 块级显示，独占一行 */
    margin-bottom: 16px;
    /* 下边距 */
}

/* text: 副标题文本 */
.text {
    display: block;
    /* 块级显示 */
    margin-bottom: 24px;
    /* 下边距 */
    color: var(--vp-c-text-1);
    /* 主要文本色 */
}

/* tagline: 标语文本，描述性内容 */
.tagline {
    margin: 0 auto 32px;
    /* 上下边距，水平居中 */
    font-size: 1.25rem;
    /* 字体大小 */
    color: var(--vp-c-text-2);
    /* 次要文本色 */
    max-width: 600px;
    /* 最大宽度限制 */
}

/* =========================== 按钮样式 =========================== */
/* actions: 按钮容器，使用弹性布局 */
.actions {
    display: flex;
    /* 弹性布局 */
    gap: 16px;
    /* 按钮间距 */
    justify-content: flex-start;
    /* 按钮左对齐 */
    flex-wrap: wrap;
    /* 允许换行 */
}

/* btn: 按钮基础样式 */
.btn {
    display: inline-block;
    /* 行内块显示 */
    padding: 12px 24px;
    /* 内边距 */
    border-radius: 8px;
    /* 圆角 */
    text-decoration: none;
    /* 移除下划线 */
    font-weight: 600;
    /* 字体粗细 */
    transition: all 0.3s ease;
    /* 过渡动画 */
}

/* btn-brand: 品牌主题按钮（主要按钮） */
.btn-brand {
    background-color: var(--vp-c-brand-1);
    /* 品牌色背景 */
    color: var(--vp-c-white);
    /* 白色文字 */
}

/* btn-brand:hover: 品牌按钮悬停效果 */
.btn-brand:hover {
    background-color: var(--vp-c-brand-2);
    /* 悬停时的品牌色 */
}

/* btn-alt: 次要主题按钮（辅助按钮） */
.btn-alt {
    background-color: var(--vp-c-bg-alt);
    /* 次要背景色 */
    color: var(--vp-c-text-1);
    /* 主要文本色 */
    border: 1px solid var(--vp-c-divider);
    /* 边框 */
}

/* btn-alt:hover: 次要按钮悬停效果 */
.btn-alt:hover {
    background-color: var(--vp-c-gray-light-4);
    /* 悬停背景色 */
}

/* =========================== 图片样式 =========================== */
/* image-container: 图片容器，控制图片区域的尺寸 */


/* image-bg: 背景光晕效果，创建品牌色的圆形渐变 */
.image-bg {
    position: absolute;
    /* 绝对定位 */
    top: 0;
    /* 顶部对齐 */
    left: 0;
    /* 左侧对齐 */
    width: 100%;
    /* 全宽 */
    height: 100%;
    /* 全高 */
    background: radial-gradient(50% 50% at 50% 50%, var(--vp-c-brand-1) 0%, transparent 100%);
    /* 径向渐变背景 */
    border-radius: 50%;
    /* 圆形 */
    opacity: 0.1;
    /* 透明度，创建柔和效果 */
}

/* image-src: Logo图片样式 */
.image-src {
    display: block;
    /* 块级显示 */
    margin: 0 auto;
    /* 水平居中 */
    max-width: 320px;
    /* 最大宽度 */
    max-height: 320px;
    /* 最大高度 */
    width: auto;
    /* 宽度自适应 */
    height: auto;
    /* 高度自适应 */
    object-fit: contain;
    /* 保持比例，完整显示 */
    /* 图片样式完成 */
}

/* =========================== 响应式设计 =========================== */
/* 大屏幕布局（桌面端）：≥960px */
@media (min-width: 960px) {

    /* 大屏幕下容器改为水平布局 */
    .container {
        flex-direction: row;
        /* 水平排列：文本在左，图片在右 */
        align-items: center;
        /* 垂直居中对齐 */
        justify-content: space-between;
        /* 两端对齐，中间留空 */
        gap: 64px;
        /* 增大文本和图片间距 */
        padding: 0 64px;
        /* 增加左右内边距 */
    }

    /* 文本区域在大屏幕下左对齐 */
    .main {
        text-align: left;
        /* 文本左对齐 */
        max-width: 600px;
        /* 限制文本区域最大宽度 */
        order: 1;
        /* 排序：显示在左侧 */
    }

    /* 图片区域排序 */
    .image {
        order: 2;
        /* 排序：显示在右侧 */
    }

    /* 标题和标语在大屏幕下左对齐 */
    .heading,
    .tagline {
        text-align: left;
        /* 左对齐 */
        margin-left: 0;
        /* 移除左边距 */
    }
}

/* 中等屏幕布局（平板端）：≤640px */
@media (max-width: 640px) {

    /* 减小标题字体大小 */
    .heading {
        font-size: 2rem;
        /* 较小的字体大小 */
    }

    /* 调整图片容器尺寸 */
    .image-container {
        width: 256px;
        /* 中等尺寸宽度 */
        height: 256px;
        /* 中等尺寸高度 */
    }

    /* 调整图片最大尺寸 */
    .image-src {
        max-width: 256px;
        /* 中等最大宽度 */
        max-height: 256px;
        /* 中等最大高度 */
    }
}

/* 小屏幕布局（手机端）：≤480px */
@media (max-width: 480px) {

    /* 进一步缩小图片容器 */
    .image-container {
        width: 192px;
        /* 小尺寸宽度 */
        height: 192px;
        /* 小尺寸高度 */
    }

    /* 进一步缩小图片尺寸 */
    .image-src {
        max-width: 192px;
        /* 小最大宽度 */
        max-height: 192px;
        /* 小最大高度 */
    }

    /* 按钮在小屏幕下垂直排列 */
    .actions {
        flex-direction: column;
        /* 垂直排列按钮 */
        align-items: center;
        /* 按钮居中对齐 */
    }
}

/* 迷雾内容样式 */
.mist-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #fff;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    margin-bottom: 0.5rem;
    text-align: center;
}

.mist-subtitle {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    text-align: center;
}
</style>