export const formConfig = [
  {
    type: 'input',
    label: '路径编号',
    key: 'code',
    placeholder: '路径编号查询'
  }
]

export const tableConfig = [
  {
    label: '路径编号',
    key: 'code',
    width: 150
  },
  {
    label: '起始国家',
    key: 'fromCountry',
    width: 150
  },
  {
    label: '始发地',
    key: 'fromCity',
    width: 150
  },
  {
    label: '起运地地址',
    key: 'fromAddress'
  },
  {
    label: '目的国',
    key: 'toCountry'
  },
  {
    label: '目的地',
    key: 'toCity',
    width: 100
  },
  {
    label: '收货地址',
    key: 'toAddress'
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
    text: '导入模板',
    type: 'warning',
    clickType: 'import',
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
    if (columnIndex === 3) {
      return { width: 40, style: { font: { bold: true }}}
    }
  }
}

export const toolbar = {
  export: true,
  custom: true,
  print: true,
  fullScreen: true
}
