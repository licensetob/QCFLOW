import { defineConfig, type DefaultTheme } from 'vitepress'
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
  localIconLoader
} from 'vitepress-plugin-group-icons'

export default defineConfig({
  base: '/QCFLOW/',
  lang: 'zh-Hans',
  title: 'QC Flutter Flow',
  description: '可视化拖拽 · 中文逻辑编排 · AI 全栈生成的多端应用开发平台使用手册',

  cleanUrls: true,
  metaChunk: true,

  markdown: {
    math: true,
    config(md) {
      const fence = md.renderer.rules.fence!
      md.renderer.rules.fence = function (tokens, idx, options, env, self) {
        return fence(tokens, idx, options, env, self).replace(
          '<button title="Copy Code" class="copy"></button>',
          '<button title="复制代码" class="copy"></button>'
        )
      }
      md.use(groupIconMdPlugin)
    }
  },

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/QCFLOW/qc-logo.png' }],
    ['meta', { name: 'theme-color', content: '#2eb800' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'QC Flutter Flow 使用文档' }]
  ],

  themeConfig: {
    logo: { src: '/qc-logo.png', width: 24, height: 24 },
    socialLinks: [],

    nav: [
      {
        text: '使用指南',
        link: '/guide/introduction',
        activeMatch: '/guide/'
      },
      {
        text: '组件大全 (90+)',
        link: '/reference/components',
        activeMatch: '/reference/components'
      },
      {
        text: '中文函数字典 (142)',
        link: '/reference/dsl-functions',
        activeMatch: '/reference/dsl-functions'
      },
      {
        text: '快捷键与常见问题',
        link: '/reference/faq',
        activeMatch: '/reference/faq'
      }
    ],

    sidebar: {
      '/guide/': {
        base: '/guide/',
        items: sidebarGuide()
      },
      '/zh/guide/': {
        base: '/zh/guide/',
        items: sidebarGuide('/zh/reference/')
      },
      '/reference/': {
        base: '/reference/',
        items: sidebarReference()
      },
      '/zh/reference/': {
        base: '/zh/reference/',
        items: sidebarReference('/zh/guide/')
      }
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索组件 / 函数 / 教程',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '未找到相关内容',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    outline: {
      label: '本页目录',
      level: [2, 3]
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录菜单',
    darkModeSwitchLabel: '外观主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  },

  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          vitepress: localIconLoader(
            import.meta.url,
            '../public/vitepress-logo-mini.svg'
          )
        }
      })
    ],
    experimental: {
      enableNativePlugin: true
    }
  }
})

function sidebarGuide(refBase = '/reference/'): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '快速入门',
      collapsed: false,
      items: [
        { text: '平台简介与界面速览', link: 'introduction' },
        { text: '10 分钟做出第一个应用', link: 'getting-started' }
      ]
    },
    {
      text: '核心使用教程',
      collapsed: false,
      items: [
        { text: '可视化画布与页面管理', link: 'canvas-and-pages' },
        { text: '中文逻辑编排（DSL 教程）', link: 'dsl-logic' },
        { text: '接口配置与列表数据绑定', link: 'api-and-data' },
        { text: 'AI 智能助手与全栈生成', link: 'ai-assistant' }
      ]
    },
    {
      text: '进阶与发布',
      collapsed: false,
      items: [
        { text: '自定义组件开发与组件商城', link: 'custom-components' },
        { text: '原生权限配置、调试与打包', link: 'native-and-publish' }
      ]
    },
    {
      text: '速查字典',
      collapsed: false,
      items: [
        { text: '90+ 内置组件大全', base: refBase, link: 'components' },
        { text: '142 个中文函数字典', base: refBase, link: 'dsl-functions' },
        { text: '快捷键与常见问题排查', base: refBase, link: 'faq' }
      ]
    }
  ]
}

function sidebarReference(guideBase = '/guide/'): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '速查手册',
      collapsed: false,
      items: [
        { text: '90+ 内置组件大全', link: 'components' },
        { text: '142 个中文函数字典', link: 'dsl-functions' },
        { text: '快捷键与常见问题排查', link: 'faq' }
      ]
    },
    {
      text: '返回使用指南',
      collapsed: false,
      items: [
        { text: '平台简介与界面速览', base: guideBase, link: 'introduction' },
        { text: '10 分钟做出第一个应用', base: guideBase, link: 'getting-started' }
      ]
    }
  ]
}
