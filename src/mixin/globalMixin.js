import files from '@/utils/files'
import { addEnclosure, downloadEnclosure, delEnclosure } from '@/api/modules/common'
export default {
  data() {
    return {

    }
  },
  created() {

  },
  methods: {
    // 取消操作，路由后退，关闭当前标签
    closeTag() {
      this.$store.dispatch('page/close', { tagName: this.$route.fullPath, isTo: 'page' })
    },
    // 预览
    preview(id) {
      window.open(`${this.$config.env}/service1/tms-portal/attach/preview?id=${id}`)
    },
    // 上传文件
    uploadFile(...arg) {
      files.upload().then((fileList) => {
        const formData = new FormData()
        fileList.forEach(file => {
          if (file.size > 0) {
            formData.append('attachType', 'DF')
            formData.append('files', file)
            console.log('formData', formData)
          } else {
            this.loading = false
            this.$message({
              showClose: true,
              message: '上传的文件不能为空！',
              type: 'warning'
            })
          }
        })
        addEnclosure(formData).then(res => {
          if (res.code === 200) {
            if (arg.length) {
              this.afterUploadFile(res.data, ...arg)
            } else {
              this.afterUploadFile(res.data)
            }
          }
        })
      })
    },
    // 下载文件
    download(file) {
      this.loading = true
      downloadEnclosure({ id: file.id }).then(res => {
        files.download(res, file.originalAddress)
      }).finally(() => {
        this.loading = false
      })
    },
    // 移除文件
    removeFile(id, ...args) {
      this.$confirm('确定要删除该文件吗？', '温馨提示', {
        type: 'warning'
      }).then(() => {
        this.loading = true
        delEnclosure({ id }).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.afterRemoveFile(id, ...args)
          }
        }).finally(() => {
          this.loading = false
        })
      })
    }
  }
}
