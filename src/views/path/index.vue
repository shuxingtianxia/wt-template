<template>
  <div class="supplier">
    <wt-button v-if="hasButtonPermission('info-add')" @click="handleBtn">
      {{ $t('common.hello') }}
    </wt-button>
    <el-button v-if="hasButtonPermission('info-edit')" style="height: 32px" type="primary" @click="handleBtn1">
      阿尼牛
    </el-button>
    <wt-button type="danger" @click="handleBtn2">
      阿尼牛
    </wt-button>
    <wt-list-view
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
    </wt-list-view>
  </div>
</template>
<script>
import { tableConfig, barBtns, formConfig, tableExport } from './config/path'
import { getPathList, deleteBatch, importExcel, getPathHeadList } from '@/api/modules/configure/path'
export default {
  name: 'PathConfigureList',
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
  methods: {
    handleBtn() {
      this.$msgbox({
        message: this.$t('cancel'),
        cancelButtonText: '$t(123)',
        confirmButtonText: 'cancel'
      })
      this.$wtMessage({
        message: this.$t('cancel'),
        assist: true, // 基础弹窗还是提示弹窗  // true 是提示弹窗
        type: 'warning',
        duration: 1100
      })
    },
    handleBtn1() {
      this.$wtMsgbox({
        message: '大家好',
        type: 'danger',
        confirmButtonText: 'cancel'
      })
    },
    handleBtn2() {
      this.$wtMessage.error('你好')
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
