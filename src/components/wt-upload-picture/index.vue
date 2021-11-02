<template>
  <div class="upload-info">
    <div>
      <el-upload
        class="upload-pic"
        :action="domain"
        :data="QiniuData"
        :on-remove="handleRemove"
        :on-error="uploadError"
        :on-success="uploadSuccess"
        :before-remove="beforeRemove"
        :before-upload="beforeAvatarUpload"
        :limit="limit"
        list-type="picture-card"
        multiple
        :on-exceed="handleExceed"
        :file-list="fileLists"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { getQiniuToken } from '@/api/modules/common'
export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 2
    },
    limit: {
      type: Number,
      default: 1
    },
    fileLists: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      loading: false,
      QiniuData: {
        key: '', // 图片名字处理
        token: '', // 七牛云token
        data: {}
      },
      domain: 'https://up-z2.qiniup.com', // 七牛云的上传地址（华东区）
      qiniuaddr: 'http://pic.booktianxia.top', // 七牛云的图片外链地址 七牛云空间的外链地址
      uploadPicUrl: '', // 提交到后台图片地址
      fileList: []
    }
  },
  mounted() {
    this.getToken()
  },
  methods: {
    // 图片删除
    handleRemove(file, fileList) {
      const index = this.fileList.findIndex(item => item.uid === file.uid)
      this.fileList.splice(index, 1)
      this.$emit('handleRemove', index, this.type)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.limit} 张图片，如需更换，请删除上一张图片在重新选择！`
      )
    },
    // 上传图片之前
    beforeAvatarUpload(file) {
      // 图片上传之前的方法
      const isPNG = file.type === 'image/png'
      const isJPEG = file.type === 'image/jpeg'
      const isJPG = file.type === 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < this.size

      if (!isPNG && !isJPEG && !isJPG) {
        this.$message.error('上传头像图片只能是 jpg、png、jpeg 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error(`上传头像图片大小不能超过 ${this.size}MB!`)
        return false
      }
      this.QiniuData.data = file
      this.QiniuData.key = `${file.name}`
      console.log(this.QiniuData.key)
    },
    // 图片上传成功
    uploadSuccess(response, file, fileList) {
      // 图片上传成功的方法
      const result = `${this.qiniuaddr}/${response.key}`
      this.fileList = fileList
      this.$emit('onComplete', result, this.type)
    },
    // eslint-disable-next-line
    uploadError(err, file, fileList) {
      // 图片上传失败时调用
      this.$message({
        message: '上传出错，请重试！',
        type: 'error',
        center: true
      })
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`是否删除此图片？`)
    },
    // 请求后台拿七牛云token
    async getToken() {
      // token
      const uploadtoken = await getQiniuToken()
      this.QiniuData.token = uploadtoken.data
    }
  }
}
</script>
