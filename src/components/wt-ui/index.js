import Upload from './packages/upload/index'
import TableDetail from './packages/table-detail/index'
import MessageBox from './packages/message-box/index'
import Message from './packages/message/index'
import Button from './packages/button/index'

const components = [
  Upload,
  TableDetail,
  MessageBox,
  Message,
  Button
]

const install = function install(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
  Vue.prototype.$wtMsgbox = MessageBox
  Vue.prototype.$wtMessage = Message
}

export default {
  version: '1.0.0',
  install
}

