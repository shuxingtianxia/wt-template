export const fields = [
  {
    type: 'input',
    prop: 'code',
    label: '路径编号',
    span: 24,
    width: '280px',
    rules: [{ required: true, message: '请输入路径编号', trigger: 'blur' }],
    editDisabled: true
  },
  {
    prop: 'fromFactoryId',
    label: '起始国家',
    span: 24,
    width: '280px',
    slotName: 'fromFactoryId',
    rules: [{ required: true, message: '请选择起始国家', trigger: 'change' }]
  },
  {
    prop: 'toFactoryId',
    label: '目的国',
    span: 24,
    width: '280px',
    value: 'id',
    text: 'address',
    otherConfig: {
      filterable: true
    },
    slotName: 'toFactoryId',
    rules: [{ required: true, message: '请选择目的国', trigger: 'change' }]
  },
  {
    type: 'integer',
    label: '数字',
    prop: 'num'
  },
  {
    type: 'rich',
    label: '富文本',
    prop: 'detail',
    span: 24
  },
  {
    type: 'image',
    label: '富文本1',
    prop: 'detail1',
    span: 24
  }
]
