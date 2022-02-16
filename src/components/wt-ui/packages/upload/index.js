import WtUpload from './src/upload'

/* istanbul ignore next */
WtUpload.install = function(Vue) {
  Vue.component(WtUpload.name, WtUpload)
}

export default WtUpload
