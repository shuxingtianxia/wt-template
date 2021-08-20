import { service } from '@/api/service'

/* -------------------------- 审批流程 -------------------------------- */

/*
  获取审批列表
*/
export function getApproveList(data) {
  return service({
    url: '/service1/tms-portal/approve/list',
    method: 'post',
    data
  })
}

/*
  通过、驳回
*/
export function updateStatus(data) {
  return service({
    url: '/service1/tms-portal/approve/updateStatus',
    method: 'post',
    data
  })
}
