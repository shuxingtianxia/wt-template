import { request } from '@/api/service'

const service = request

/*
  获取资源key
*/
export const getResourcesKey = (params) => {
  return service({
    url: '/i18n/createI18nKey',
    params,
    noEnvUrl: true
  })
}

/*
  添加
*/
export function addPathList(data) {
  return service({
    url: '/add',
    method: 'post',
    data
  })
}
