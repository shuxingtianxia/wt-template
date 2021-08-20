import { service } from '../../service'
/*
  获取模块列表
*/
export function getModuleList(data) {
  return service({
    url: '/service1/tms-portal/dataAuthField/list',
    method: 'post',
    data
  })
}

/*
  保存模块列表
*/
export function updateModuleList(data) {
  return service({
    url: '/service1/tms-portal/dataAuthField/update',
    method: 'post',
    data
  })
}

/*
  删除模块列表
*/
export function deleteModuleList(data) {
  return service({
    url: '/service1/tms-portal/dataAuthField/delete',
    method: 'post',
    data
  })
}
