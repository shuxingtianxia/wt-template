import { service } from '../../service'

/* --------------------- 组织管理 ------------------------ */
/*
  分页获取模块列表
*/
export function getOrganizeList(data) {
  return service({
    url: '/service1/tms-portal/organize/list',
    method: 'post',
    data
  })
}

/*
  不分页获取模块列表
*/
export function getOrganizeAllList(data) {
  return service({
    url: '/service1/tms-portal/organize/all',
    method: 'post',
    data
  })
}

/*
  添加模块
*/
export function addOrganize(data) {
  return service({
    url: '/service1/tms-portal/organize/add',
    method: 'post',
    data
  })
}

/*
  编辑模块
*/
export function editOrganize(data) {
  return service({
    url: '/service1/tms-portal/organize/edit',
    method: 'put',
    data
  })
}

/*
  批量添加模块
*/
export function addBatchOrganize(data) {
  return service({
    url: '/service1/tms-portal/organize/addBatch',
    method: 'post',
    data
  })
}

/*
  导入Excel数据
*/
export function importExcel(data, orgType) {
  return service({
    url: `/service1/tms-portal/organize/importExcel`,
    method: 'post',
    params: orgType,
    data
  })
}

/*
  批量删除
*/
export function deleteBatch(data) {
  return service({
    url: `/service1/tms-portal/organize/deleteBatch`,
    method: 'delete',
    data
  })
}
