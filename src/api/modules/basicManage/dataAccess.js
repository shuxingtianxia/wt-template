import { requestForMock } from '@/api/service'
// 正式接口开发请使用 service 代替 requestForMock
const service = requestForMock
/*
  获取数据权限列表
*/
export function getDataAuthList(data) {
  return service({
    url: '/dataAuth/list',
    method: 'post',
    data
  })
}

/*
  获取数据权限列表
*/
export function queryByMod(params) {
  return service({
    url: '/dataAuthField/queryByMod',
    method: 'get',
    params
  })
}

/*
  创建数据权限
*/
export function addDataAuth(data) {
  return service({
    url: '/dataAuth/add',
    method: 'post',
    data
  })
}

/*
  数据权限详情
*/
export function dataAuthDetail(params) {
  return service({
    url: '/dataAuth/echo',
    method: 'get',
    params
  })
}

/*
  删除数据权限
*/
export function delDataAuth(data) {
  return service({
    url: '/dataAuth/delete',
    method: 'post',
    data
  })
}
