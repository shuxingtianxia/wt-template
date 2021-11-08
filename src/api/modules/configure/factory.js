import { requestForMock } from '../../service'

// 正式接口开发请使用 service 代替 requestForMock
const service = requestForMock

/* --------------------- 工厂和仓库管理 ------------------------ */
/*
  分页获取模块列表
*/
export function getFactoryList(data) {
  return service({
    url: '/factoryWarehouse/list',
    method: 'post',
    data
  })
}

/*
  不分页获取模块列表
*/
export function getFactoryAll(data) {
  return service({
    url: '/factoryWarehouse/all',
    method: 'post',
    data
  })
}

/*
  添加模块列表
*/
export function addFactoryList(data) {
  return service({
    url: '/factoryWarehouse/add',
    method: 'post',
    data
  })
}

/*
  编辑模块列表
*/
export function editFactoryList(data) {
  return service({
    url: '/factoryWarehouse/edit',
    method: 'put',
    data
  })
}

/*
  导入模块列表
*/
export function importExcel(data) {
  return service({
    url: '/factoryWarehouse/importExcel',
    method: 'post',
    data
  })
}

/*
  导入模块列表
*/
export function batchDeleteFactory(data) {
  return service({
    url: '/factoryWarehouse/deleteBatch',
    method: 'delete',
    data
  })
}
