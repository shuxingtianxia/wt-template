import { request } from '@/api/service'
/*
  获取树形列表
*/
export function getTreeList() {
  return request({
    url: '/dict/treeList',
    method: 'get'
  })
}

/*
  添加字典表
*/
export function addDict(data) {
  return request({
    url: '/dict/add',
    method: 'post',
    data
  })
}

/*
  修改字典表
*/
export function editDict(data) {
  return request({
    url: '/dict/edit',
    method: 'put',
    data
  })
}

/*
  修改字典表
*/
export function delDict(params) {
  return request({
    url: '/dict/delete',
    method: 'delete',
    params
  })
}

/*
  字典值分页查询
*/
export function getDictItemList(data) {
  return request({
    url: '/dictItem/list',
    method: 'post',
    data
  })
}

/*
  字典值分页查询
*/
export function addOrEditOrDeleteDict(data) {
  return request({
    url: '/dictItem/addOreditOrdelete',
    method: 'post',
    data
  })
}
