import Vue from 'vue'
import msgboxVue from './main.vue'
import $i18n from '@/i18n'

let instance
const MessageBoxConstructor = Vue.extend(msgboxVue)

const initInstance = (options) => {
  // 获取msgboxVue实例
  instance = new MessageBoxConstructor({
    el: document.createElement('div'),
    data: options
  })
}
/**
 *
 * @param {*} options 配置项
 * @returns
 */
const MessageBox = function MessageBox(options) {
  if (Vue.prototype.$isServer) return
  if (JSON.stringify(options) === '{}') return
  if (typeof options.message !== 'string') options.message = JSON.stringify(options.message)
  if (!['warning', 'danger', 'primary'].includes(options.type)) throw new Error('组件的type类型必须为:' + ['warning', 'danger', 'primary'].join('、'))
  return new Promise((resolve, reject) => {
    if (!instance) {
      initInstance(options)
    }
    // for (const prop in options) {
    //   instance[prop] = options[prop]
    // }
    instance['cancelButtonText'] = $i18n.t(instance['cancelButtonText']) || $i18n.t('cancel')
    instance['confirmButtonText'] = $i18n.t(instance['confirmButtonText']) || $i18n.t('confirm')
    document.body.appendChild(instance.$el)
    Vue.nextTick(() => {
      instance.visible = true
    })
    instance.confirm = function confirm() {
      resolve('confirm')
      instance.visible = false
    }
    instance.cancel = function cancel() {
      reject('cancel')
      instance.visible = false
    }
  })
}

export default MessageBox
export { MessageBox }
