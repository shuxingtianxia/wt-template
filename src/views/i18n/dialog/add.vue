<template>
  <div class="add">
    <el-dialog :visible.sync="dialog" :title="form.title" width="400px">
      <el-form label-width="120px" :model="form" :rules="rules">
        <el-form-item label="资源Key：" prop="resourcekey">
          <el-input v-model="form.resourcekey"></el-input>
        </el-form-item>
        <el-form-item label="资源Value：" prop="resourcevalue">
          <el-input v-model="form.resourcevalue"></el-input>
        </el-form-item>
        <el-form-item label="资源Type：">
          <el-select v-model="form.resourcetype"></el-select>
        </el-form-item>
        <el-form-item label="语言选择：">
          <el-select v-model="form.language"></el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">
            确定
          </el-button>
          <el-button @click="dialog = false">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialog: false,
      rules: {
        resourcekey: [
          { required: true, message: '请输入资源Key', trigger: 'blur' }
        ],
        resourcevalue: [
          { required: true, message: '请输入资源Value', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    console.log('this.$solts', this.$solts)
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">

</style>
