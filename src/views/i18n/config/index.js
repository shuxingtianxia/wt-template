export const formConfig = [
  {
    type: 'input',
    label: '资源Key',
    key: 'resourcekey',
    placeholder: '资源Key'
  },
  {
    type: 'input',
    label: '资源Value',
    key: 'resourcevalue',
    placeholder: '资源Value'
  },
  {
    type: 'select',
    label: '语言',
    key: 'language',
    placeholder: '语言'
  }
]

export const tableConfig = [
  {
    label: '语言',
    key: 'code',
    width: 150
  },
  {
    label: '资源key',
    key: 'fromCountry',
    width: 150
  },
  {
    label: '资源value',
    key: 'fromCity',
    width: 150
  },
  {
    label: '资源Type',
    key: 'fromAddress'
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
    text: '编辑',
    type: 'primary',
    clickType: 'edit',
    icon: 'fa-download'
  },
  {
    text: '批量删除',
    type: 'danger',
    icon: 'fa-plus',
    clickType: 'batchDelete'
  }
]

export const toolbar = {
  export: true,
  custom: true,
  print: true,
  fullScreen: true
}
