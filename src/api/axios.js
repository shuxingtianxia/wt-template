import { request } from './service'
import Vue from 'vue'
const vue = new Vue()

// get请求
export function getAction({ url, params, defineHeader = {}}) {
  const body = {
    url,
    method: 'get',
    params
  }
  if (JSON.stringify(defineHeader) !== '{}') {
    Object.assign(body, defineHeader)
  }
  return request(body)
}

// post 请求
export function postAction({ url, data, params, defineHeader = {}}) {
  const body = {
    url,
    method: 'post',
    data,
    params
  }
  if (JSON.stringify(defineHeader) !== '{}') {
    Object.assign(body, defineHeader)
  }
  return request(body)
}

// post表单提交数据
export function postFormAction({ url, data, params }) {
  return request({
    url,
    method: 'post',
    data,
    params,
    transformRequest: [function(res) {
      let ret = ''
      for (const it in res) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(res[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// put请求
export function putAction({ url, data, params }) {
  return request({
    url,
    method: 'put',
    data,
    params
  })
}

// delete请求
export function deleteAction({ url, data, params }) {
  return request({
    url,
    method: 'delete',
    data,
    params
  })
}

// getBlob （下载文件有进度条）
export function getBlobProgress({ url, params, defineHeader = {}}) {
  const body = {
    url,
    method: 'get',
    params,
    onDownloadProgress: progressEvent => {
      const complete = progressEvent.loaded / progressEvent.total * 100 | 0
      vue.$progress(complete)
    },
    responseType: 'blob'
  }
  if (JSON.stringify(defineHeader) !== '{}') {
    Object.assign(body, defineHeader)
  }
  return request(body)
}

// getBlob（下载文件无进度条）
export function getBlob({ url, params, defineHeader = {}}) {
  const body = {
    url,
    method: 'get',
    params,
    onDownloadProgress: progressEvent => {
      const complete = progressEvent.loaded / progressEvent.total * 100 | 0
      vue.$progress(complete)
    },
    responseType: 'blob'
  }
  if (JSON.stringify(defineHeader) !== '{}') {
    Object.assign(body, defineHeader)
  }
  return request(body)
}

// postBlob （下载文件有进度条）
export function postBlob({ url, data, params, defineHeader = {}}) {
  const body = {
    url,
    method: 'get',
    data,
    params,
    onDownloadProgress: progressEvent => {
      const complete = progressEvent.loaded / progressEvent.total * 100 | 0
      vue.$progress(complete)
    },
    responseType: 'blob'
  }
  if (JSON.stringify(defineHeader) !== '{}') {
    Object.assign(body, defineHeader)
  }
  return request(body)
}

// post （上传文件有进度条）
export function postFileAction({ url, data, defineHeader = {}}) {
  const body = {
    url,
    method: 'post',
    data,
    onUploadProgress: progressEvent => {
      const complete = progressEvent.loaded / progressEvent.total * 100 | 0
      vue.$progress(complete)
    }
  }
  if (JSON.stringify(defineHeader) !== '{}') {
    Object.assign(body, defineHeader)
  }
  return request(body)
}

