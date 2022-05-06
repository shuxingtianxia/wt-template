import { getAction, postAction, postFileAction, getBlobProgress } from '@/api/index'
export default {
  getItemValue: (params) => getAction({ url: '/dictItem/getItemValue', params }), // 通过字典码查询字典值数据
  getMoreDictItems: (params) => getAction({ url: '/dictItem/getMoreDictItems', params }), // 一次性获取多个字典表的值
  getMoreItemValue: (params) => getAction({ url: '/dictItem/getMoreItemValue', params }), // 获取多个字典码的字典值数据
  getCommonCode: () => getAction({ url: '/common/code' }), // 获取多个字典码的字典值数据
  /* ------------------- 附件 ------------------------- */
  addEnclosure: (data) => postFileAction({ url: '/attach/add', data }), // 添加附件
  delEnclosure: (params) => getAction({ url: '/attach/delete', params }), // 删除附件
  downloadEnclosure: (params) => getBlobProgress({ url: '/attach/download', params }), // 下载附件
  addPhoto: (data) => postAction({ url: `/photo_add`, defineHeader: { headers: { 'Content-Type': 'multipart/form-data' }}}), // 添加图片
  getQiniuToken: () => getAction({ url: `/getToken` }) // 获取七牛云token
}
