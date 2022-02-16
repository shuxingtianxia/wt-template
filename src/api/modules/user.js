import { requestForMock } from '@/api/service'
// 正式接口开发请使用 service 代替 requestForMock
const service = requestForMock
/*
  登录
*/
export function login(params) {
  return service({
    url: '/service1/tms-portal/user/login',
    method: 'get',
    params
  })
}

/*
  获取验证码
*/
export function checkCode(id) {
  return service({
    url: `/service1/tms-portal/user/checkCode/${id}`,
    method: 'get',
    responseType: 'blob'
  })
}

/*
  获取当前用户拥有的菜单
*/
export function getMenuList() {
  return service({
    url: `/service1/tms-portal/user/getMenuList`,
    method: 'get'
  })
}

/*
  获取当前用户拥有的按钮
*/
export function getButtonList() {
  return service({
    url: `/service1/tms-portal/user/getButtonList`,
    method: 'get'
  })
}

/*
  忘记密码
*/
export function forget(params) {
  return service({
    url: `/service1/tms-portal/user/retrievePassword`,
    method: 'get',
    params
  })
}

/*
  退出登录
*/
export function logout() {
  return service({
    url: `/service1/tms-portal/user/logout`,
    method: 'get'
  })
}

/*
  刷新token
*/
export function refeshToken() {
  return service({
    url: `/service1/tms-portal/user/refresh/token`,
    method: 'get'
  })
}
