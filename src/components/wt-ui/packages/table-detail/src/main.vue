<template>
  <div>
    <slot name="btn">
      <WtButton :button-arr="defaultBtnOption" @clickBtn="clickBtn"></WtButton>
      <!-- <btn-group :option="option.btnOption || defaultBtnOption" /> -->
    </slot>
    <vxe-table
      ref="xTable"
      border
      show-header-overflow
      column-key
      stripe
      resizable
      keep-source
      highlight-cell
      :loading="option.loading"
      :data="data"
      :cell-style="cellStyle"
      :edit-config="editConfig"
      :edit-rules="option.editRules || {}"
      :span-method="mergeRowMethod"
      :keyboard-config="{ isClip: true }"
      :clip-config="clipConfig"
      v-bind="option.tableOtherConfig"
      v-on="$listeners"
      @checkbox-change="checkboxChange"
      @checkbox-all="selectAllEvent"
    >
      <vxe-table-column v-if="!option.isHideCheckbox" type="checkbox" :tree-node="option.treeNode" :width="option.treeWidth || 50" fixed="left" />
      <vxe-table-column v-if="!option.isHideSeq" type="seq" width="50" fixed="left" />
      <vxe-table-column
        v-for="item in option.column"
        :key="item.prop"
        :type="item.type"
        :field="item.prop"
        :title="item.label.includes('$t') ? item.label : $t(item.label)"
        :width="item.width || 150"
        :edit-render="item.editRender || null"
        :cell-render="item.cellRender || null"
        show-overflow
        :formatter="item.formatter ? item.formatter : ''"
        v-bind="item.otherOptions"
      >
        <!-- 渲染文件 -->
        <template v-if="item.renderPro && item.renderPro.name =='file'" #default="{ row, rowIndex, column }">
          <div class="file-container">
            <!-- 上传按钮 -->
            <!-- showUploadBtn 通过传入的方法可以控制按钮显隐 -->
            <div>
              <i
                v-if="item.renderPro.showUploadBtn && item.renderPro.showUploadBtn(row, column)"
                class="el-icon-upload"
                style="font-size: 20px;cursor: pointer;"
                @click="uploadFile(row, rowIndex, item.renderPro.fileType(row, column, rowIndex) || '')"
              />
            </div>
            <template v-if="row.attachmentInfos && row.attachmentInfos.length">
              <div v-for="(file, index) in row.attachmentInfos" :key="index" class="file-item">
                <div :class="row.attachmentInfos && row.attachmentInfos.length > 0 ? 'download-link' : ''">
                  <!--解决附件栏部分部分只显示文字 -->
                  <el-link @click="preview(file.id)">
                    {{ file.originalAddress }}
                  </el-link>
                  <!-- <span v-else>{{ renderFlieName(row[column.property]) }}</span> -->
                  <!-- 删除 -->
                  <i v-if="item.renderPro.showDelBtn && item.renderPro.showDelBtn(row, column)" class="el-icon-circle-close del-btn" @click="removeFile(row, file, index)" />
                </div>
                <!-- 下载 -->
                <div>
                  <i v-if="item.renderPro.showDownloadBtn && item.renderPro.showDownloadBtn(row, column)" style="padding-left: 10px;cursor:pointer;" class="el-icon-download " @click="download(file)" />
                </div>
              </div>
            </template>
          </div>
        </template>
        <!--  -->

        <!-- 下拉框支持每行下拉数据不一样 -->
        <template v-else-if="item.renderPro && item.renderPro.name == 'selects'" #default="scope">
          <!-- 控制是否显示 -->
          <div v-if="item.renderPro.hideSelect && item.renderPro.hideSelect(scope.row, scope.column) || (!item.renderPro.hideSelect && true)">
            <el-tooltip class="item" effect="dark" :content="renderTips(scope.row[item.prop], scope.row[item.renderPro.selectDataFiled], item.renderPro.props)" placement="bottom">
              <el-select
                v-model="scope.row[item.prop]"
                :multiple="item.renderPro.multiple"
                reserve-keyword
                :placeholder="item.renderPro.placeholder"
                :clearable="item.renderPro.clearable"
                :disabled="item.renderPro.disabled"
                :filterable="item.renderPro.filterable"
                :collapse-tags="item.renderPro.tags"
                v-bind="item.renderPro.otherConfig"
              >
                <el-option
                  v-for="items in scope.row[item.renderPro.selectDataFiled]"
                  :key="items[item.renderPro.props.value]"
                  :label="items[item.renderPro.props.label]"
                  :value="items[item.renderPro.props.value]"
                />
              </el-select>
            </el-tooltip>
          </div>
        </template>
        <template v-else-if="item.slotName" #default="{row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, _columnInde}">
          <slot v-if="item.slotName" :slotData="{row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, _columnInde}" :name="item.slotName"></slot>
        </template>
      </vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
import fileMixin from './fileMixin'
import WtButton from '@/components/wt-button'
export default {
  name: 'WtTableDetail',
  components: {
    WtButton
  },
  mixins: [fileMixin],
  props: {
    data: { // 表格数据
      type: Array,
      default: () => []
    },
    option: {
      type: Object,
      default() {
        return {
          loading: false,
          isEditModal: false,
          isOpenActiveCell: false, // 是否开启激活样式
          isHideCheckbox: false, // 是否隐藏选择框
          isHideSeq: false, // 是否隐藏数字列
          cellStyle: () => null,
          mergefields: [], // 需要合并的列字段
          editRules: {}, // 检验规则
          btnOption: [], // 按钮群
          treeNode: false, // 只对 tree-config 配置时有效，指定为树节点
          column: [],
          tableOtherConfig: {} // 表格的其他配置，没有在props里的，都可以通过这里传
        }
      }
    },
    activeCellMethod: { // 是否允许编辑的方法
      type: Function,
      default: null
    },
    mergefield: { // 文件合并根据的field名字
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editConfig: {
        trigger: 'dblclick',
        mode: 'cell',
        showStatus: true,
        activeMethod: this.activeMethod
      },
      // 表格复制配置
      clipConfig: {
        copyMethod({ row, column }) {
          const cellValue = row[column.property]
          return cellValue
        },
        pasteMethod({ cellValue, row, column }) {
          const val = cellValue.trim()
          row[column.property] = val
        }
      },
      // 按钮配置
      defaultBtnOption: [
        {
          text: '新增',
          prop: 'btn_new',
          icon: 'vxe-icon--plus',
          clickType: 'add',
          isShow: true
        },
        {
          text: '删除',
          prop: 'btn_del',
          icon: 'fa fa-trash-o',
          clickType: 'del',
          isShow: true
        },
        // {
        //   text: '编辑',
        //   prop: 'btn_edit',
        //   icon: 'fa fa-edit',
        //   clickType: 'edit',
        //   isShow: true
        // },
        {
          text: '保存',
          prop: 'btn_save',
          icon: 'fa fa-save',
          clickType: 'save',
          isShow: true
        }

      ],
      // 禁止或者可用的单元格
      cellInfo: {
        cells: [] // 需要禁用的数组，使用id+key值区分
      },
      // 激活可用的单元格
      activeCells: [],
      // 是否显示份文件操作按钮
      showCellBtns: []
    }
  },
  created() {
  },
  // watch
  methods: {
    // 按钮操作
    clickBtn(type) {
      switch (type) {
        case 'add':
          this.insertEvent()
          break
        case 'del':
          this.delEvent()
          break
        case 'edit':
          this.editEvent()
          break
        case 'save':
          this.saveEvent()
          break
        default:
          break
      }
    },
    renderFlieName(filedType) {
      if (typeof filedType !== 'string') {
        return ''
      }
      return filedType
    },
    checkboxChange(e) {
      this.$emit('handleEvent', 'checkboxChange', e.selection, e)
    },
    selectAllEvent(e) {
      this.$emit('handleEvent', 'selectAllEvent', e.selection, e)
    },
    // 需要隐藏的按钮
    hideBtn(showArr) {
      this.defaultBtnOption = this.defaultBtnOption.filter(item => !showArr.includes(item.prop))
    },
    // 获取选中的值
    getSelection() {
      const $table = this.$refs.xTable
      const selectRecords = $table.getCheckboxRecords()
      if (!selectRecords.length) {
        this.$message.error('请选择需要操作的数据')
        return false
      }
      return selectRecords
    },
    // 按钮方法集合
    // 新增
    async insertEvent() {
      const $table = this.$refs.xTable
      await $table.insertAt()
      this.$emit('handleEvent', 'add')
    },
    // 删除
    delEvent() {
      const $table = this.$refs.xTable
      const selectRecords = this.getSelection()
      if (!selectRecords.length) {
        this.$message({
          message: `请选择需要删除的数据`,
          type: 'error'
        })
        return
      }
      $table.removeCheckboxRow()
    },
    setIsActive(isActiveCell) {
      this.isActiveCells.push(isActiveCell)
    },
    // 编辑
    editEvent() {
      const selectRecords = this.getSelection()
      if (!selectRecords.length) {
        this.$message({
          message: `请选择需要编辑的数据`,
          type: 'error'
        })
        return
      }
      // 激活编辑勾选的框？
      // 编辑出弹窗
      this.$emit('handleEvent', this.option.isEditModal ? 'editModal' : 'edit', selectRecords)
    },
    // 保存
    saveEvent() {
      const isPass = this.validAllEvent()
      if (isPass) {
        const selectRecords = this.getSelection()
        selectRecords && this.$emit('handleEvent', 'save', selectRecords)
      }
    },
    async validAllEvent() {
      let isPass = true
      const $table = this.$refs.xTable
      const errMap = await $table.validate(true).catch(err => err)
      if (errMap) {
        // this.$message({ type: 'error', message: this.$t('message_checkFailed') })
        isPass = false
      } else {
        // this.$message({ type: 'success', message: this.$t('保存成功') })
        isPass = true
      }
      return isPass
    },
    // 该方法的返回值用来决定该单元格是否允许编辑   返回布尔值
    activeMethod({ row, rowIndex, column, columnIndex }) {
      if (this.activeCellMethod) {
        return this.activeCellMethod({ row, rowIndex, column, columnIndex })
      }
      const isPass = this.getIsEditCells(row, column)
      return !!isPass
    },
    // 获取是否可编辑
    getIsEditCells(row, column) {
      const { cells } = this.cellInfo
      const cell = `${row.id}${column.property}`
      // 不包含禁用的filed,返回true，否则false   true:允许编辑，false：禁用
      return !cells.includes(cell)
    },
    // 需要禁用编辑的数组
    collectStyleCell(id, prop) {
      this.cellInfo.cells.push(`${id}${prop}`)
    },
    // 给单元格附加样式
    cellStyle({ row, rowIndex, column }) {
      // 自定义单元格样式方法
      if (this.option.cellStyle) {
        return this.option.cellStyle({ row, rowIndex, column })
      }
      // 考虑到如果禁止单元格占比多余可用单元格时type为disalbed去收集
      // 反之用type为able去收集
      // 表格禁用样式
      const isPass = this.getIsEditCells(row, column)
      if (!isPass) {
        const styleObj = {
          // background: '#dcdfe6',
          cursor: 'not-allowed'
        }
        return styleObj
      }
      // 表格激活样式开启方式（表格选中并且激活一进页面就渲染）
      const excludeArr = ['seq', 'checkbox']
      // 允许编辑并且有editRender对象的
      if (isPass && !!column.editRender && !excludeArr.includes(column.type) && this.option.isOpenActiveCell) {
        return {
          '-webkit-box-shadow': 'inset 0 0 0 2px #409eff',
          'box-shadow': 'inset 0 0 0 2px #409eff'
        }
      }

      return {}
    },
    // 隐藏列方法
    // hideColumns隐藏列名的集合
    hideColumn(hideColumns = []) {
      return this.option.column.filter(item => hideColumns.some(key => item.prop !== key))
      // this.option.column = this.option.column.filter(item => !JSON.stringify(hideColumns).includes(item.prop))
    },
    // 合并单元格
    mergeRowMethod({ row, _rowIndex, column, visibleData }) {
      const len = visibleData.length
      const cellValue = row[column.property]
      const prevRow = visibleData[_rowIndex - 1]
      let nextRow = visibleData[_rowIndex + 1]
      // 文件合并  visibleData: 表格多少条数据
      if (this.option.mergeFileFields) {
        if (this.option.mergeFileFields.includes(column.property)) {
          if (len > 1) {
            if (prevRow && prevRow[this.mergefield] === row[this.mergefield]) {
              // rowspan 跨行    colspan 跨列  设置为0相当删掉改行或者该列
              return { rowspan: 0, colspan: 0 }
            } else {
              let countRowspan = 1
              while (nextRow && nextRow[this.mergefield] === row[this.mergefield]) {
                nextRow = visibleData[++countRowspan + _rowIndex]
              }
              if (countRowspan > 1) {
                return { rowspan: countRowspan, colspan: 1 }
              }
            }
          }
        }
      }
      // 通用行合并函数（将相同多列数据合并为一行）
      // 需要合并的列
      if (cellValue && (this.option.mergefields || []).includes(column.property)) {
        if (prevRow && prevRow[column.property] === cellValue) {
          // rowspan 跨行    colspan 跨列  设置为0相当删掉改行或者该列
          return { rowspan: 0, colspan: 0 }
        } else {
          let countRowspan = 1
          while (nextRow && nextRow[column.property] === cellValue) {
            nextRow = visibleData[++countRowspan + _rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
    },
    //
    renderTips(data = [], arr, props = { value: 'value', label: 'label' }) {
      const label = []
      data && data.forEach(item => {
        label.push(arr.find(option => item === option[props.value])[props.label])
      })
      return label.join(', ')
    }
  }
}
</script>

<style scoped>
  .file-container {
    display: flex;
    align-items: center;
    padding-top: 10px;
    flex-wrap: wrap;
  }
  .download-link {
    border: 1px dashed #ccc;
    border-radius: 5px;
    padding: 0 5px;
    position: relative;
    margin-left: 5px;
  }
  .del-btn {
    cursor: pointer;
    position: absolute;
    vertical-align: middle;
    font-size: 16px;
    top: -10px
  }
  .file-item {
    display: flex;
    margin-right: 10px;
    margin-bottom: 10px;
  }
</style>
