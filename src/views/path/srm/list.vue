<template>
  <div class="supplier">
    <wt-list-view
      ref="wtListView"
      :options="options"
      :search-data="searchData"
      :form-config="formConfig"
      :bar-btns="barBtns"
      :table-config="tableConfig"
      :request-config="requestConfig"
      :table-export="tableExport"
      data-type="dataList"
      total-item="totalCount"
      :import-obj="{orgType: 'S'}"
      :area-config="{selectCellByHeader: false}"
      :fn-config="fnConfig"
      :selected-list.sync="selectedList"
      :request-head="true"
      :request-search="requestSearch"
      :head-config="headConfig"
      @handleClickBtn="handleClickBtn"
    >
      <!-- <template v-slot>
        <el-button type="primary">anni</el-button>
      </template> -->
      <template v-slot:fullName="{data}">
        <el-link @click="edit(data.row)">
          {{ data.row.fullName }}
        </el-link>
      </template>
    </wt-list-view>
  </div>
</template>
<script>
import { tableConfig, barBtns, formConfig, tableExport } from './config/config'
import { getHistoryList, deleteBatch, importExcel, getViewList, getFieldList, delView, addView, editView } from '@/api/modules/srm/srm'
export default {
  name: 'VmListView',
  data() {
    return {
      selectedList: [],
      searchData: { // 查询参数
        business: 'srm_qualification_header',
        tableCode: 'srmQualificationHeaderBuyer'
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
        getTableData: getHistoryList,
        import: importExcel,
        batchDelete: deleteBatch,
        getTableHeadData: getFieldList,
        getViewList,
        delView,
        addView,
        editView
      },
      options: {
        code1: [
          {
            text: '广东',
            value: '440'
          },
          {
            text: '湖南',
            value: '550'
          },
          {
            text: '江西',
            value: '660'
          }
        ]
      },
      requestSearch: {
        tableData: {
          business: 'srm_fcst',
          tableCode: 'srmFcst'
        },
        viewHeadData: {
          tableCode: 'srmFcst'
        },
        viewData: {
          business: 'srm_fcst',
          formName: 'srmFcst'
        }
      },
      headConfig: {
        label: 'displayName',
        prop: 'fieldName'
      },
      fnConfig: {
        tableFn: this.tableFn,
        delBeforeFn: this.delBeforeFn
      }
    }
  },
  watch: {
    selectedList() {
      // console.log('this.selectedList', this.selectedList)
    }
  },
  created() {
  },
  methods: {
    // 編輯视图函数
    editViewFn(done) {
      console.log('done', done)
      done()
    },
    handleBtn() {
      this.$wtMessage({
        message: '你好',
        assist: true,
        type: 'warning',
        duration: 1100
      })
      this.$message({
        message: 'nihao',
        duration: 1100
      })
    },
    // 前端接收接口的数据后操作
    tableFn(tableData) {
      tableData.forEach((item, index) => {
        item.code = index
      })
      return tableData
    },
    // 删除前操作
    delBeforeFn(selectedList) {
      const flag = selectedList.every(item => item.code === 0 && item && item.fromFactoryCode === 'V1500')
      return flag
    },
    // 编辑按钮
    edit(row) {
      this.dialog = true
      this.row = row
    },
    // 顶部按钮
    handleClickBtn(type) {
      switch (type) {
        case 'add':
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
