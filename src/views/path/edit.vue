<template>
  <div>
    <wt-table-detail
      ref="wtTable"
      :data="data"
      :option="option"
      mergefield="name"
      @handleEvent="handleEvent"
    >
      <!-- 自定义操作栏 -->
      <template v-slot:name1="{slotData}">
        {{ slotData.rowIndex }}
      </template>
      <template v-slot:creator>
        <el-button @click="handleClick">
          按钮
        </el-button>
      </template>
      <!-- 不使用按钮 -->
      <!-- <div slot="btn" /> -->
    </wt-table-detail>

    <wt-table-detail
      :data="treeData"
      :option="treeOption"
      @handleEvent="handleEvent"
    />
  </div>
</template>

<script>

export default {
  name: 'AAA',
  data() {
    const nameValid = ({ cellValue }) => {
      // 模拟服务端校验
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (cellValue && (cellValue.length < 3 || cellValue.length > 50)) {
            reject(new Error('名称长度在 3 到 50 个字符之间'))
          } else {
            resolve()
          }
        }, 100)
      })
    }
    return {
      treeData: [
        {
          'createId': 'admin_管理员',
          'updateId': 'admin_管理员',
          'id': '4028aec178687b890178687bacf70001',
          'organizeId': 'B2B769D9FEA94813E053E014A8C0D5A5',
          'parentId': '0',
          'catalogName': '平板',
          'catalogNameEn': 'Flat',
          'nodeType': '2',
          'catalogStatus': '1',
          'createTime': 1616660639000,
          'updateTime': 1616660639000,
          'childrenSet': [
            {
              'createId': 'admin_管理员',
              'updateId': 'admin_管理员',
              'id': '4028942f787cb60501787cca8c130011',
              'organizeId': 'B2B769D9FEA94813E053E014A8C0D5A5',
              'parentId': '4028aec178687b890178687bacf70001',
              'catalogName': '摄像头',
              'catalogNameEn': 'camera',
              'nodeType': '3',
              'catalogStatus': '1',
              'createTime': 1617001352000,
              'updateTime': 1627442568000,
              'childrenSet': [
                {
                  'createId': 'admin_管理员',
                  'updateId': 'admin_管理员',
                  'id': '2c920a337af0f885017af0f885100000',
                  'organizeId': 'B2B769D9FEA94813E053E014A8C0D5A5',
                  'parentId': '4028942f787cb60501787cca8c130011',
                  'catalogName': '像素',
                  'catalogNameEn': 'pixel',
                  'nodeType': '4',
                  'catalogStatus': '1',
                  'createTime': 1627540456000,
                  'updateTime': 1627540456000
                }
              ]
            }
          ]
        },
        {
          'createId': 'admin_管理员',
          'updateId': 'admin_管理员',
          'id': '2c920a287ae6d1fa017aec58eaa4001a',
          'organizeId': 'B2B769D9FEA94813E053E014A8C0D5A5',
          'parentId': '0',
          'catalogName': '笔记本',
          'catalogNameEn': 'notebook',
          'nodeType': '2',
          'catalogStatus': '1',
          'createTime': 1627462888000,
          'updateTime': 1627462888000
        }
      ],

      treeOption: {
        treeNode: true,
        column: [
          { prop: 'catalogName', label: '供货目录' },
          { prop: 'materialGroups', label: '物料组', renderPro: {
            name: 'selects',
            multiple: true,
            placeholder: '请输入',
            clearable: true,
            selectDataFiled: 'materialGroups',
            filterable: true,
            props: {
              label: 'label',
              value: 'value'
            },
            tags: true
          }}
        ],
        treeWidth: '100',
        tableOtherConfig: {
          checkboxConfig: { checkStrictly: true },
          treeConfig: { children: 'childrenSet' }
        }
      },

      option: {
        isOpenActiveCell: false,
        // 需要合并的字段
        mergefields: ['name'],
        mergeFileFields: ['attachmentInfos'],
        editRules: {
          name: [
            { required: true, message: '请输入名字' },
            { validator: nameValid }
          ]
        },
        column: [
          { prop: 'name', label: '名字', editRender: { name: '$input' }},
          { prop: 'age', label: '年龄', editRender: { name: '$input' }},
          { prop: 'bugName', label: '问题名称', editRender: { name: '$input' }},
          { prop: 'bugid', label: '问题id', editRender: { name: '$input' }},
          { prop: 'bugType', label: '问题类型', editRender: { name: '$select' }},
          { prop: 'attachmentInfos', label: '问题描述文件', width: '700',
            renderPro: {
              name: 'file',
              fileType: (row, column, rowIndex) => { return 'ACF' }, // 后台规定的业务类型
              showUploadBtn: (row, column) => true,
              showDelBtn: (row, column) => true,
              showDownloadBtn: (row, column) => {
                return true
              } }
          },
          { prop: 'name1', label: '操作4', slotName: 'name1' }, // 开启操作自定义
          { prop: 'bugtype', label: '问题类型',
            renderPro: {
              name: 'selects',
              multiple: true,
              placeholder: '请输入',
              clearable: true,
              selectDataFiled: 'rows',
              filterable: true,
              props: {
                label: 'label',
                value: 'value'
              },
              tags: true
            }
          },
          { prop: 'creator', label: '操作3', slotName: 'creator' } // 开启操作自定义
        ]
      },
      data: []
    }
  },
  mounted() {
    this.data = [
      { name: '陈浩然', age: 12, bugName: 'test', id: 1, status: 'add',
        attachmentInfos: [
          {
            attachAddress: '/srm/tempFiles_dev',
            createdBy: '',
            fileSize: 12742,
            id: '951424661443784704',
            originalAddress: '文件1.xlsx',
            suffix: 'xlsx',
            title: '951424661346910208.xlsx',
            type: 'DF',
            updatedBy: ''
          },
          {
            attachAddress: '/srm/tempFiles_dev',
            createdBy: '',
            fileSize: 12742,
            id: '951424661443784704',
            originalAddress: '文件2.xlsx',
            suffix: 'xlsx',
            title: '951424661346910208.xlsx',
            type: 'DF',
            updatedBy: ''
          }
        ],
        rows: [{ label: '测试', value: 'test' }, { label: '优化', value: 'optimize' }]
      },
      { name: '李浩然', age: 18, id: 2, status: 'add', bugName: 'test5', bugdesc: '文件2', attachmentInfos: [], name1: '123' },
      { name: '李浩然', age: 18, id: 3, status: 'edit', bugName: 'test6', bugdesc: '文件2', attachmentInfos: [] },
      { name: '李浩然', age: 18, id: 4, status: 'edit', bugName: 'test7', bugdesc: '文件2', attachmentInfos: [] },
      { name: '周浩然', age: 18, id: 5, status: 'add', bugName: 'test7', bugdesc: '文件2', attachmentInfos: [] }
    ]
    // 控制表格禁用
    this.data.forEach(item => {
      if (item.status === 'add') {
        ['name', 'bugName'].forEach(key => {
          this.$refs.wtTable.collectStyleCell(item.id, key)
        })
      }
      if (item.status === 'edit') {
        ['name', 'age'].forEach(key => {
          this.$refs.wtTable.collectStyleCell(item.id, key)
        })
      }
    })
    // 隐藏列
    const column = this.$refs.wtTable.hideColumn(['bugid'])
    this.option.column = column

    // 隐藏按钮
    this.$refs.wtTable.hideBtn(['btn_save'])
  },
  methods: {
    handleClick() {
      console.log('this.data', this.$refs.wtTable.$refs.xTable.getTableData())
    },
    handleEvent(type, selects) {
      console.log('type, selects', type, selects)
    }
  }
}
</script>

