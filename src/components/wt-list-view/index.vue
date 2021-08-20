<template>
  <div class="">
    <wt-search
      v-if="formConfig.length > 0"
      ref="list-search"
      :form-config="formConfig"
      :search-data="searchData"
      :options="options"
      :show-search-toggle-btn="showSearchToggleBtn"
      @submit="searchSubmit"
    >
      <slot slot="formButton" name="formSearch"></slot>
    </wt-search>
    <BasicTable
      ref="basicTable"
      :table-args="tableArgs"
      :is-view="true"
      v-bind="$attrs"
      @handleClickBtn="handleClickBtn"
      @getSelectedList="getSelectedList"
    >
      <!-- slot对应的是子组件的name名称，name对应的是父组件的插槽名称 -->
      <slot slot="slot1" slot-scope="scope" :data="scope.data.scope" :name="scope.data.name"></slot>
    </BasicTable>
  </div>
</template>
<script>
import WtSearch from '@/components/wt-search'
import BasicTable from '@/components/wt-table/basic-table'
// import WtGird from '@/components/wt-table/wt-gird'
export default {
  name: '',
  components: {
    WtSearch,
    BasicTable
    // WtGird
  },
  props: {
    showSearchToggleBtn: { // 显示查看更多
      type: Boolean,
      default: true
    },
    searchData: { // 查询的数据
      type: Object,
      default: () => ({})
    },
    formConfig: { // 查询的配置
      type: Array,
      default: () => []
    },
    options: { // 下拉列表
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      tableArgs: { ...this.searchData },
      selectedList: [] // 选中的值
    }
  },
  created() {
    // 方便其他组件调用请求表格接口
    this.$bus.$on('getTableList', () => {
      this.$refs.basicTable.getTableList()
    })
  },
  methods: {
    // 搜索
    searchSubmit(formData) {
      this.$emit('search-submit', formData)
      this.$refs.basicTable.pagination.currentPage = 1
      this.tableArgs = { ...formData }
    },
    // 表格的多选框
    getSelectedList(records) {
      this.selectedList = records
      this.$emit('getSelectedList', this.selectedList)
    },
    search() {
      console.log('this.searchData', this.searchData)
    },
    handleKeydown(field, e, value) {
      this.searchData[field.key] = value
    },
    handleBlur(field, e, value) {
      this.searchData[field.key] = value
    },
    // 点击顶部的按钮
    handleClickBtn(type) {
      this.$emit('handleClickBtn', type)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
