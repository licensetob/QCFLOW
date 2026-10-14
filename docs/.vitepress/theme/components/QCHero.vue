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
                    <div v-for="(action, idx) in actions" :key="action.link" class="action">
                        <!-- 按钮链接：根据主题应用不同样式，支持鼠标悬停自动判断方向弹出群二维码、点击直接跳转 -->
                        <a
                            :ref="el => setBtnRef(el, idx)"
                            :href="action.link.startsWith('http') ? action.link : withBase(action.link)"
                            :class="['btn', `btn-${action.theme}`, { 'has-qrcode': action.qrcode !== false }]"
                            :target="action.target"
                            :rel="action.rel"
                            @mouseenter="updatePlacement(idx)"
                            @focus="updatePlacement(idx)"
                        >
                            <span class="btn-content">
                                <svg class="qq-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                                    <path d="M12.003 2c-2.265 0-6.29 1.364-6.29 7.325v1.195S3.55 14.96 3.55 17.474c0 .665.17 1.025.281 1.025.114 0 .902-.484 1.748-2.072 0 0-.18 2.197 1.904 3.967 0 0-1.77.495-1.77 1.182 0 .686 4.078.43 6.29 0 2.239.425 6.287.687 6.287 0 0-.688-1.768-1.768-1.182 2.085-1.77 1.905-3.967 1.905-3.967.845 1.588 1.634 2.072 1.746 2.072.111 0 .283-.36.283-1.025 0-2.514-2.166-6.954-2.166-6.954V9.325C18.29 3.364 14.268 2 12.003 2z"/>
                                </svg>
                                <span>{{ action.text }}</span>
                                <svg v-if="action.qrcode !== false" class="qr-badge-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <rect x="3" y="3" width="7" height="7" rx="1"/>
                                    <rect x="14" y="3" width="7" height="7" rx="1"/>
                                    <rect x="3" y="14" width="7" height="7" rx="1"/>
                                    <path d="M14 14h3v3h-3zM18 18h3v3h-3zM14 19h2M19 14v2"/>
                                </svg>
                            </span>

                            <!-- 悬停展示群二维码弹层（自动根据屏幕剩余空间选择上/下/右侧弹出），点击同样直接跳转加群链接 -->
                            <div
                                v-if="action.qrcode !== false"
                                :class="['qrcode-popover', `is-${placements[idx] || 'top'}`]"
                                :style="{ '--popover-shift-y': `${shiftYs[idx] || 0}px` }"
                            >
                                <div class="qrcode-popover-arrow"></div>
                                <div class="qrcode-card">
                                    <div class="qrcode-img-wrapper">
                                        <img :src="withBase(action.qrcode || '/qq-qrcode.jpg')" alt="QCFlutterFlow_中文编程 QQ群二维码" class="qrcode-img" />
                                    </div>
                                    <div class="qrcode-footer">
                                        <span class="qrcode-footer-dot"></span>
                                        <span>扫码入群 · 点击直接跳转</span>
                                    </div>
                                </div>
                            </div>
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
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { withBase } from 'vitepress'
import CircleFogAnimation from './CircleFogAnimation.vue'

const props = defineProps({
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
                text: '加入QQ群【QCFlutterFlow_中文编程】',
                link: 'https://qm.qq.com/q/ywiNks7JpQ',
                qrcode: '/qq-qrcode.jpg',
                target: '_blank',
                rel: 'noopener noreferrer'
            }
        ]
    }
})

const btnRefs = ref([])
const placements = reactive({})
const shiftYs = reactive({})

function setBtnRef(el, idx) {
    if (el) {
        btnRefs.value[idx] = el
    }
}

/**
 * 自动计算二维码气泡最佳弹出方向（下 / 上 / 右），防止超出视口被遮挡
 */
function updatePlacement(idx = 0) {
    if (typeof window === 'undefined') return
    const el = btnRefs.value[idx]
    if (!el) return

    const rect = el.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight

    const CARD_H = 325 // 二维码气泡高度预估
    const CARD_W = 240 // 二维码气泡宽度预估
    const GAP = 16
    const NAV_H = 68   // 顶部导航栏安全高度
    const EDGE = 16    // 视口边缘安全间距

    const spaceBottom = vh - rect.bottom - EDGE
    const spaceTop = rect.top - NAV_H - EDGE
    const spaceRight = vw - rect.right - EDGE

    shiftYs[idx] = 0

    if (spaceBottom >= CARD_H + GAP) {
        placements[idx] = 'bottom'
    } else if (spaceTop >= CARD_H + GAP) {
        placements[idx] = 'top'
    } else if (spaceRight >= CARD_W + GAP && vw >= 640) {
        placements[idx] = 'right'
        // 计算右侧居中时上下是否越界，自动修正垂直偏移量
        const centerY = rect.top + rect.height / 2
        const halfH = CARD_H / 2
        if (centerY - halfH < NAV_H + EDGE) {
            shiftYs[idx] = (NAV_H + EDGE) - (centerY - halfH)
        } else if (centerY + halfH > vh - EDGE) {
            shiftYs[idx] = (vh - EDGE) - (centerY + halfH)
        }
    } else {
        placements[idx] = spaceTop >= spaceBottom ? 'top' : 'bottom'
    }
}

function updateAllPlacements() {
    props.actions.forEach((_, idx) => updatePlacement(idx))
}

onMounted(() => {
    updateAllPlacements()
    window.addEventListener('resize', updateAllPlacements, { passive: true })
    window.addEventListener('scroll', updateAllPlacements, { passive: true })
})

onBeforeUnmount(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('resize', updateAllPlacements)
        window.removeEventListener('scroll', updateAllPlacements)
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
    min-height: calc(100vh - 64px);
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

/* =========================== 按钮与悬浮二维码样式 =========================== */
/* actions: 按钮容器，使用弹性布局 */
.actions {
    display: flex;
    gap: 16px;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.action {
    position: relative;
}

/* btn: 按钮基础样式 */
.btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 13px 26px;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-content {
    display: inline-flex;
    align-items: center;
    gap: 10px;
}

.qq-icon {
    flex-shrink: 0;
}

.qr-badge-icon {
    flex-shrink: 0;
    opacity: 0.85;
    transition: transform 0.28s ease, opacity 0.28s ease;
}

/* btn-brand: 品牌主题按钮（主要按钮） */
.btn-brand {
    background-color: var(--vp-c-brand-1);
    color: var(--vp-c-white);
    box-shadow: 0 6px 20px -4px rgba(100, 108, 255, 0.45);
}

/* btn-brand:hover: 品牌按钮悬停效果 */
.btn-brand:hover {
    background-color: var(--vp-c-brand-2);
    transform: translateY(-2px);
    box-shadow: 0 10px 28px -4px rgba(100, 108, 255, 0.6);
}

.btn:hover .qr-badge-icon {
    opacity: 1;
    transform: scale(1.12);
}

/* btn-alt: 次要主题按钮（辅助按钮） */
.btn-alt {
    background-color: var(--vp-c-bg-alt);
    color: var(--vp-c-text-1);
    border: 1px solid var(--vp-c-divider);
}

/* btn-alt:hover: 次要按钮悬停效果 */
.btn-alt:hover {
    background-color: var(--vp-c-gray-light-4);
}

/* =========================== 悬浮二维码气泡卡片（自适应方向） =========================== */
.qrcode-popover {
    position: absolute;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 0.26s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.26s cubic-bezier(0.16, 1, 0.3, 1),
                visibility 0.26s;
    z-index: 200;
}

/* 1. 下方弹出 (is-bottom) */
.qrcode-popover.is-bottom {
    top: calc(100% + 14px);
    left: 50%;
    transform: translateX(-50%) translateY(10px) scale(0.94);
}
.qrcode-popover.is-bottom::before {
    content: '';
    position: absolute;
    top: -16px;
    left: 0;
    right: 0;
    height: 16px;
}
.btn:hover .qrcode-popover.is-bottom,
.btn:focus-visible .qrcode-popover.is-bottom {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateX(-50%) translateY(0) scale(1);
}
.qrcode-popover.is-bottom .qrcode-popover-arrow {
    top: -6px;
    left: 50%;
    border-top: 1px solid rgba(255, 255, 255, 0.16);
    border-left: 1px solid rgba(255, 255, 255, 0.16);
    transform: translateX(-50%) rotate(45deg);
}

/* 2. 上方弹出 (is-top) */
.qrcode-popover.is-top {
    bottom: calc(100% + 14px);
    left: 50%;
    transform: translateX(-50%) translateY(-10px) scale(0.94);
}
.qrcode-popover.is-top::before {
    content: '';
    position: absolute;
    bottom: -16px;
    left: 0;
    right: 0;
    height: 16px;
}
.btn:hover .qrcode-popover.is-top,
.btn:focus-visible .qrcode-popover.is-top {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateX(-50%) translateY(0) scale(1);
}
.qrcode-popover.is-top .qrcode-popover-arrow {
    bottom: -6px;
    left: 50%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.16);
    border-right: 1px solid rgba(255, 255, 255, 0.16);
    transform: translateX(-50%) rotate(45deg);
}

/* 3. 右侧弹出 (is-right) */
.qrcode-popover.is-right {
    left: calc(100% + 16px);
    top: 50%;
    transform: translateX(10px) translateY(calc(-50% + var(--popover-shift-y, 0px))) scale(0.94);
}
.qrcode-popover.is-right::before {
    content: '';
    position: absolute;
    left: -18px;
    top: 0;
    bottom: 0;
    width: 18px;
}
.btn:hover .qrcode-popover.is-right,
.btn:focus-visible .qrcode-popover.is-right {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateX(0) translateY(calc(-50% + var(--popover-shift-y, 0px))) scale(1);
}
.qrcode-popover.is-right .qrcode-popover-arrow {
    left: -6px;
    top: calc(50% - var(--popover-shift-y, 0px));
    border-bottom: 1px solid rgba(255, 255, 255, 0.16);
    border-left: 1px solid rgba(255, 255, 255, 0.16);
    transform: translateY(-50%) rotate(45deg);
}

/* 指示小三角公共样式 */
.qrcode-popover-arrow {
    position: absolute;
    width: 12px;
    height: 12px;
    background: #18181b;
    z-index: 1;
}

/* 二维码主体卡片 */
.qrcode-card {
    position: relative;
    width: 236px;
    padding: 10px 10px 8px;
    background: #18181b;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5),
                0 0 28px rgba(100, 108, 255, 0.28);
    overflow: hidden;
}

.qrcode-img-wrapper {
    width: 100%;
    overflow: hidden;
    border-radius: 12px;
    background: #141414;
}

.qrcode-img {
    width: 100%;
    height: auto;
    display: block;
    /* 裁掉手机截图上下多余纯黑留白，完整保留群名、群号、二维码与扫码提示 */
    margin-top: -20%;
    margin-bottom: -16%;
    transition: transform 0.3s ease;
}

.qrcode-card:hover .qrcode-img {
    transform: scale(1.02);
}

.qrcode-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 8px;
    padding-top: 6px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 12px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
    letter-spacing: 0.3px;
}

.qrcode-footer-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #38bdf8;
    box-shadow: 0 0 8px #38bdf8;
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