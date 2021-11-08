import { request } from '@/api/service'

/*
  通过字典码查询字典值数据
*/
export function getItemValue(params) {
  return request({
    url: '/dictItem/getItemValue?dictName=' + params,
    method: 'get'
  })
}

/*
  通过字典码查询字典值数据
*/
export function getMoreDictItems(params) {
  return request({
    url: '/dictItem/getMoreDictItems',
    method: 'get',
    params
  })
}

/*
  获取多个字典码的字典值数据
*/
export function getMoreItemValue(params) {
  return request({
    url: '/dictItem/getMoreItemValue',
    method: 'get',
    params
  })
}

/*
  生成唯一编码
*/
export function getCommonCode() {
  return request({
    url: '/common/code',
    method: 'get'
  })
}

/* ------------------- 附件 ------------------------- */

/*
  添加附件
*/
export function addEnclosure(data) {
  return request({
    url: '/attach/add',
    method: 'post',
    data,
    processData: false
  })
}

/*
  删除附件
*/
export function delEnclosure(params) {
  return request({
    url: '/attach/delete',
    method: 'get',
    params
  })
}

/*
  下载附件
*/
export function downloadEnclosure(params) {
  return request({
    url: '/attach/download',
    method: 'get',
    params
  })
}

export const addPhoto = (data) => {
  return request({
    url: `/photo_add`,
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

// 获取七牛云token
export const getQiniuToken = () => {
  return request({
    url: `/getToken`,
    method: 'get'
  })
}
