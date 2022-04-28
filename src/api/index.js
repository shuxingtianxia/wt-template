import { assign } from 'lodash'
import log from '@/libs/util.log'
const files = require.context('./modules', false, /\.js$/)
const generators = files.keys().map(key => files(key).default)
// 预防api定义的名字一样
const keys = []
generators.forEach(item => {
  keys.push(...Object.keys(item))
})
const assignGenerators = assign({}, ...generators)
const len = Object.keys(assignGenerators).length
if (keys.length !== len) {
  log.danger('>>>>>>>>>>  api名字重复  >>>>>>>>>>')
}
export default assignGenerators
