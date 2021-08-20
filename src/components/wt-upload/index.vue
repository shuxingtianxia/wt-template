<template>
  <div class="wt-upload">
    <el-button size="small" type="primary" @click="uploadFile">
      上传文件
    </el-button>
    <el-table class="table" :data="fileList">
      <el-table-column label="文件" prop="originalAddress"></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="{row}">
          <el-button type="primary" @click="onPreview(row.id)">
            预览
          </el-button>
          <el-button type="warning" @click="download(row)">
            下载
          </el-button>
          <el-button type="danger" @click="removeFile(row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import files from '@/utils/files'
import { addEnclosure, downloadEnclosure, delEnclosure } from '@/api/modules/common'
export default {
  name: '',
  props: {
    fileList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  methods: {
    // 预览
    onPreview(id) {
      window.open('http://192.168.130.62:30001/service1/tms-portal/attach/preview?id=' + id)
    },
    // 上传文件
    uploadFile() {
      files.upload().then((files) => {
        const formData = new FormData()
        files.forEach(file => {
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
        this.upload(formData)
      })
    },
    upload(formData) {
      addEnclosure(formData).then(res => {
        if (res.code === 200) {
          this.fileList.push(...res.data)
          this.$emit('update:fileList', this.fileList)
        }
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
    removeFile(id) {
      delEnclosure({ id }).then(res => {
        if (res.code === 200) {
          this.$message.success('删除成功')
          const fileList = this.fileList.filter(item => item.id !== id)
          this.$emit('update:fileList', fileList)
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
// .wt-upload {
//   display: -webkit-box;
//   .table {
//     margin-left: 10px;
//   }
// }
</style>
