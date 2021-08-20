/*  表格自动高度
    1.Table ref="table" :height="tableHeight"
    2. Page ref="page"
    3. placement="top" 分页下拉往上显示
    4. 表格高度 = 浏览器高度 - table 距离顶端高度 - page高度 - 预留高度
    5. 组件内使用： mixins: [mixin]
 */

import _ from 'lodash'

// 定义一个混入对象
const mixin = {
  data() {
    return {
      tableHeight: 0 // 默认初始高度 300px;
    }
  },
  mounted() {
    // 初始化设置高度
    this.setTableHeight()

    // 页面缩放调整高度
    window.addEventListener('resize', this.setTableHeight, false) // 冒泡阶段
  },
  destroyed() {
    window.removeEventListener('resize', this.setTableHeight, false)
  },
  methods: {
    // 自动设置表格高度 debounced（防抖)
    setTableHeight: _.debounce(function() {
      // 浏览器高度
      var browserH = document.documentElement.offsetHeight || document.body.offsetHeight
      // table 距离页面高度
      var tableTopH = this.$refs.vxeTable.$el.getBoundingClientRect().top
      // page 高度
      var pageH = this.$refs.page.$el.getBoundingClientRect().height
      // var pageH = 24
      // 表格高度 === 浏览器高度 - table 距离顶端高度 - page高度 -  预留高度
      this.tableHeight = browserH - tableTopH - pageH - 10
    }, 150)
  }
}

export default mixin
