// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'
import '@/plugin/utils'
import '@/plugin/vxe-table'
import refreshToken from './utils/refreshToken'
// 监听滚动事件和滑动事件
refreshToken.setRefreshToken()
// 菜单和路由设置
import router from './router'
// import { frameInRoutes } from '@/router/routes'

// 检验数据类型
import '@/utils/toType'

import '@/api/mock/index'

document.addEventListener('visibilitychange', () => {
  const whiteList = ['/login']
  const curPath = router.history.current.path
  if (document.visibilityState === 'hidden' && !whiteList.includes(curPath)) {
    refreshToken.beforeDestroy()
  }
})

import { mapState } from 'vuex'

import mixin from './mixin/globalMixin.js'
Vue.mixin(mixin)

Vue.prototype.$bus = new Vue() // event Bus 用于无关系组件间的通信。

// 导入表格
import pluginImport from '@d2-projects/vue-table-import'
Vue.use(pluginImport)

// 核心插件
Vue.use(d2Admin)

// 按钮权限
Vue.prototype.hasButtonPermission = (permission) => {
  return store.getters['hasButtonPermission'](permission)
}

window.addEventListener('error', (err) => {
  console.log('err', err)
})
new Vue({
  router,
  store,
  i18n,
  computed: {
    ...mapState('permission', [
      'routes'
    ])
  },
  // watch: {
  //   // 检测路由变化切换侧边栏内容
  //   '$route.matched': {
  //     handler(matched) {
  //       if (matched.length > 0) {
  //         const _side = this.routes.filter(menu => menu.path === matched[0].path)
  //         this.$store.commit('menu/asideSet', _side.length > 0 ? _side[0].children : [])
  //       }
  //     },
  //     immediate: true
  //   }
  // },
  mounted() {
    // 展示系统信息
    this.$store.commit('releases/versionShow')

    // 获取并记录用户 UA
    this.$store.commit('ua/get')
    // 初始化全屏监听
    this.$store.dispatch('fullscreen/listen')
  },
  render: h => h(App)
}).$mount('#app')
