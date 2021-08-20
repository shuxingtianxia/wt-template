
export const tableMenu = {
  body: {
    options: [
      [
        { code: 'CLEAR_CELL', name: '清除内容 (Del)' },
        { code: 'COPY_CELL', name: '复制 (Ctrl+C)', prefixIcon: 'fa fa-copy' },
        { code: 'CUT_CELL', name: '剪贴 (Ctrl+X)', prefixIcon: 'fa fa-cut' },
        { code: 'PASTE_CELL', name: '粘贴 (Ctrl+V)', prefixIcon: 'fa fa-paste' }
      ],
      [
        { code: 'OPEN_FIND', name: '查找 (Ctrl+F)' },
        { code: 'OPEN_REPLACE', name: '替换 (Ctrl+H)' },
        { code: 'MERGE_OR_CLEAR', name: '合并/取消 (Ctrl+M)', prefixIcon: 'fa fa-columns' }
      ],
      [
        { code: 'INSERT_AT_ROW', name: '新增' },
        { code: 'DELETE_ROW', name: '删除' }
      ],
      [
        {
          name: '排序',
          children: [
            { code: 'CLEAR_SORT', name: '清除排序' },
            { code: 'SORT_ASC', name: '升序', prefixIcon: 'fa fa-sort-alpha-asc' },
            { code: 'SORT_DESC', name: '倒序', prefixIcon: 'fa fa-sort-alpha-desc' }
          ]
        }
      ],
      [
        {
          name: '创建图表',
          prefixIcon: 'fa fa-area-chart',
          children: [
            { code: 'CHART_BAR_X_AXIS', name: '横向柱状图 - 自由选择', prefixIcon: 'fa fa-bar-chart' },
            { code: 'CHART_BAR_X_AXIS', name: '横向柱状图 - 固定类别', prefixIcon: 'fa fa-bar-chart', params: { category: 'a' }},
            { code: 'CHART_BAR_Y_AXIS', name: '纵向柱状图 - 自由选择', prefixIcon: 'fa fa-bar-chart' },
            { code: 'CHART_BAR_Y_AXIS', name: '纵向柱状图 - 固定类别', prefixIcon: 'fa fa-bar-chart', params: { category: 'a' }},
            { code: 'CHART_LINE', name: '折线图 - 自由选择', prefixIcon: 'fa fa-line-chart' },
            { code: 'CHART_LINE', name: '折线图 - 固定类别', prefixIcon: 'fa fa-line-chart', params: { category: 'a' }},
            { code: 'CHART_PIE', name: '饼图 - 自由选择', prefixIcon: 'fa fa-pie-chart' },
            { code: 'CHART_PIE', name: '饼图 - 固定类别', prefixIcon: 'fa fa-pie-chart', params: { category: 'a' }}
          ]
        }
      ], [
        { code: 'PRINT_ALL', name: '打印', prefixIcon: 'fa fa-print', params: { columns: ['a', 'b', 'c', 'd', 'e'] }},
        { code: 'EXPORT_ALL', name: '导出', prefixIcon: 'fa fa-download', params: { filename: '导出数据', type: 'csv' }}
      ]
    ]
  }
}

