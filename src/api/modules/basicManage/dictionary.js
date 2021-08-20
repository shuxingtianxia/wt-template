import { service } from '../../service'
/*
  获取树形列表
*/
export function getTreeList() {
  return service({
    url: '/service1/tms-portal/dict/treeList',
    method: 'get'
  })
}

/*
  添加字典表
*/
export function addDict(data) {
  return service({
    url: '/service1/tms-portal/dict/add',
    method: 'post',
    data
  })
}

/*
  修改字典表
*/
export function editDict(data) {
  return service({
    url: '/service1/tms-portal/dict/edit',
    method: 'put',
    data
  })
}

/*
  修改字典表
*/
export function delDict(params) {
  return service({
    url: '/service1/tms-portal/dict/delete',
    method: 'delete',
    params
  })
}

/*
  字典值分页查询
*/
export function getDictItemList(data) {
  return service({
    url: '/service1/tms-portal/dictItem/list',
    method: 'post',
    data
  })
}

/*
  字典值分页查询
*/
export function addOrEditOrDeleteDict(data) {
  return service({
    url: '/service1/tms-portal/dictItem/addOreditOrdelete',
    method: 'post',
    data
  })
}
