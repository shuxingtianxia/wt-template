<template>
  <div class="wt-files-download">
    <el-dialog :visible.sync="dialog" title="文件预览下载">
      <el-table :data="fileTable">
        <el-table-column label="文件" prop="originalAddress"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="{row}">
            <el-button type="primary" :loading="loading" @click="preview(row.id)">
              预览
            </el-button>
            <el-button type="primary" :loading="loading" @click="download(row)">
              下载
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import { downloadEnclosure } from '@/api/modules/common'
import files from '@/utils/files'
export default {
  name: '',
  props: {
    fileTable: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading: false,
      dialog: false
    }
  },
  methods: {
    // 预览
    preview(id) {
      window.open('http://192.168.130.62:30001/service1/tms-portal/attach/preview?id=' + id)
    },
    // 下载
    download(row) {
      this.loading = true
      downloadEnclosure({ id: row.id }).then(res => {
        files.download(res, row.originalAddress)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
