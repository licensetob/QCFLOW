export interface GitProviderConfig {
  name: string
  badge: string
  description: string
  releaseUrl: string
  winUrl: string
  macUrl: string
}

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
    github: GitProviderConfig
    gitee: GitProviderConfig
  }
}

export const downloadConfig: DownloadConfig = {
  version: 'v1.0.0',
  updateDate: '2026-10-16',
  packageSize: 'macOS 61MB · Windows 45MB',
  platforms: ['Windows', 'macOS'],
  // 渠道一：蓝奏云网盘下载
  lanzou: {
    name: '蓝奏云极速下载',
    badge: '国内高速 · 推荐',
    description: '国内多节点高速网盘直连，包含 Windows (.zip) 与 macOS (.dmg) 完整安装包',
    url: 'https://anonymous1.lanzouv.com/b02sgz4ble',
    password: 'afd5'
  },
  // 渠道二：Git 发行版下载（分为 GitHub 与 Gitee）
  git: {
    github: {
      name: 'GitHub 下载',
      badge: '国际官方源',
      description: '通过 GitHub 官方仓库直接下载最新构建的 Windows 与 macOS 安装包',
      releaseUrl: 'https://github.com/licensetob/QCFLOW/tree/main/releases',
      winUrl: 'https://github.com/licensetob/QCFLOW/raw/main/releases/qcflow_windows_v1.0.0_build1.zip',
      macUrl: 'https://github.com/licensetob/QCFLOW/raw/main/releases/qcflow_macos_v1.0.0_build1.dmg'
    },
    gitee: {
      name: 'Gitee 下载',
      badge: '国内镜像源',
      description: '通过 Gitee（码云）国内镜像仓库高速下载 Windows 与 macOS 安装包',
      releaseUrl: 'https://gitee.com/zanonymous/qcflow/tree/main/releases',
      winUrl: 'https://gitee.com/zanonymous/qcflow/blob/main/releases/qcflow_windows_v1.0.0_build1.zip',
      macUrl: 'https://gitee.com/zanonymous/qcflow/blob/main/releases/qcflow_macos_v1.0.0_build1.dmg'
    }
  }
}
