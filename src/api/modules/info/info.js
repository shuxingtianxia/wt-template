import { getAction, postAction, putAction, deleteAction } from '@/api'
export default {
  getProjectInfoList: (data) => postAction({ url: '/projectInfo/list', data }), // 获取数据权限列表
  addProjectInfo: (data) => postAction({ url: '/projectInfo/add', data }), // 添加数据权限列表
  editProjectInfo: (data) => putAction({ url: '/projectInfo/edit', data }), // 添加数据权限列表
  delProjectInfo: (data) => deleteAction({ url: '/projectInfo/deleteBatch', data }), // 删除数据权限列表
  projectInfoDetail: (id) => getAction({ url: `/projectInfo/getDataInfo/${id}` }), // 数据权限详情
  importExcel: (data) => postAction({ url: `/projectInfo/importExcel`, data }), // 导入数据权限
  projectInfoNextStage: (id) => postAction({ url: `/projectInfo/nextStage/${id}` }), // 变更到下一阶段
  projectInfoDelayInfo: (data) => postAction({ url: `/projectInfo/delayInfo`, data }) // 变更到下一阶段

}
