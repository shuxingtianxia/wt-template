import Upload from './packages/upload/index'
import TableDetail from './packages/table-detail/index'

const components = [
  Upload,
  TableDetail
]

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  version: '1.0.0',
  install
}
