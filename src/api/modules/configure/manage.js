import { service } from '../../service'

/* --------------------- 出货管理 ------------------------ */
/*
  获取出货模块列表
*/
export function getManage(data) {
  return service({
    url: '/service1/tms-portal/deliver/list',
    method: 'post',
    data
  })
}

/*
  批量删除
*/
export function deleteBatch(data) {
  return service({
    url: '/service1/tms-portal/deliver/deleteBatch',
    method: 'delete',
    data
  })
}

/*
  导入模板
*/
export function importExcel(data) {
  return service({
    url: '/service1/tms-portal/deliver/importExcel',
    method: 'post',
    data
  })
}

/*
  保存模块列表
*/
export function saveManage(data) {
  return service({
    url: '/service1/tms-portal/deliver/save',
    method: 'post',
    data
  })
}

/*
  拼车
*/
export function saveCarpooling(data) {
  return service({
    url: '/service1/tms-portal/materialBom/group',
    method: 'post',
    data
  })
}

/*
  根据ID查询所有信息
*/
export function getDataInfo(id) {
  return service({
    url: `/service1/tms-portal/deliver/getDataInfo/${id}`,
    method: 'get'
  })
}

/*
  根据ID查询所有信息
*/
export function getDeliverDetailAll(data) {
  return service({
    url: `/service1/tms-portal/material/deliverDetail`,
    method: 'post',
    data
  })
}

/*
  根据ID查询所有信息
*/
export function getDeliverDetail(deliverId) {
  return service({
    url: `/service1/tms-portal/material/deliverDetail/${deliverId}`,
    method: 'get'
  })
}

/* --------------------- 进货管理 -------------------------- */

/*
  分页查询列表信息
*/
export function getPurchaseList(data) {
  return service({
    url: `/service1/tms-portal/receive/list`,
    method: 'post',
    data
  })
}

/*
  导入模板
*/
export function importExcelPurchase(data) {
  return service({
    url: `/service1/tms-portal/receive/importExcel`,
    method: 'post',
    data
  })
}

/*
  批量删除
*/
export function deleteBatchPurchase(data) {
  return service({
    url: `/service1/tms-portal/receive/deleteBatch`,
    method: 'delete',
    data
  })
}

/*
  分页查询列表信息
*/
export function savePurchase(data) {
  return service({
    url: `/service1/tms-portal/receive/save`,
    method: 'post',
    data
  })
}

/*
  详情
*/
export function getPurchase(id) {
  return service({
    url: `/service1/tms-portal/receive/getDataInfo/${id}`,
    method: 'get'
  })
}
