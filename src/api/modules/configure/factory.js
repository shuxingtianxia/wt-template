
import { postAction, putAction, deleteAction } from '@/api'

export default {
  getFactoryList: (data) => postAction({ url: '/factoryWarehouse/list', data }), // 分页获取模块列表
  getFactoryAll: (data) => postAction({ url: '/factoryWarehouse/all', data }), // 不分页获取模块列表
  addFactoryList: (data) => postAction({ url: '/factoryWarehouse/add', data }), // 添加模块列表
  editFactoryList: (data) => putAction({ url: '/factoryWarehouse/edit', data }), // 编辑模块列表
  importExcel: (data) => postAction({ url: '/factoryWarehouse/importExcel', data }), // 编辑模块列表
  batchDeleteFactory: (data) => deleteAction({ url: '/factoryWarehouse/deleteBatch', data }) // 导入模块列表
}
