import { request } from 'wingtech-ui/src/api/service'
// 正式接口开发请使用 service 代替 requestForMock
const service = request

/*
  批量删除
*/
export function deleteBatch(data) {
  return service({
    url: '/route/deleteBatch',
    method: 'delete',
    data
  })
}

/*
  导入模板
*/
export function importExcel(data) {
  return service({
    url: '/route/importExcel',
    method: 'post',
    data
  })
}
// 获取表格数据
export function getHistoryList(data, tableData) {
  return service({
    url: '/api/cooperated/api/forecast/queryPage',
    method: 'post',
    data,
    params: tableData,
    noEnvUrl: true
  })
}

// 获取表头
export function getFieldList(params) {
  return service({
    url: '/api/base/api/view/field/list',
    method: 'get',
    params,
    noEnvUrl: true
  })
}

// 获取视图
export function getViewList(data) {
  return service({
    url: '/api/base/api/view/list',
    method: 'post',
    data,
    noEnvUrl: true
  })
}

// 删除视图
export function delView(params) {
  return service({
    url: '/api/base/api/view/delete',
    method: 'delete',
    params,
    noEnvUrl: true
  })
}

// 新增视图
export function addView(data) {
  return service({
    url: '/api/base/api/view/field/add',
    method: 'post',
    data,
    noEnvUrl: true
  })
}

// 编辑视图
export function editView(data) {
  return service({
    url: '/api/base/api/view/field/edit',
    method: 'put',
    data,
    noEnvUrl: true
  })
}
