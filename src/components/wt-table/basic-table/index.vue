<template>
  <div class="basic-table" :class="isFullDisplay?'full-display':''">
    <!-- 顶部的按钮或者图标 -->
    <vxe-toolbar v-if="JSON.stringify(toolbar) !== '{}' || barBtns.length" ref="xToolbar" perfect v-bind="toolbar">
      <!-- 右边图标 -->
      <template v-slot:tools>
        <!-- 删除 -->
        <vxe-button v-if="toolbar.edit" icon="fa fa-edit" class="is--circle" @click="handle('editView')"></vxe-button>
        <vxe-button v-if="toolbar.delete" icon="fa fa-trash-o" class="is--circle" @click="handle('deleteView')"></vxe-button>
        <!--<vxe-button icon="vxe-icon&#45;&#45;upload" class="is&#45;&#45;circle" :title="$t('view.upload')" @click="handle('import')">
            </vxe-button>-->
        <template v-if="toolbar.fullScreen">
          <vxe-button v-if="!isFullDisplay" icon="vxe-icon--zoomin" class="is--circle" title="全屏" @click="switchFull"></vxe-button>
          <vxe-button v-else icon="vxe-icon--zoomout" class="is--circle" title="取消全屏" @click="switchFull"></vxe-button>
        </template>
      </template>
      <!-- 左边按钮 -->
      <template v-slot:buttons>
        <template v-for="(item, index) in barBtns">
          <vxe-button v-if="item.clickType !== 'tableImport' && (item.code ? hasButtonPermission(item.code) : true)" :key="index" :icon="'fa ' + item.icon" :status="item.type" :loading="loading" @click="handleClickBtn(item)">
            {{ item.text }}
          </vxe-button>
          <!-- 先下载表格到本地，再上传到服务器 -->
          <el-upload v-if="item.clickType === 'tableImport' && (item.code ? hasButtonPermission(item.code) : true)" :key="index" :before-upload="handleUpload" action="default" class="upload">
            <vxe-button :icon="'fa ' + item.icon" :status="item.type" :loading="loading">
              {{ item.text }}
            </vxe-button>
          </el-upload>
        </template>
      </template>
    </vxe-toolbar>
    <!-- 表格 -->
    <vxe-table
      ref="vxeTable"
      :loading="loading"
      row-id="id"
      border
      resizable
      show-header-overflow
      show-overflow
      highlight-hover-row
      column-key
      align="center"
      :data="tableData"
      :height="tableHeight"
      :sort-config="{trigger: 'cell'}"
      :print-config="{}"
      :export-config="{}"
      keep-source
      :checkbox-config="{reserve: true}"
      :keyboard-config="{isClip: true, isEdit: true, isTab: true, isArrow: true, isEnter: true, isDel: true, isMerge: true, isFNR: true, isChecked: true}"
      :edit-config="{trigger: 'dblclick', mode: 'cell', showStatus: true}"
      :menu-config="tableMenu"
      v-bind="$attrs"
      v-on="$listeners"
      @checkbox-change="checkboxChange"
      @checkbox-all="checkboxAll"
    >
      <vxe-table-column v-if="selectType === 'checkbox'" type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column v-if="selectType === 'radio'" type="radio" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="40"></vxe-table-column>
      <vxe-table-column
        v-for="(item, index) in tableHeadList"
        :key="index"
        :title="item.label"
        :width="item.width || ''"
        :show-overflow="!item.overflow"
        :sortable="item.sortable"
        :field="item.prop"
        :formatter="item.formatter"
        v-bind="item.options"
      >
        <template v-if="item.slotName" #default="scope">
          <slot v-if="item.slotName" :data="{scope, name: item.slotName}" :name="isView ? 'slot1' : item.slotName"></slot>
        </template>
      </vxe-table-column>
    </vxe-table>
    <!-- 分页 -->
    <vxe-pager
      ref="page"
      perfect
      :current-page.sync="pagination.currentPage"
      :page-size.sync="pagination.pageSize"
      :total="pagination.totalItem"
      :page-sizes="pageConfig.pageSizes || [10, 20, 50, 100, 500]"
      :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']"
    >
    </vxe-pager>
  </div>
</template>
<script>
import { tableMenu } from './basicTable'
import { arrayUnique2 } from '@/utils/validate'
import files from '@/utils/files'
import setHeight from '@/mixin/setTableHeight'
import { ElMapExportTable } from 'table-excel'
export default {
  name: '',
  mixins: [setHeight],
  props: {
    isView: { // 是不是list-view组件调用的
      type: Boolean,
      default: false
    },
    searchStr: { // 防止有的接口需要传的参数需要包裹起来，1. {a: '', pageNo: 1}    2. {valueMap: {a: ''}, pageNo: 1}
      type: String,
      default: ''
    },
    tableArgs: { // 搜索参数
      type: Object,
      default: () => ({})
    },
    tableConfig: { // 表格：table配置
      type: Array,
      default: () => []
    },
    requestConfig: { // 请求集合
      type: Object,
      require: true,
      default: () => ({})
    },
    selectType: {
      type: String,
      default: 'checkbox'
    },
    dataType: { // 返回数据的data，因为接口返回的字段不统一，需要自己写
      type: String,
      default: 'data'
    },
    // 获取表格数据接口传参页码的配置
    // 防止接口页码参数不统一使用，如有些接口当前页用page，有些接口用pageNum
    pageConfig: { // 分页
      type: Object,
      default: () => {
        return {
          pageSize: 'pageSize', // 每页的数量
          currentPage: 'pageNum' // 当前页码
        }
      }
    },
    totalItem: { // 分页总数，防止接口返回的总数字段不一样
      type: String,
      default: 'totalCount'
    },
    // 配置图标
    toolbar: {
      type: Object,
      default: () => ({
        export: true,
        custom: true,
        print: true,
        fullScreen: true
      })
    },
    // 配置按钮
    barBtns: {
      type: Array,
      default: () => []
    },
    importObj: { // 导入需要传的数据
      type: Object,
      default: () => ({})
    },
    tableFn: { // 表格数据请求后需要的操作
      type: Function,
      default: null
    },
    tableHeaderFn: { // 表头数据请求后需要的操作
      type: Function,
      default: null
    },
    delBeforeFn: { // 删除之前需要的操作
      type: Function,
      default: null
    },
    tableExport: { // 表格导出配置
      type: Object,
      default: () => ({})
    },
    requestHead: { // 是否请求表头
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false, // 加载中
      isFullDisplay: false,
      tableMenu, // 复制粘贴
      tableHeadList: [], // 表头
      // 表格数据
      tableData: [],
      // 分页
      pagination: {
        currentPage: 1,
        pageSize: 10,
        totalItem: 100
      },
      // 全选
      selectedRowKeys: [],
      selectedList: []
    }
  },
  watch: {
    // 表格的搜索参数
    tableArgs: {
      handler(val) {
        this.getTableList(val)
      },
      deep: true
    },
    'pagination.currentPage'(val) {
      this.getTableList()
    },
    'pagination.pageSize'(val) {
      this.pagination.currentPage = 1
      this.getTableList()
    },
    tableConfig: {
      handler(val) {
        if (!this.requestHead) this.tableHeadList = val
      },
      deep: true,
      immediate: true // 是否立即执行
    }
  },
  mounted() {
    this.getTableList()
    if (this.requestHead) {
      this.getTableHeadList()
    }
    setTimeout(() => {
      console.log('this.$attrs', this.$attrs)
    }, 500)
  },
  methods: {
    // 获取列表数据
    getTableList() {
      let params = {}
      if (this.searchStr) {
        params = { [this.searchStr]: { ...this.tableArgs }}
      } else {
        params = { ...this.tableArgs }
      }
      // const params = { ...this.tableArgs }
      params[this.pageConfig.currentPage] = this.pagination.currentPage
      params[this.pageConfig.pageSize] = this.pagination.pageSize
      this.requestConfig.getTableData(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data[this.dataType] || []
          if (this.tableFn) this.tableData = this.tableFn(this.tableData)
          this.pagination.totalItem = res.data[this.totalItem]
        }
      })
    },
    // 获取表头列表
    getTableHeadList() {
      let arr = []
      this.requestConfig.getTableHeadData().then(res => {
        if (res.code === 200) {
          // 如果前端没传，直接使用后端返回的
          if (this.tableHeaderFn) {
            arr = this.tableHeaderFn(res.data)
          } else if (!this.tableConfig.length) {
            return this.tableHeadList = res.data
          } else {
            this.tableConfig.forEach(item => {
              const result = res.data.find(item1 => item1.prop === item.prop)
              if (result) arr.push({ ...result, ...item })
            })
          }
          this.tableHeadList = arr
        }
      })
    },
    // 图标操作
    handle() {

    },
    // 点击顶部的按钮
    handleClickBtn(item) {
      switch (item.clickType) {
        case 'import': // 调用接口导入文件
          this.importExcel()
          break
        case 'downloadTemplate': // 下载本地模板
          files.downloadTemplate(item.fileUrl, item.fileName)
          break
        case 'handleExport': // 前端导出excel
          this.handleExport(item.fileName)
          break
        case 'batchDelete': // 批量删除
          this.batchDelete(item.tip, item.idType)
          break
        default:
          this.$emit('handleClickBtn', item.clickType)
          break
      }
    },
    // 前端导入模板,使用批量新增
    handleUpload(file) {
      this.$import.xlsx(file)
        .then(({ header, results }) => {
          console.log('header, results', header, results)
          const labels = this.tableHeadList.filter(item => item.slotName !== 'handle').map(item => item.label)
          const headers = []
          // 去掉表头的左右空格
          header.forEach(item => headers.push(item.trim()))
          if (JSON.stringify(headers) !== JSON.stringify(labels)) return this.$message.error('导入失败，请检查字段名或者数据格式是否正确')
          let arr = []
          // let obj = this.importObj
          // 组装新增的数据
          results.forEach((item, i) => {
            let obj = JSON.parse(JSON.stringify(this.importObj))
            header.forEach((item2, j) => {
              obj = Object.assign(obj, { [this.tableHeadList[j].prop]: item[item2] })
            })
            arr.push(obj)
          })
          // 数组对象去重，取重复的最后一条
          arr = arrayUnique2(arr, 'code')
          this.tableData = [...this.tableData, ...arr]
          console.log('arr', arr)
          // this.requestConfig['importBtnData'](arr).then(res => {
          //   if (res.code === 200) {
          //     this.getTableList()
          //     this.$message.success('上传成功')
          //   }
          // })
          // this.tableData = results
        })
      return false
    },
    // 导入excel表，上传文件
    importExcel() {
      files.upload().then(file => {
        file = file[0]
        const formData = new FormData()
        this.loading = true
        if (file.size > 0) {
          formData.append('file', file)
          this.requestConfig['import'](formData).then((res) => {
            this.loading = false
            if (res.code === 200) {
              this.$message.success('上传成功！')
              this.getTableList()
            }
          }).finally(() => {
            this.loading = false
          })
        } else {
          this.loading = false
          this.$message.warning('上传的文件不能为空！')
        }
      })
    },
    // 前端导出excel列表
    handleExport(fileName) {
      const column = []
      this.tableHeadList.forEach(item => {
        column.push({
          title: item.label,
          dataIndex: item.prop
        })
      })
      const instance = new ElMapExportTable(
        { column, data: this.tableData,
          ...this.tableExport
        },
        { progress: progress => {
          this.loading = true
          if (progress === 100) this.loading = false
        } }// 进度条回调
      )
      instance.download(fileName)
    },
    // 批量删除
    batchDelete(tip, idType) {
      if (!this.selectedList.length) return this.$message.warning('请选择你要删除的数据')
      // 删除前的函数调用
      const flag = this.delBeforeFn && this.delBeforeFn(this.selectedList)
      if (flag) return
      // 预防有的不是根据id删除，需要传id的类型过来
      const ids = this.selectedList.map(item => item[idType || 'id'])
      this.$confirm(tip || '确定要删除选中的数据码？', '温馨提示', {
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.requestConfig['batchDelete'](ids).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.getTableList()
          }
        }).finally(() => {
          this.loading = false
        })
      })
    },
    // 切换表格部分是否全屏
    switchFull() {
      this.isFullDisplay = !this.isFullDisplay
    },
    // 单选
    checkboxChange({ checked, records, reserves, row }) {
      // console.log(checked ? '勾选事件' : '取消事件')
      // console.log('当前选中的数据：' + records)
      // console.log('翻页时其他页的数据：' + reserves)
      // console.log('当前选中的数据行：' + row )
      // 勾选选中时
      if (checked) {
        // 第一次选数据，还未进行翻页时
        if (reserves.length === 0) {
          this.selectedRowKeys = records.map(v => v.id)
          this.selectedList = records
        } else {
          // id集合，翻页存在已选中的数据时,拼接新选中的数据
          this.selectedRowKeys = [...reserves.map(v => v.id), ...records.map(v => v.id)]
          // 数据集合，翻页存在已选中的数据时,拼接新选中的数据
          this.selectedList = [...reserves, ...records]
        }
      } else {
        // 取消选中时
        const idIndex = this.selectedRowKeys.indexOf(row.id)
        if (idIndex > -1) {
          // 删除取消选中删除指定元素id
          this.$delete(this.selectedRowKeys, idIndex)
        }

        let dataIndex = null
        for (let i = 0; i < this.selectedList.length; i++) {
          if (this.selectedList[i].id === row.id) {
            dataIndex = i
            break
          }
        }
        // 删除取消选中的元素整个对象
        this.$delete(this.selectedList, dataIndex)
      }
      // this.selectedList = records
      this.$emit('getSelectedList', this.selectedList)
    },
    // 全选
    checkboxAll({ checked, records, reserves }) {
      // console.log(checked ? '勾选事件' : '取消事件')
      // console.log('当前选中的数据：' + records)
      // console.log('翻页时其他页的数据：' + reserves)
      // 全选中时
      if (checked) {
        // 第一次选数据，还未进行翻页时
        if (reserves.length === 0) {
          this.selectedRowKeys = records.map(v => v.id)
          this.selectedList = records
        } else {
          // id集合，翻页存在已选中的数据时,拼接新选中的数据
          this.selectedRowKeys = [...reserves.map(v => v.id), ...records.map(v => v.id)]
          // 数据集合，翻页存在已选中的数据时,拼接新选中的数据
          this.selectedList = [...reserves, ...records]
        }
      } else {
        // 取消全选时,直接将翻页数据赋值，当前页数据不用加上
        this.selectedList = reserves
        this.selectedRowKeys = reserves.map(v => v.id)
      }
      this.$emit('getSelectedList', this.selectedList)
    }
  }
}
</script>
<style lang='scss' scoped>
.full-display {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0.5em 1em;
  box-sizing: border-box;
  background-color: #fff;
  z-index: 3000;
}
::v-deep .vxe-tools--operate {
  margin-left: 12px;
}
::v-deep .vxe-toolbar {
  padding: 10px;
  box-sizing: border-box;
}
.upload {
  display: inline-block;
  margin: 0 10px;
}
</style>
