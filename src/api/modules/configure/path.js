import { requestForMock } from '../../service'
// 正式接口开发请使用 service 代替 requestForMock
const service = requestForMock

/* --------------------- 路径管理 ------------------------ */
/*
  不分页查询列表信息
*/
export function getPathAll(data) {
  return service({
    url: '/service1/tms-portal/route/all',
    method: 'post',
    data
  })
}

/*
  分页查询列表信息
*/
export function getPathList(data) {
  return service({
    url: '/service1/tms-portal/route/list',
    method: 'post',
    data
  })
}

/*
  批量删除
*/
export function deleteBatch(data) {
  return service({
    url: '/service1/tms-portal/route/deleteBatch',
    method: 'delete',
    data
  })
}

/*
  添加
*/
export function addPathList(data) {
  return service({
    url: '/service1/tms-portal/route/add',
    method: 'post',
    data
  })
}

/*
  导入模板
*/
export function importExcel(data) {
  return service({
    url: '/service1/tms-portal/route/importExcel',
    method: 'post',
    data
  })
}
