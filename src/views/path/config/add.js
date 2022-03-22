export const fields = [
  {
    type: 'input',
    prop: 'code',
    label: '输入框',
    width: '280px',
    rules: [{ required: true, message: '输入框', trigger: 'blur' }],
    editDisabled: true,
    tip: '提示语'
  },
  {
    type: 'textarea',
    prop: 'fromFactoryId',
    label: '多行输入框',
    width: '280px',
    rules: [{ required: true, message: '多行输入框', trigger: 'change' }]
  },
  {
    type: 'number',
    prop: 'number',
    label: '数字框',
    width: '280px'
  },
  {
    type: 'integer',
    label: '整数',
    prop: 'num'
  },
  {
    type: 'float',
    label: '浮点数',
    prop: 'float'
  },
  {
    type: 'button',
    label: '按钮'
  },
  {
    type: 'select',
    label: '选择器',
    prop: 'select',
    props: {
      label: 'label',
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
  },
  {
    type: 'rate',
    label: '评分',
    prop: 'rate'
  },
  {
    type: 'switch',
    label: '开关',
    prop: 'switch'
  },
  {
    type: 'slider',
    label: '滑块',
    prop: 'slider'
  },
  {
    type: 'radio',
    label: '单选框',
    prop: 'radio'
  },
  {
    type: 'checkbox',
    label: '多选框',
    prop: 'checkbox'
  },
  {
    type: 'rich',
    label: '富文本',
    prop: 'detail',
    span: 24
  },
  {
    type: 'file',
    label: '文件',
    prop: 'file1',
    span: 24
  },
  {
    label: '插槽',
    prop: 'fromFactoryId',
    span: 24
  }
]
