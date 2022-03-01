<template>
  <div class="supplier">
    <WtListView
      ref="wtListView"
      :show-search-toggle-btn="showSearchToggleBtn"
      search-str="valueMap"
      :search-data="searchData"
      :form-config="formConfig"
      :bar-btns="barBtns"
      :table-config="tableConfig"
      :request-config="requestConfig"
      :toolbar="toolbar"
      :table-export="tableExport"
      data-type="content"
      total-item="totalElements"
      :import-obj="{orgType: 'S'}"
      @handleClickBtn="handleClickBtn"
    >
      <template v-slot:fullName="{data}">
        <el-link @click="edit(data.row)">
          {{ data.row.fullName }}
        </el-link>
      </template>
    </WtListView>
  </div>
</template>
<script>
import { tableConfig, barBtns, formConfig, toolbar, tableExport } from './config/path'
import WtListView from '@/components/wt-list-view'
import { getPathList, deleteBatch, importExcel, getPathHeadList } from '@/api/modules/configure/path'
export default {
  name: 'PathConfigureList',
  components: {
    WtListView
  },
  data() {
    return {
      dialog: false,
      showSearchToggleBtn: true, // 查询按钮
      row: { // 每一行数据
        orgType: 'S',
        code: '',
        fullName: '',
        address: '',
        city: '',
        email: '',
        postCode: '',
        contact: '',
        tel: ''
      },
      searchData: { // 查询参数
        orgType: 'S'
      },
      // 搜索的配置
      formConfig,
      // 按钮
      barBtns,
      // 表格配置
      tableConfig,
      // 表格导出配置
      tableExport,
      // 请求配置
      requestConfig: {
        getTableData: getPathList,
        import: importExcel,
        batchDelete: deleteBatch,
        getTableHeadData: getPathHeadList
      },
      // 图标配置
      toolbar
    }
  },
  created() {
  },
  methods: {
    // 编辑按钮
    edit(row) {
      this.dialog = true
      this.row = row
    },
    // 顶部按钮
    handleClickBtn(type) {
      switch (type) {
        case 'add':
          this.$router.push({ name: 'PathConfigureAdd' })
          break

        default:
          break
      }
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
