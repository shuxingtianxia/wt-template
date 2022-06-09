export const formConfig = [
  {
    type: 'input',
    label: '项目名称',
    prop: 'name',
    placeholder: '项目名称'
  },
  {
    type: 'select',
    label: '项目等级',
    prop: 'level',
    value: 'itemValue',
    text: 'description'
  },
  {
    type: 'select',
    label: '项目领域',
    prop: 'field',
    value: 'itemValue',
    text: 'description'
  },
  {
    type: 'select',
    label: '项目状态',
    prop: 'state',
    value: 'itemValue',
    text: 'description'
  },
  {
    type: 'input',
    label: '路径编号',
    prop: 'code0',
    placeholder: '路径编号查询',
    tip: '你好',
    rules: [
      { required: true, message: '请输入编号' }
    ]
  },
  {
    type: 'select',
    label: '下拉选择',
    prop: 'code1',
    placeholder: '下拉选择',
    props: {
      label: 'text',
      value: 'value'
    }
  },
  {
    type: 'date',
    label: '时间',
    prop: 'code2',
    placeholder: '时间'
  },
  {
    type: 'daterange',
    label: '时间区间',
    prop: 'code3',
    startField: 'startTime',
    endField: 'endTime',
    placeholder: '时间区间'
  },
  {
    type: 'datetime',
    label: '时分秒',
    prop: 'code4',
    placeholder: '时分秒'
  },
  {
    type: 'datetimerange',
    label: '时间时分秒',
    prop: 'code5',
    placeholder: '时间时分秒'
  }
]

export const tableConfig = [
  { prop: 'fcstVersion', width: 110, link: true },
  { prop: 'totalFcstCount', width: 130 },
  { prop: 'differencesCount', width: 130 },
  { prop: 'totalReplyCount', width: 130 },
  { prop: 'partOrgId', width: 130 },
  { prop: 'orgId', width: 130 },
  { prop: 'dataSource', width: 130 },
  { prop: 'relationType', width: 130 },
  { prop: 'historyData', width: 130 },
  { prop: 'factory', width: 130 },
  { prop: 'releaseBy', width: 130 },
  { prop: 'releaseStatus', width: 130 },
  { prop: 'replyStatus', width: 130 },
  { prop: 'replyBy', width: 130 },
  { prop: 'createdBy', width: 130 },
  { prop: 'updatedBy', width: 130 },
  { prop: 'releaseTime', width: 150, formatter: ['formatDate'] },
  { prop: 'replyTime', width: 150, formatter: ['formatDate'] },
  { prop: 'createdTime', width: 150, formatter: ['formatDate'] },
  { prop: 'updatedTime', width: 150, formatter: ['formatDate'] }
]

export const barBtns = [
  {
    text: '新建',
    type: 'primary',
    icon: 'fa-plus',
    clickType: 'add'
  },
  {
    text: '前端导入模板',
    type: 'warning',
    clickType: 'tableImport',
    icon: 'fa-download'
  },
  {
    text: '下载模板',
    type: 'warning',
    clickType: 'downloadTemplate',
    icon: 'fa-download',
    fileUrl: '/files/path.xlsx',
    fileName: '路径配置模板.xlsx'
  },
  {
    text: '批量删除',
    type: 'danger',
    icon: 'fa-plus',
    clickType: 'batchDelete'
  },
  {
    text: '导出列表',
    type: 'warning',
    icon: 'fa-plus',
    clickType: 'handleExport',
    fileName: '路径配置模板'
  }
]

export const tableExport = {
  setColumnStyle({ columnIndex }) {
    if (columnIndex === 0) {
      return {
        font: {
          size: 16, // 字体大小
          bold: true, // 字体加粗
          italic: true, // 字体倾斜
          color: { argb: 'FFFF0000' } // 字体颜色
        }
      }
    }
    if (columnIndex === 3) {
      return { width: 40, style: { font: { bold: true }}}
    }
  },
  setCellFormat({ data, rowIndex, columnIndex, type }) {
    if (type !== 'header' && columnIndex === 0) {
      return {
        text: data.fromCountry,
        hyperlink: 'http://www.baidu.com',
        tooltip: '百度'

      }
    }
  }
}
