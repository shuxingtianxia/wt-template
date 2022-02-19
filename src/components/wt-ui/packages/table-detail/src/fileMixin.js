
// import { downloadFile } from '@/utils/utils'

export default {
  methods: {
    // 文件操作
    download(val) {
      // const { id, originalAddress } = val
      // downloadFile('fileDownload', id, originalAddress)
    },
    preview(val) {
      const { id } = val
      window.open(window._CONFIG['serverURL'] + '/service1/srm-portal/srmAttach/preview?id=' + id)
    },
    uploadFile(row, column, fileType) {
      this.$common.upload().then((File) => {
        const formData = new FormData()
        formData.append('files', File)
        // 后台对应的业务文件类型
        formData.append('attachType', fileType)
        this.$api.fileUpload(formData).then((res) => {
          if (res.code === '200') {
            const { data } = res || {}
            // 更新最新附件信息
            this.$set(row, 'attachmentInfos', data)
          }
        })
      })
    },
    delFile(row, isReal = false) {
      if (isReal) {
        return
      }

      row.attachmentInfos = []
    }
  }
}
