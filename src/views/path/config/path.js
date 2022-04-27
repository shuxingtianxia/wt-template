export const formConfig = [
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
  {
    label: '路径编号',
    prop: 'code',
    width: 150
  },
  {
    label: '起始国家',
    prop: 'fromCountry',
    width: 150
  },
  {
    label: '始发地',
    prop: 'fromCity',
    width: 150
  },
  {
    label: '起运地地址',
    prop: 'fromAddress'
  },
  {
    label: '目的国',
    prop: 'toCountry'
  },
  {
    label: '目的地',
    prop: 'toCity',
    width: 100
  },
  {
    label: '收货地址',
    prop: 'toAddress'
  }
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
