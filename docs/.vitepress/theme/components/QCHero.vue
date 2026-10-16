<template>
    <!-- 主容器：整个Hero区域的最外层容器，设置全屏高度和居中布局 -->
    <div class="qc-hero">
        <!-- 内容容器：限制最大宽度，控制内容的整体布局 -->
        <div class="container">
            <!-- 文本内容区域：包含标题、副标题、描述、主操作按钮与双渠道快捷入口 -->
            <div class="main">
                <!-- 版本与状态徽章 -->
                <div class="hero-pill" @click="openDownloadModal('lanzou')">
                    <span class="hero-pill-dot"></span>
                    <span class="hero-pill-version">{{ downloadConfig.version }} 桌面客户端</span>
                    <span class="hero-pill-divider">|</span>
                    <span class="hero-pill-link">支持蓝奏云 · GitHub · Gitee 下载 ↗</span>
                </div>

                <!-- 主标题区域 -->
                <h1 class="heading">
                    <!-- 品牌名称：带有品牌色的主要标题 -->
                    <span class="name clip">{{ name }}</span>
                    <!-- 副标题文本：主要描述文字 -->
                    <span class="text">{{ text }}</span>
                </h1>
                <!-- 标语：描述性文本，位于标题下方 -->
                <p class="tagline">{{ tagline }}</p>

                <!-- 操作按钮区域：包含立即下载按钮与加入QQ群按钮 -->
                <div class="actions">
                    <!-- 主下载按钮：点击打开精致双渠道下载中心弹窗 -->
                    <div class="action">
                        <button type="button" class="btn btn-brand btn-download-main" @click="openDownloadModal('all')">
                            <span class="btn-shimmer"></span>
                            <span class="btn-content">
                                <svg class="download-icon" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                                <span>立即下载客户端</span>
                                <span class="btn-version-tag">{{ downloadConfig.version }}</span>
                            </span>
                        </button>
                    </div>

                    <!-- 单个按钮容器（QQ群按钮：支持悬停自动方向弹出二维码、点击直接跳转） -->
                    <div v-for="(action, idx) in actions" :key="action.link" class="action">
                        <a
                            :ref="el => setBtnRef(el, idx)"
                            :href="action.link.startsWith('http') ? action.link : withBase(action.link)"
                            :class="['btn', 'btn-qq-glass', { 'has-qrcode': action.qrcode !== false }]"
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

                <!-- 首页直达：双渠道精致快捷下载面板（渠道一：蓝奏云 / 渠道二：Git 下载 [GitHub & Gitee]） -->
                <div class="quick-channels">
                    <div class="quick-channels-header">
                        <span class="quick-channels-title">官方下载渠道</span>
                        <span class="quick-channels-sub">提供国内高速网盘与双 Git 仓库发行版</span>
                    </div>

                    <div class="quick-channels-grid">
                        <!-- 渠道一：蓝奏云下载 -->
                        <div class="channel-mini-card channel-lanzou" @click="handleLanzouDownload">
                            <div class="channel-mini-icon lanzou-gradient">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
                                    <path d="M12 13v5"/>
                                    <path d="m9.5 15.5 2.5 2.5 2.5-2.5"/>
                                </svg>
                            </div>
                            <div class="channel-mini-body">
                                <div class="channel-mini-top">
                                    <span class="channel-mini-name">蓝奏云下载</span>
                                    <span class="channel-mini-badge badge-green">高速推荐</span>
                                </div>
                                <span class="channel-mini-desc">
                                    {{ downloadConfig.lanzou.password ? `国内极速直连 · 提取码 ${downloadConfig.lanzou.password}` : '国内多节点极速网盘直连' }}
                                </span>
                            </div>
                            <div class="channel-mini-arrow">
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M7 17L17 7M7 7h10v10"/>
                                </svg>
                            </div>
                        </div>

                        <!-- 渠道二：Git 下载（分为 GitHub 和 Gitee） -->
                        <div class="channel-mini-card channel-git">
                            <div class="channel-mini-icon git-gradient">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="18" cy="18" r="3"/>
                                    <circle cx="6" cy="6" r="3"/>
                                    <path d="M13 6h3a2 2 0 0 1 2 2v7"/>
                                    <line x1="6" y1="9" x2="6" y2="21"/>
                                </svg>
                            </div>
                            <div class="channel-mini-body">
                                <div class="channel-mini-top">
                                    <span class="channel-mini-name">Git 发行版下载</span>
                                    <span class="channel-mini-badge badge-blue">双源仓库</span>
                                </div>
                                <div class="git-mini-buttons">
                                    <button type="button" class="git-pill-btn github-pill" @click.stop="handleGitDownload('github')">
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                                            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/>
                                        </svg>
                                        <span>GitHub</span>
                                    </button>
                                    <button type="button" class="git-pill-btn gitee-pill" @click.stop="handleGitDownload('gitee')">
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                                            <path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"/>
                                        </svg>
                                        <span>Gitee</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 图片区域：包含logo和背景效果 -->
            <div class="image">
                <!-- 圆形迷雾动画组件 -->
                <CircleFogAnimation :animated="true">
                    <div class="logo" :style="{ backgroundImage: `url(${withBase('/qc-logo.png')})` }"></div>
                </CircleFogAnimation>
            </div>
        </div>

        <!-- =========================== 精致双渠道下载中心弹窗 =========================== -->
        <Teleport to="body">
            <Transition name="qc-modal-fade">
                <div v-if="showDownloadModal" class="qc-modal-overlay" @click.self="closeDownloadModal">
                    <div class="qc-modal-panel" role="dialog" aria-modal="true" aria-labelledby="qc-download-title">
                        <!-- 顶部发光装饰线 -->
                        <div class="qc-modal-glow-bar"></div>

                        <!-- 弹窗头部 -->
                        <div class="qc-modal-header">
                            <div class="qc-modal-brand">
                                <img :src="withBase('/qc-logo.png')" alt="QC Logo" class="qc-modal-logo" />
                                <div>
                                    <div class="qc-modal-title-row">
                                        <h2 id="qc-download-title" class="qc-modal-title">下载 QC Flutter Flow</h2>
                                        <span class="qc-modal-version">{{ downloadConfig.version }}</span>
                                    </div>
                                    <p class="qc-modal-subtitle">选择适合您的下载渠道 · 支持蓝奏云网盘与 GitHub / Gitee 官方仓库</p>
                                </div>
                            </div>
                            <button type="button" class="qc-modal-close" aria-label="关闭下载窗口" @click="closeDownloadModal">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        <!-- 弹窗内容：两大下载渠道 -->
                        <div class="qc-modal-body">
                            <!-- 渠道一：蓝奏云高速网盘 -->
                            <div class="dl-channel-block dl-channel-lanzou">
                                <div class="dl-channel-header">
                                    <div class="dl-channel-title-group">
                                        <div class="dl-channel-icon lanzou-gradient">
                                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
                                                <path d="M12 13v5"/>
                                                <path d="m9.5 15.5 2.5 2.5 2.5-2.5"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <div class="dl-channel-name-row">
                                                <span class="dl-channel-step">渠道一</span>
                                                <h3 class="dl-channel-name">{{ downloadConfig.lanzou.name }}</h3>
                                                <span class="dl-tag tag-recommend">{{ downloadConfig.lanzou.badge }}</span>
                                            </div>
                                            <p class="dl-channel-desc">{{ downloadConfig.lanzou.description }}</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="dl-lanzou-actions">
                                    <!-- 提取码展示与一键复制（若有提取码） -->
                                    <div v-if="downloadConfig.lanzou.password" class="dl-pwd-box" @click="copyLanzouPassword">
                                        <span class="dl-pwd-label">提取码</span>
                                        <code class="dl-pwd-code">{{ downloadConfig.lanzou.password }}</code>
                                        <span class="dl-pwd-copy">{{ copiedPwd ? '✓ 已复制' : '点击复制' }}</span>
                                    </div>
                                    <div v-else class="dl-pwd-box dl-pwd-free">
                                        <span class="dl-pwd-dot"></span>
                                        <span>免登录 · 高速直链下载</span>
                                    </div>

                                    <button type="button" class="dl-primary-btn btn-lanzou-go" @click="handleLanzouDownload">
                                        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                        <span>前往蓝奏云下载</span>
                                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M7 17L17 7M7 7h10v10"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <!-- 渠道二：Git 官方发行版下载（分为 GitHub 和 Gitee） -->
                            <div class="dl-channel-block dl-channel-git">
                                <div class="dl-channel-header">
                                    <div class="dl-channel-title-group">
                                        <div class="dl-channel-icon git-gradient">
                                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <circle cx="18" cy="18" r="3"/>
                                                <circle cx="6" cy="6" r="3"/>
                                                <path d="M13 6h3a2 2 0 0 1 2 2v7"/>
                                                <line x1="6" y1="9" x2="6" y2="21"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <div class="dl-channel-name-row">
                                                <span class="dl-channel-step">渠道二</span>
                                                <h3 class="dl-channel-name">Git 仓库下载</h3>
                                                <span class="dl-tag tag-git">GitHub & Gitee 双平台</span>
                                            </div>
                                            <p class="dl-channel-desc">从开源托管平台 Release 发行版直接拉取最新安装包，支持国际源与国内镜像源</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Git 双子渠道卡片：GitHub 与 Gitee -->
                                <div class="dl-git-grid">
                                    <!-- 子渠道 2A：GitHub -->
                                    <div class="dl-git-subcard subcard-github">
                                        <div class="dl-git-subcard-top">
                                            <div class="dl-git-brand">
                                                <div class="dl-git-logo github-logo-bg">
                                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div class="dl-git-name">GitHub 下载</div>
                                                    <div class="dl-git-meta">{{ downloadConfig.git.github.badge }}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <p class="dl-git-subdesc">{{ downloadConfig.git.github.description }}</p>
                                        <button type="button" class="dl-git-action-btn btn-github" @click="handleGitDownload('github')">
                                            <span>GitHub Releases 下载</span>
                                            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M7 17L17 7M7 7h10v10"/>
                                            </svg>
                                        </button>
                                    </div>

                                    <!-- 子渠道 2B：Gitee (码云) -->
                                    <div class="dl-git-subcard subcard-gitee">
                                        <div class="dl-git-subcard-top">
                                            <div class="dl-git-brand">
                                                <div class="dl-git-logo gitee-logo-bg">
                                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                                        <path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"/>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div class="dl-git-name">Gitee 下载</div>
                                                    <div class="dl-git-meta">{{ downloadConfig.git.gitee.badge }}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <p class="dl-git-subdesc">{{ downloadConfig.git.gitee.description }}</p>
                                        <button type="button" class="dl-git-action-btn btn-gitee" @click="handleGitDownload('gitee')">
                                            <span>Gitee 发行版下载</span>
                                            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M7 17L17 7M7 7h10v10"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 弹窗底部提示栏 -->
                        <div class="qc-modal-footer">
                            <span class="qc-modal-footer-tip">遇到安装问题或需要历史版本？</span>
                            <a href="https://qm.qq.com/q/ywiNks7JpQ" target="_blank" rel="noopener noreferrer" class="qc-modal-footer-qq">
                                加入官方 QQ 群【QCFlutterFlow_中文编程】获取支持 →
                            </a>
                        </div>

                        <!-- 轻提示 Toast -->
                        <Transition name="qc-toast-fade">
                            <div v-if="toastMessage" class="qc-toast">
                                <span class="qc-toast-dot"></span>
                                <span>{{ toastMessage }}</span>
                            </div>
                        </Transition>
                    </div>
                </div>
            </Transition>

            <!-- 页面级轻提示（当未打开弹窗直接点击快捷卡片时展示） -->
            <Transition name="qc-toast-fade">
                <div v-if="toastMessage && !showDownloadModal" class="qc-toast qc-toast-fixed">
                    <span class="qc-toast-dot"></span>
                    <span>{{ toastMessage }}</span>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { withBase } from 'vitepress'
import CircleFogAnimation from './CircleFogAnimation.vue'
import { downloadConfig } from '../downloadConfig'

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
const showDownloadModal = ref(false)
const copiedPwd = ref(false)
const toastMessage = ref('')
let toastTimer = null

function showToast(msg) {
    toastMessage.value = msg
    if (toastTimer) clearTimeout(toastTimer)
    toastTimer = setTimeout(() => {
        toastMessage.value = ''
    }, 3200)
}

function openDownloadModal() {
    showDownloadModal.value = true
}

function closeDownloadModal() {
    showDownloadModal.value = false
}

async function copyLanzouPassword() {
    if (!downloadConfig.lanzou.password) return
    try {
        await navigator.clipboard.writeText(downloadConfig.lanzou.password)
        copiedPwd.value = true
        showToast(`已复制蓝奏云提取码：${downloadConfig.lanzou.password}`)
        setTimeout(() => {
            copiedPwd.value = false
        }, 2500)
    } catch {
        showToast(`提取码为：${downloadConfig.lanzou.password}`)
    }
}

async function handleLanzouDownload() {
    if (downloadConfig.lanzou.password) {
        try {
            await navigator.clipboard.writeText(downloadConfig.lanzou.password)
            copiedPwd.value = true
        } catch {}
    }
    if (downloadConfig.lanzou.url) {
        window.open(downloadConfig.lanzou.url, '_blank', 'noopener,noreferrer')
    } else {
        showDownloadModal.value = true
        showToast('蓝奏云安装包链接即将同步上线，敬请期待！')
    }
}

function handleGitDownload(provider) {
    const target = provider === 'github' ? downloadConfig.git.github : downloadConfig.git.gitee
    const targetUrl = target.directUrl || target.releaseUrl
    if (targetUrl) {
        window.open(targetUrl, '_blank', 'noopener,noreferrer')
    } else {
        showDownloadModal.value = true
        showToast(`${target.name}安装包链接即将同步上线，敬请期待！`)
    }
}

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

function handleKeydown(e) {
    if (e.key === 'Escape' && showDownloadModal.value) {
        closeDownloadModal()
    }
}

onMounted(() => {
    updateAllPlacements()
    window.addEventListener('resize', updateAllPlacements, { passive: true })
    window.addEventListener('scroll', updateAllPlacements, { passive: true })
    window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('resize', updateAllPlacements)
        window.removeEventListener('scroll', updateAllPlacements)
        window.removeEventListener('keydown', handleKeydown)
    }
})
</script>

<style scoped>
/* =========================== 主容器样式 =========================== */
.logo {
    width: 300px;
    height: 300px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
}

.qc-hero {
    padding: 32px 0;
    text-align: center;
    min-height: calc(100vh - 64px);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 48px;
}

.main {
    display: block;
    text-align: left;
    order: 1;
    width: 100%;
}

.image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 400px;
    order: 2;
    flex-shrink: 0;
}

/* =========================== 顶部版本胶囊 =========================== */
.hero-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    margin-bottom: 20px;
    border-radius: 999px;
    background: rgba(46, 223, 4, 0.08);
    border: 1px solid rgba(46, 223, 4, 0.25);
    font-size: 12.5px;
    font-weight: 500;
    color: var(--vp-c-text-1);
    cursor: pointer;
    transition: all 0.25s ease;
}

.hero-pill:hover {
    background: rgba(46, 223, 4, 0.14);
    border-color: rgba(46, 223, 4, 0.45);
    transform: translateY(-1px);
}

.hero-pill-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #2EDF04;
    box-shadow: 0 0 8px #2EDF04;
}

.hero-pill-version {
    font-weight: 600;
    color: var(--vp-c-brand-1);
}

.hero-pill-divider {
    opacity: 0.3;
}

.hero-pill-link {
    color: var(--vp-c-text-2);
}

/* =========================== 文本样式 =========================== */
.heading {
    margin: 0;
    line-height: 1.18;
    font-size: 3.4rem;
    font-weight: 700;
}

.name {
    color: var(--vp-c-brand-1);
    display: block;
    margin-bottom: 14px;
}

.text {
    display: block;
    margin-bottom: 20px;
    color: var(--vp-c-text-1);
}

.tagline {
    margin: 0 0 28px;
    font-size: 1.18rem;
    line-height: 1.6;
    color: var(--vp-c-text-2);
    max-width: 600px;
}

/* =========================== 按钮与悬浮二维码样式 =========================== */
.actions {
    display: flex;
    gap: 14px;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 28px;
}

.action {
    position: relative;
}

.btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 13px 24px;
    border-radius: 12px;
    text-decoration: none;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-content {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    gap: 10px;
}

.download-icon,
.qq-icon {
    flex-shrink: 0;
}

.qr-badge-icon {
    flex-shrink: 0;
    opacity: 0.85;
    transition: transform 0.28s ease, opacity 0.28s ease;
}

/* 主下载按钮 */
.btn-download-main {
    overflow: hidden;
    background: linear-gradient(135deg, #2EDF04 0%, #1db954 100%);
    color: #091405;
    box-shadow: 0 8px 24px -4px rgba(46, 223, 4, 0.45),
                inset 0 1px 0 rgba(255, 255, 255, 0.35);
}

.btn-download-main:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px -4px rgba(46, 223, 4, 0.6),
                inset 0 1px 0 rgba(255, 255, 255, 0.45);
}

.btn-shimmer {
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
    transform: skewX(-20deg);
    animation: btnShimmer 3.8s infinite;
}

@keyframes btnShimmer {
    0% { left: -100%; }
    35%, 100% { left: 160%; }
}

.btn-version-tag {
    padding: 2px 8px;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.16);
    color: #071204;
    font-size: 11.5px;
    font-weight: 700;
}

/* QQ 群玻璃拟态按钮 */
.btn-qq-glass {
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-1);
    border: 1px solid var(--vp-c-divider);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.btn-qq-glass:hover {
    border-color: var(--vp-c-brand-1);
    background: var(--vp-c-bg-elv);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(46, 223, 4, 0.15);
}

.btn:hover .qr-badge-icon {
    opacity: 1;
    transform: scale(1.12);
}

/* =========================== 首页双渠道快捷下载面板 =========================== */
.quick-channels {
    max-width: 620px;
    padding: 16px;
    border-radius: 16px;
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
    backdrop-filter: blur(12px);
}

.quick-channels-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    padding: 0 2px;
}

.quick-channels-title {
    font-size: 12.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--vp-c-text-1);
}

.quick-channels-sub {
    font-size: 12px;
    color: var(--vp-c-text-2);
}

.quick-channels-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
}

.channel-mini-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    border-radius: 12px;
    background: var(--vp-c-bg);
    border: 1px solid var(--vp-c-divider);
    transition: all 0.24s cubic-bezier(0.16, 1, 0.3, 1);
}

.channel-lanzou {
    cursor: pointer;
}

.channel-lanzou:hover,
.channel-git:hover {
    border-color: rgba(46, 223, 4, 0.45);
    transform: translateY(-2px);
    box-shadow: 0 10px 24px -6px rgba(0, 0, 0, 0.12);
}

.channel-mini-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #fff;
}

.lanzou-gradient {
    background: linear-gradient(135deg, #0ea5e9 0%, #2EDF04 100%);
    box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
}

.git-gradient {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.channel-mini-body {
    flex: 1;
    min-width: 0;
    text-align: left;
}

.channel-mini-top {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 4px;
}

.channel-mini-name {
    font-size: 14px;
    font-weight: 700;
    color: var(--vp-c-text-1);
    white-space: nowrap;
}

.channel-mini-badge {
    padding: 1px 6px;
    border-radius: 6px;
    font-size: 10.5px;
    font-weight: 600;
    white-space: nowrap;
}

.badge-green {
    background: rgba(46, 223, 4, 0.14);
    color: #27b803;
}

.badge-blue {
    background: rgba(99, 102, 241, 0.14);
    color: #6366f1;
}

.channel-mini-desc {
    display: block;
    font-size: 12px;
    color: var(--vp-c-text-2);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.channel-mini-arrow {
    color: var(--vp-c-text-3);
    transition: transform 0.2s ease, color 0.2s ease;
}

.channel-lanzou:hover .channel-mini-arrow {
    color: var(--vp-c-brand-1);
    transform: translate(2px, -2px);
}

/* Git 快捷双按钮（GitHub / Gitee） */
.git-mini-buttons {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 2px;
}

.git-pill-btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 9px;
    border-radius: 6px;
    font-size: 11.5px;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-1);
    transition: all 0.2s ease;
}

.github-pill:hover {
    background: #24292f;
    color: #fff;
    border-color: #24292f;
}

.gitee-pill:hover {
    background: #c71d23;
    color: #fff;
    border-color: #c71d23;
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

.qrcode-popover-arrow {
    position: absolute;
    width: 12px;
    height: 12px;
    background: #18181b;
    z-index: 1;
}

.qrcode-card {
    position: relative;
    width: 236px;
    padding: 10px 10px 8px;
    background: #18181b;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5),
                0 0 28px rgba(46, 223, 4, 0.22);
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

/* =========================== 下载中心弹窗样式 =========================== */
.qc-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(9, 11, 16, 0.72);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.qc-modal-panel {
    position: relative;
    width: 100%;
    max-width: 680px;
    border-radius: 22px;
    background: var(--vp-c-bg-elv, #161618);
    border: 1px solid var(--vp-c-divider);
    box-shadow: 0 28px 80px rgba(0, 0, 0, 0.48),
                0 0 40px rgba(46, 223, 4, 0.12);
    overflow: hidden;
    text-align: left;
}

.qc-modal-glow-bar {
    height: 3px;
    width: 100%;
    background: linear-gradient(90deg, #0ea5e9, #2EDF04, #6366f1);
}

.qc-modal-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    padding: 22px 26px 18px;
    border-bottom: 1px solid var(--vp-c-divider);
}

.qc-modal-brand {
    display: flex;
    align-items: center;
    gap: 14px;
}

.qc-modal-logo {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    object-fit: contain;
    background: var(--vp-c-bg-soft);
    padding: 4px;
    border: 1px solid var(--vp-c-divider);
}

.qc-modal-title-row {
    display: flex;
    align-items: center;
    gap: 10px;
}

.qc-modal-title {
    margin: 0;
    font-size: 19px;
    font-weight: 700;
    color: var(--vp-c-text-1);
    border: none;
    padding: 0;
    line-height: 1.3;
}

.qc-modal-version {
    padding: 2px 9px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    background: rgba(46, 223, 4, 0.15);
    color: #27b803;
}

.qc-modal-subtitle {
    margin: 4px 0 0;
    font-size: 13px;
    color: var(--vp-c-text-2);
}

.qc-modal-close {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    border: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-2);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
}

.qc-modal-close:hover {
    color: var(--vp-c-text-1);
    border-color: var(--vp-c-brand-1);
    transform: rotate(90deg);
}

.qc-modal-body {
    padding: 20px 26px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: calc(85vh - 140px);
    overflow-y: auto;
}

.dl-channel-block {
    padding: 18px 20px;
    border-radius: 16px;
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    transition: border-color 0.25s ease;
}

.dl-channel-lanzou:hover {
    border-color: rgba(14, 165, 233, 0.5);
}

.dl-channel-git:hover {
    border-color: rgba(99, 102, 241, 0.5);
}

.dl-channel-header {
    margin-bottom: 14px;
}

.dl-channel-title-group {
    display: flex;
    align-items: flex-start;
    gap: 14px;
}

.dl-channel-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    flex-shrink: 0;
}

.dl-channel-name-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
}

.dl-channel-step {
    font-size: 11px;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 6px;
    background: var(--vp-c-bg);
    border: 1px solid var(--vp-c-divider);
    color: var(--vp-c-text-2);
}

.dl-channel-name {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: var(--vp-c-text-1);
}

.dl-tag {
    font-size: 11.5px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 6px;
}

.tag-recommend {
    background: rgba(46, 223, 4, 0.15);
    color: #27b803;
}

.tag-git {
    background: rgba(99, 102, 241, 0.15);
    color: #6366f1;
}

.dl-channel-desc {
    margin: 4px 0 0;
    font-size: 12.5px;
    color: var(--vp-c-text-2);
    line-height: 1.5;
}

/* 蓝奏云操作栏 */
.dl-lanzou-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-top: 12px;
    border-top: 1px dashed var(--vp-c-divider);
}

.dl-pwd-box {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 10px;
    background: var(--vp-c-bg);
    border: 1px solid var(--vp-c-divider);
    font-size: 12.5px;
    cursor: pointer;
    transition: border-color 0.2s ease;
}

.dl-pwd-box:hover {
    border-color: #0ea5e9;
}

.dl-pwd-free {
    cursor: default;
    color: var(--vp-c-text-2);
}

.dl-pwd-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #0ea5e9;
    box-shadow: 0 0 8px #0ea5e9;
}

.dl-pwd-label {
    color: var(--vp-c-text-2);
}

.dl-pwd-code {
    font-weight: 700;
    color: var(--vp-c-brand-1);
    font-size: 13px;
}

.dl-pwd-copy {
    font-size: 11.5px;
    color: #0ea5e9;
    font-weight: 600;
}

.dl-primary-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 11px;
    border: none;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.24s ease;
}

.btn-lanzou-go {
    background: linear-gradient(135deg, #0ea5e9 0%, #2EDF04 100%);
    color: #051408;
    box-shadow: 0 6px 18px -4px rgba(14, 165, 233, 0.45);
}

.btn-lanzou-go:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 24px -4px rgba(46, 223, 4, 0.55);
}

/* Git 双子渠道网格：GitHub & Gitee */
.dl-git-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    padding-top: 12px;
    border-top: 1px dashed var(--vp-c-divider);
}

.dl-git-subcard {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 14px 16px;
    border-radius: 13px;
    background: var(--vp-c-bg);
    border: 1px solid var(--vp-c-divider);
    transition: all 0.22s ease;
}

.subcard-github:hover {
    border-color: #6366f1;
    box-shadow: 0 8px 20px -6px rgba(99, 102, 241, 0.2);
}

.subcard-gitee:hover {
    border-color: #c71d23;
    box-shadow: 0 8px 20px -6px rgba(199, 29, 35, 0.2);
}

.dl-git-subcard-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
}

.dl-git-brand {
    display: flex;
    align-items: center;
    gap: 10px;
}

.dl-git-logo {
    width: 36px;
    height: 36px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
}

.github-logo-bg {
    background: #24292f;
}

.gitee-logo-bg {
    background: #c71d23;
}

.dl-git-name {
    font-size: 14.5px;
    font-weight: 700;
    color: var(--vp-c-text-1);
}

.dl-git-meta {
    font-size: 11.5px;
    color: var(--vp-c-text-2);
}

.dl-git-subdesc {
    margin: 0 0 12px;
    font-size: 12px;
    color: var(--vp-c-text-2);
    line-height: 1.45;
}

.dl-git-action-btn {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 9px 14px;
    border-radius: 9px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid var(--vp-c-divider);
    transition: all 0.2s ease;
}

.btn-github {
    background: #24292f;
    color: #fff;
    border-color: #24292f;
}

.btn-github:hover {
    background: #3b434b;
    transform: translateY(-1px);
}

.btn-gitee {
    background: #c71d23;
    color: #fff;
    border-color: #c71d23;
}

.btn-gitee:hover {
    background: #de2930;
    transform: translateY(-1px);
}

/* 弹窗底部 */
.qc-modal-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    padding: 14px 26px;
    background: var(--vp-c-bg-soft);
    border-top: 1px solid var(--vp-c-divider);
    font-size: 12.5px;
}

.qc-modal-footer-tip {
    color: var(--vp-c-text-2);
}

.qc-modal-footer-qq {
    color: var(--vp-c-brand-1);
    font-weight: 600;
    text-decoration: none;
}

.qc-modal-footer-qq:hover {
    text-decoration: underline;
}

/* 轻提示 Toast */
.qc-toast {
    position: absolute;
    bottom: 18px;
    left: 50%;
    transform: translateX(-50%);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 16px;
    border-radius: 999px;
    background: #18181b;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.16);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
    z-index: 10000;
}

.qc-toast-fixed {
    position: fixed;
    bottom: 32px;
}

.qc-toast-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #2EDF04;
    box-shadow: 0 0 8px #2EDF04;
}

/* 弹窗过渡动画 */
.qc-modal-fade-enter-active,
.qc-modal-fade-leave-active {
    transition: opacity 0.24s ease;
}
.qc-modal-fade-enter-active .qc-modal-panel,
.qc-modal-fade-leave-active .qc-modal-panel {
    transition: transform 0.26s cubic-bezier(0.16, 1, 0.3, 1);
}
.qc-modal-fade-enter-from,
.qc-modal-fade-leave-to {
    opacity: 0;
}
.qc-modal-fade-enter-from .qc-modal-panel,
.qc-modal-fade-leave-to .qc-modal-panel {
    transform: translateY(14px) scale(0.96);
}

.qc-toast-fade-enter-active,
.qc-toast-fade-leave-active {
    transition: all 0.22s ease;
}
.qc-toast-fade-enter-from,
.qc-toast-fade-leave-to {
    opacity: 0;
    transform: translate(-50%, 10px);
}

/* =========================== 响应式设计 =========================== */
@media (min-width: 960px) {
    .container {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 64px;
        padding: 0 64px;
    }

    .main {
        text-align: left;
        max-width: 620px;
        order: 1;
    }

    .image {
        order: 2;
    }

    .heading,
    .tagline {
        text-align: left;
        margin-left: 0;
    }
}

@media (max-width: 640px) {
    .heading {
        font-size: 2.1rem;
    }

    .quick-channels-grid,
    .dl-git-grid {
        grid-template-columns: 1fr;
    }

    .dl-lanzou-actions {
        flex-direction: column;
        align-items: stretch;
    }

    .btn-lanzou-go {
        justify-content: center;
    }

    .image {
        width: 280px;
        height: 280px;
    }
}

@media (max-width: 480px) {
    .actions {
        flex-direction: column;
        align-items: stretch;
    }

    .btn {
        justify-content: center;
    }
}
</style>