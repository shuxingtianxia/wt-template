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
      data-type="content"
      total-item="totalElements"
      :import-obj="{orgType: 'S'}"
      @handleClickBtn="handleClickBtn"
    >
      <template v-slot:formSearch>
        <el-button type="primary" @click="getResourcekey">
          获取资源key
        </el-button>
      </template>
    </WtListView>
    <Add ref="add" :form="form"></Add>
  </div>
</template>
<script>
import { tableConfig, barBtns, formConfig, toolbar } from './config'
import WtListView from '@/components/wt-list-view'
import { getPathList, deleteBatch, importExcel } from '@/api/modules/configure/path'
import { getResourcesKey } from '@/api/modules/i18n/i18n'
import Add from './dialog/add.vue'
export default {
  name: 'PathConfigureList',
  components: {
    WtListView,
    Add
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
        resourcekey: '',
        resourcevalue: ''
      },
      // 搜索的配置
      formConfig,
      // 按钮
      barBtns,
      // 表格配置
      tableConfig,
      // 请求配置
      requestConfig: {
        getTableData: getPathList,
        import: importExcel,
        batchDelete: deleteBatch
      },
      // 图标配置
      toolbar,
      form: {} // 弹窗的值
    }
  },
  created() {
    this.$bus.$on('handleFormData', (val) => {
      this.searchData = val
    })
  },
  methods: {
    // 获取资源key
    getResourcekey() {
      if (!this.searchData.resourcevalue) return this.$message.warning('请输入资源value')
      getResourcesKey({ chinessStr: this.searchData.resourcevalue }).then(res => {
        this.$set(this.searchData, 'resourcekey', res)
      })
    },
    // 顶部按钮
    handleClickBtn(type) {
      switch (type) {
        case 'add':
          this.form = {
            title: '新增资源',
            resourcekey: '',
            resourcevalue: '',
            resourcetype: '',
            language: ''
          }
          this.$refs.add.dialog = true
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
