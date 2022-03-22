import WtUpload from './src/main'

WtUpload.install = function install(Vue) {
  Vue.component(WtUpload.name, WtUpload)
}

export default WtUpload
