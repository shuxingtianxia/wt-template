
export default {
  methods: {
    // 上传成功之后
    afterUploadFile(data, row, column, fileType) {
      row.attachmentInfos.push(...data)
    },
    // 删除文件之后
    afterRemoveFile(id, row, index) {
      row.attachmentInfos.splice(index, 1)
    }
  }
}
