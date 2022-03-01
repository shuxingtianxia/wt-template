import WtUpload from './src/main'

/* istanbul ignore next */
WtUpload.install = function install(Vue) {
  Vue.component(WtUpload.name, WtUpload)
}

export default WtUpload
