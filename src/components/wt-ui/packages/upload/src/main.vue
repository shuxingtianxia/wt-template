<template>
  <div class="wt-uploads">
    <div>
      <div v-if="flagType" align="center" class="upload" @click="uploadFile">
        <p>
          <i class="el-icon-upload icon header-icon"></i>
        </p>
        <p>上传附件</p>
      </div>
      <p></p>
      <div v-if="fileList.length" style="float:left;">
        <div v-for="(item, index) in fileList" :key="index" style="padding-bottom:5px; cursor:pointer;">
          <span style="color:#409eff; margin-right:10px;" @click="onPreview(item.id)">
            {{ item.originalAddress }}
          </span>
          <span style="color:#409eff; margin-right:10px;" @click="download(item)">
            <i class="el-icon-download icon header-icon"></i>
          </span>
          <span v-if="flagType" style="color:red" @click="removeFile(item.id)">
            <i class="el-icon-delete-solid icon header-icon"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import files from '@/utils/files'
import { addEnclosure, downloadEnclosure, delEnclosure } from '@/api/modules/common'
export default {
  name: 'WtUpload',
  props: {
    fileList: {
      type: Array,
      default: () => []
    },
    attachType: { // 上传文件袋的类型
      type: String,
      default: 'DF'
    },
    flagType: { // 是否显示上传文件袋
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    // 预览
    onPreview(id) {
      window.open(`${this.$config.env}${process.env.VUE_APP_API}/attach/preview?id=${id}`)
    },
    // 上传文件
    uploadFile() {
      files.upload().then(arr => {
        const formData = new FormData()
        arr.forEach(file => {
          if (file.size > 0) {
            formData.append('attachType', this.attachType)
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
      this.$confirm('确定要删除该文档吗？', '提示', {
        type: 'warning'
      }).then(() => {
        delEnclosure({ id }).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功')
            const fileList = this.fileList.filter(item => item.id !== id)
            this.$emit('update:fileList', fileList)
          }
        })
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.upload {
  margin-right:20px;
  float:left; width:80px;
  height: 80px;
  border:1px dashed #409eff;
  color:#409eff;
  font-weight:bold;
  p:first-child {
    font-size:26px;
    margin-top:10px;
  }
}
</style>
