import Vue from 'vue'
import VueRouter from 'vue-router'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '@/store/index'
import util from '@/libs/util.js'

// 路由数据
import routes from './routes'

const IsProd = process.env.NODE_ENV === 'production'

// fix vue-router NavigationDuplicated
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return VueRouterPush.call(this, location).catch(err => err)
}
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return VueRouterReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/**
 * 路由拦截
 * 权限验证
 */

let whiteList
if (!IsProd) {
  whiteList = ['/login', '/register']// 不重定向白名单
}
router.beforeEach(async(to, from, next) => {
  // 进度条
  NProgress.start()
  if (IsProd) {
    const ssoToken = util.cookies.getToken()
    util.cookies.set('token', ssoToken)
  }
  const token = util.cookies.get('token')
  console.log('token', token)
  if (token && token !== 'undefined') {
    // 有token，并且跳的是登录页，直接切换到首页
    // 获取菜单权限
    const hasRoutes = store.getters.routes && store.getters.routes.length
    if (!hasRoutes) store.dispatch('menu/getMenu')
    await store.dispatch('page/isLoaded')
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    // 没有登录的时候跳转到登录界面
    // 携带上登陆成功之后需要跳转的页面完整路径
    if (IsProd) {
      const userName = store.getters.userName
      console.log('userName', userName)
      if (!userName) {
        window.location.replace(window._CONFIG['ssoURL'])
        sessionStorage.removeItem('isSSO')
        store.dispatch('user/clearInfo')
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
        next()
      } else {
      //   // 否则全部重定向到登录页
        next({
          name: 'login',
          query: {
            redirect: to.fullPath
          }
        })
      }
    }
    NProgress.done()
  }
})

router.afterEach((to, form, next) => {
  // 进度条
  NProgress.done()
  // 多页控制 打开新的页面
  store.dispatch('page/open', to)
  // 更改标题
  util.title(to.meta.title)
})

router.onReady(() => {
  router.addRoutes([{
    path: '*',
    name: '404',
    component: (resolve) => require([`@/views/system/error/404`], resolve)
  }])
})

export default router
