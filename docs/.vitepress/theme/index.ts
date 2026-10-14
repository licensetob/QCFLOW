import Theme from 'vitepress/theme'
import 'virtual:group-icons.css'
import './styles.css'

// 导入自定义组件
import CircleFogAnimation from './components/CircleFogAnimation.vue'

// 扩展默认主题
export default {
  ...Theme,
  // 增强Vue应用实例
  enhanceApp({ app }) {
    // 全局注册组件
    app.component('CircleFogAnimation', CircleFogAnimation)
  }
}
