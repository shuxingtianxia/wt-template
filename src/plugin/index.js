import Vue from 'vue'

// 核心插件
import d2Admin from '@/plugin/d2admin'
// 导入表格
import pluginImport from '@d2-projects/vue-table-import'

// 闻泰内部组件
import WtUi from 'wingtech-ui'
import 'wingtech-ui/lib/index.css'
// 引入element、vxe-table、sso路径、下载、上传、删除文件、$api、eventBus(用于无关系组件间的通信)
import 'wingtech-ui/src/plugin'

// vxe-table的格式化
import './vxe-table/formats'

// mock数据
import '@/api/mock/index'

// 检验数据类型
import '@/utils/toType'

Vue.use(pluginImport)
// 核心插件
Vue.use(d2Admin)
// 闻泰内部组件
Vue.use(WtUi)

