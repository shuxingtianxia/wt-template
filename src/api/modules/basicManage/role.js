import { request } from '../../service'

/* --------------------- 角色管理 ------------------------ */
/*
  获取角色列表
*/
export function getUserRoleListPage(data) {
  return request({
    url: '/user/getUserRoleListPage',
    method: 'post',
    data
  })
}

/*
  获取角色列表
*/
export function getRoleAuth(params) {
  return request({
    url: '/roleAuth/getRoleAuth',
    method: 'post',
    params
  })
}

/*
  保存角色列表
*/
export function saveRoleAuth(data) {
  return request({
    url: '/roleAuth/saveRoleAuth',
    method: 'post',
    data
  })
}

/*
  获取当前用户的角色列表
*/
export function getUserRoleList() {
  return request({
    url: '/user/getUserRoleList',
    method: 'post'
  })
}

/*
  获取敏感字段列表
*/
export function getSensitiveFieldList(params) {
  return request({
    url: '/dataAuthField/sensitiveFieldList',
    method: 'get',
    params
  })
}

/*
  获取数据权限字段列表
*/
export function getAuthDataList(params) {
  return request({
    url: '/dataAuth/authDataList',
    method: 'get',
    params
  })
}
