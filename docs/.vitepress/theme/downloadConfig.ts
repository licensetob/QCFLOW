export interface DownloadConfig {
  version: string
  updateDate: string
  packageSize: string
  platforms: string[]
  lanzou: {
    name: string
    badge: string
    description: string
    url: string
    password?: string
  }
  git: {
    github: {
      name: string
      badge: string
      description: string
      releaseUrl: string
      directUrl: string
    }
    gitee: {
      name: string
      badge: string
      description: string
      releaseUrl: string
      directUrl: string
    }
  }
}

export const downloadConfig: DownloadConfig = {
  version: 'v1.0.0',
  updateDate: '2026-10',
  packageSize: '桌面端安装包',
  platforms: ['Windows', 'macOS'],
  // 渠道一：蓝奏云网盘下载
  lanzou: {
    name: '蓝奏云极速下载',
    badge: '国内高速 · 推荐',
    description: '国内多节点高速直连网盘，免登录极速下载完整客户端安装包',
    url: '', // 待填入蓝奏云分享链接
    password: '' // 若有提取码可填入此处，点击下载会自动复制提取码
  },
  // 渠道二：Git 发行版下载（分为 GitHub 与 Gitee）
  git: {
    github: {
      name: 'GitHub Releases',
      badge: '国际官方源',
      description: '通过 GitHub 官方仓库 Releases 下载最新构建版本与历史归档',
      releaseUrl: 'https://github.com/licensetob/QCFLOW/releases',
      directUrl: '' // 上传 GitHub Release 资产后填入直链
    },
    gitee: {
      name: 'Gitee 发行版',
      badge: '国内镜像源',
      description: '通过 Gitee（码云）国内镜像仓库发行版高速下载安装包',
      releaseUrl: '', // 待填入 Gitee 发行版地址
      directUrl: '' // 待填入 Gitee 发行版安装包直链
    }
  }
}
