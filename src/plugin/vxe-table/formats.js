
import VXETable from 'vxe-table'

import common from './format/common'
import dataAccess from './format/dataAccess'

/**
 * 格式化单元格
 */
VXETable.formats.mixin({
  ...common,
  ...dataAccess
})
