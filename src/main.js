// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// 闻泰内部组件
import WtUi from 'wingtech-ui'
import 'wingtech-ui/lib/index.css'

import 'wingtech-ui/src/plugin'

// store
import store from '@/store/index'
import '@/plugin/utils'
import '@/plugin/vxe-table'
import refreshToken from './utils/refreshToken'
// 监听滚动事件和滑动事件
refreshToken.setRefreshToken()
// 菜单和路由设置
import router from './router'

// 检验数据类型
import '@/utils/toType'

import '@/api/mock/index'

import util from '@/libs/util.js'

// 切换标签页
document.addEventListener('visibilitychange', () => {
  const whiteList = ['/login']
  const curPath = router.history.current.path
  const token = util.cookies.get('token')

  if (document.visibilityState === 'hidden' && !whiteList.includes(curPath)) {
    if (token && token !== 'undefined') refreshToken.beforeDestroy()
  }
})

import { mapState } from 'vuex'

import mixin from './mixin/globalMixin.js'
Vue.mixin(mixin)

Vue.prototype.$bus = new Vue() // event Bus 用于无关系组件间的通信。

// 导入表格
import pluginImport from '@d2-projects/vue-table-import'
Vue.use(pluginImport)
// 获取多语言的接口
import { getLanguage } from '@/api/modules/common'
// 核心插件
Vue.use(d2Admin)
// 闻泰内部组件
Vue.use(WtUi)

// 环境配置
import config from '@/libs/config'
Vue.prototype.$config = config

// 按钮权限
Vue.prototype.hasButtonPermission = (permission) => {
  return store.getters['hasButtonPermission'](permission)
}

window.addEventListener('error', (err) => {
  console.log('err', err)
})
new Vue({
  i18n,
  router,
  store,
  computed: {
    ...mapState('permission', [
      'routes'
    ])
  },
  created() {
    // 收集后端返回的多语言添加到对应的json文件中
    getLanguage().then(res => {
      if (res.code === 200) {
        this.setLanguage('en', res)
        this.setLanguage('zh', res)
      }
    })
  },
  mounted() {
    // 展示系统信息
    this.$store.commit('releases/versionShow')

    // 获取并记录用户 UA
    this.$store.commit('ua/get')
    // 初始化全屏监听
    this.$store.dispatch('fullscreen/listen')
  },
  methods: {
    setLanguage(type, res) {
      const arr = res.data.map(item => { return { [item.code]: item[type] } })
      const obj = {}

      arr.forEach(item => {
        Object.assign(obj, item)
      })
      this.$i18n.mergeLocaleMessage(type, { ...obj })
    }
  },
  render: h => h(App)
}).$mount('#app')
