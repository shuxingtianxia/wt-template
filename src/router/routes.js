import layoutHeaderAside from '@/layout'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    component: layoutHeaderAside,
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'route.dashboard', icon: 'dashboard', affix: true }
      },
      {
        path: 'log',
        name: 'log',
        hidden: true,
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      }
    ]
  },
  {
    path: '/path',
    name: 'Path',
    component: layoutHeaderAside,
    meta: { title: 'route.systemManage', icon: 'dashboard' },
    children: [
      {
        path: 'list',
        component: _import('path'),
        name: 'PathConfigureList',
        meta: { title: 'inl8111', icon: 'dashboard', cache: true }
      },
      {
        path: 'add',
        component: _import('path/add'),
        name: 'PathConfigureAdd',
        hidden: true,
        meta: { title: 'route.systemManage', icon: 'dashboard', cache: true }
      },
      {
        path: 'edit',
        component: _import('path/edit'),
        name: 'PathConfigureEdit',
        meta: { title: '编辑', icon: 'dashboard', cache: true }
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('login/index')
  },
  // 刷新页面 必须保留
  {
    path: '/refresh',
    name: 'refresh',
    hidden: true,
    component: _import('system/function/refresh')
  }
]

/**
 * 错误页面
 */
// const errorPage = [
//   {
//     path: '*',
//     name: '404',
//     component: _import('system/error/404')
//   }
// ]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut
  // ...errorPage
]
