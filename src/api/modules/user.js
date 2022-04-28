import { getAction, getBlobProgress } from '@/api/axios'

export default {
  login: (params) => getAction({ url: '/service1/tms-portal/user/login', params }), // 登录
  checkCode: (id) => getBlobProgress({ url: `/service1/tms-portal/user/checkCode/${id}` }), // 获取验证码
  getMenuList: () => getAction({ url: `/service1/tms-portal/user/getMenuList` }), // 获取当前用户拥有的菜单权限
  getButtonList: () => getAction({ url: `/service1/tms-portal/user/getButtonList` }), // 获取当前用户拥有的按钮权限
  forget: (params) => getAction({ url: `/service1/tms-portal/user/retrievePassword`, params }), // 忘记密码
  logout: () => getAction({ url: `/service1/tms-portal/user/logout` }), // 退出登录
  refeshToken: () => getAction({ url: `/service1/tms-portal/user/refresh/token` }) // 刷新token
}
