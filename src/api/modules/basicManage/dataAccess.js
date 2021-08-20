import { service } from '@/api/service'
/*
  获取数据权限列表
*/
export function getDataAuthList(data) {
  return service({
    url: '/service1/tms-portal/dataAuth/list',
    method: 'post',
    data
  })
}

/*
  获取数据权限列表
*/
export function queryByMod(params) {
  return service({
    url: '/service1/tms-portal/dataAuthField/queryByMod',
    method: 'get',
    params
  })
}

/*
  创建数据权限
*/
export function addDataAuth(data) {
  return service({
    url: '/service1/tms-portal/dataAuth/add',
    method: 'post',
    data
  })
}

/*
  数据权限详情
*/
export function dataAuthDetail(params) {
  return service({
    url: '/service1/tms-portal/dataAuth/echo',
    method: 'get',
    params
  })
}

/*
  删除数据权限
*/
export function delDataAuth(data) {
  return service({
    url: '/service1/tms-portal/dataAuth/delete',
    method: 'post',
    data
  })
}
