import { service } from '../../service'

/* --------------------- 角色管理 ------------------------ */
/*
  获取角色列表
*/
export function getUserRoleListPage(data) {
  return service({
    url: '/service1/tms-portal/user/getUserRoleListPage',
    method: 'post',
    data
  })
}

/*
  获取角色列表
*/
export function getRoleAuth(params) {
  return service({
    url: '/service1/tms-portal/roleAuth/getRoleAuth',
    method: 'post',
    params
  })
}

/*
  保存角色列表
*/
export function saveRoleAuth(data) {
  return service({
    url: '/service1/tms-portal/roleAuth/saveRoleAuth',
    method: 'post',
    data
  })
}

/*
  获取当前用户的角色列表
*/
export function getUserRoleList() {
  return service({
    url: '/service1/tms-portal/user/getUserRoleList',
    method: 'post'
  })
}

/*
  获取敏感字段列表
*/
export function getSensitiveFieldList(params) {
  return service({
    url: '/service1/tms-portal/dataAuthField/sensitiveFieldList',
    method: 'get',
    params
  })
}

/*
  获取数据权限字段列表
*/
export function getAuthDataList(params) {
  return service({
    url: '/service1/tms-portal/dataAuth/authDataList',
    method: 'get',
    params
  })
}
