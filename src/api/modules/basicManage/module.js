import { request } from '@/api/service'
/*
  获取模块列表
*/
export function getModuleList(data) {
  return request({
    url: '/dataAuthField/list',
    method: 'post',
    data
  })
}

/*
  保存模块列表
*/
export function updateModuleList(data) {
  return request({
    url: '/dataAuthField/update',
    method: 'post',
    data
  })
}

/*
  删除模块列表
*/
export function deleteModuleList(data) {
  return request({
    url: '/dataAuthField/delete',
    method: 'post',
    data
  })
}
