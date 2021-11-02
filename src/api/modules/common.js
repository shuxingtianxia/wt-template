import { service } from '@/api/service'

/*
  通过字典码查询字典值数据
*/
export function getItemValue(params) {
  return service({
    url: '/service1/tms-portal/dictItem/getItemValue?dictName=' + params,
    method: 'get'
  })
}

/*
  通过字典码查询字典值数据
*/
export function getMoreDictItems(params) {
  return service({
    url: '/service1/tms-portal/dictItem/getMoreDictItems',
    method: 'get',
    params
  })
}

/*
  获取多个字典码的字典值数据
*/
export function getMoreItemValue(params) {
  return service({
    url: '/service1/tms-portal/dictItem/getMoreItemValue',
    method: 'get',
    params
  })
}

/*
  生成唯一编码
*/
export function getCommonCode() {
  return service({
    url: '/service1/tms-portal/common/code',
    method: 'get'
  })
}

/* ------------------- 附件 ------------------------- */

/*
  添加附件
*/
export function addEnclosure(data) {
  return service({
    url: '/service1/tms-portal/attach/add',
    method: 'post',
    data,
    processData: false
  })
}

/*
  删除附件
*/
export function delEnclosure(params) {
  return service({
    url: '/service1/tms-portal/attach/delete',
    method: 'get',
    params
  })
}

/*
  下载附件
*/
export function downloadEnclosure(params) {
  return service({
    url: '/service1/tms-portal/attach/download',
    method: 'get',
    params
  })
}

export const addPhoto = (data) => {
  return service({
    url: `/photo_add`,
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

// 获取七牛云token
export const getQiniuToken = () => {
  return service({
    url: `/getToken`,
    method: 'get'
  })
}
