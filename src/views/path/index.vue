<template>
  <div class="supplier">
    <!-- <wt-message></wt-message> -->
    <el-button @click="handleBtn">
      阿尼牛
    </el-button>
    <WtListView
      ref="wtListView"
      :options="options"
      search-str="valueMap"
      :search-data="searchData"
      :form-config="formConfig"
      :bar-btns="barBtns"
      :table-config="tableConfig"
      :request-config="requestConfig"
      :table-export="tableExport"
      data-type="content"
      total-item="totalElements"
      :import-obj="{orgType: 'S'}"
      :request-head="true"
      :area-config="{selectCellByHeader: false}"
      :del-before-fn="delBeforeFn"
      :table-fn="tableFn"
      :table-header-fn="tableHeaderFn"
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
import { tableConfig, barBtns, formConfig, tableExport } from './config/path'
import WtListView from '@/components/wt-list-view'
import { getPathList, deleteBatch, importExcel, getPathHeadList } from '@/api/modules/configure/path'
export default {
  name: 'PathConfigureList',
  components: {
    WtListView
  },
  data() {
    return {
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
      }
    }
  },
  created() {
    Promise.all(['a', 'b'].map(item => getPathList(item))).then(res => { console.log(res) })
    // this.$wtMessage({
    //   message: '你好',
    //   type: 'primary',
    //   duration: 1000
    // })
    // this.$wtMessage({
    //   message: '你好',
    //   type: 'primary',
    //   duration: 1100
    // })
  },
  methods: {
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
    // 表头数据操作
    tableHeaderFn(headerData) {
      headerData.forEach(item => {
        this.$set(item, 'prop', item.value)
      })
      return headerData
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
