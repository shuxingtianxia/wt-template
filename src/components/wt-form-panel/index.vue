<template>
  <div class="wt-form-panel">
    <!-- 表单外层容器 -->
    <el-form
      ref="form"
      label-position="right"
      label-width="130px"
      :model="dataSource"
    >
      <el-row class="form-row" :gutter="5">
        <el-col
          v-for="(field, index) in fields"
          :key="index"
          :span="field.span || 6"
          :md="field.span || 6"
          :sm="field.span || 8"
          :xs="field.span || 12"
        >
          <!-- 表单域 -->
          <el-form-item
            :label="field.label?field.label+'：':''"
            :prop="field.prop || ''"
            :rules="field.rules || []"
          >
            <!-- 文本框 -->
            <el-input
              v-if="field.type==='input' || field.type==='textarea'"
              v-model="dataSource[field.prop]"
              :title="dataSource[field.prop]"
              :type="field.type || 'input'"
              :rows="field.rows || 2"
              :disabled="disabled || field.disabled || (mode === 'edit' && field.editDisabled) || false"
              :maxlength="field.maxlength"
              :placeholder="field.placeholder || '请输入'"
              :style="{width: field.width || '100%'}"
              :show-word-limit="field.showWord"
              v-bind="field.otherConfig"
              @click="handleClick(field, $event)"
              @blur="handleBlur(field, $event)"
              @focus="handleFocus(field, $event)"
              @change="handleChange(field.prop)"
            ></el-input>
            <!-- 数字文本框 -->
            <el-input
              v-if="field.type==='number'"
              v-model.number="dataSource[field.prop]"
              :disabled="disabled || field.disabled || (mode === 'edit' && field.editDisabled) || false"
              :placeholder="field.placeholder"
              :style="{width: field.width || '100%'}"
              v-bind="field.otherConfig"
              @click="handleClick"
              @blur="handleBlur"
              @focus="handleFocus"
              @change="handleChange(field.prop)"
            ></el-input>
            <!-- 按钮 -->
            <el-button
              v-else-if="field.type==='button'"
              :disabled="disabled || field.disabled || (mode === 'edit' && field.editDisabled) || false"
              v-bind="field.otherConfig"
              @click="onFieldButtonClick(field)"
            >
              {{ field.text }}
            </el-button>
            <!-- 选择框 -->
            <!-- <span v-else-if="field.type==='select'"> {{ options.carrierId }}</span> -->
            <el-select
              v-else-if="field.type==='select'"
              v-model="dataSource[field.prop]"
              :style="{width: field.width || '100%'}"
              placeholder="请选择"
              :disabled="disabled || field.disabled || (mode === 'edit' && field.editDisabled) || false"
              style="width: 100%" v-bind="field.otherConfig"
              :remote-method="remoteMethod"
              @change="changeSelect(field, options[field.prop])"
            >
              <el-option
                v-for="item in options[field.prop]"
                :key="item[field.value] || item.itemValue"
                :label="item[field.text] || item.description"
                :value="item[field.value] || item.itemValue"
              >
              </el-option>
            </el-select>
            <!-- 日期选择器 -->
            <el-date-picker
              v-else-if="field.type==='datetime'||field.type==='date'||field.type==='time'"
              v-model="dataSource[field.prop]"
              :style="{width:'100%'}"
              placeholder="请选择"
              :type="field.type || 'date'"
              value-format="timestamp"
              v-bind="field.otherConfig"
              :disabled="disabled || field.disabled || (mode === 'edit' && field.editDisabled) || false"
            >
            </el-date-picker>
            <!-- 评分 -->
            <el-rate
              v-else-if="field.type==='rate'"
              v-model="dataSource[field.prop]"
              :disabled="disabled || field.disabled || (mode === 'edit' && field.editDisabled) || false" class="rate"
              v-bind="field.otherConfig"
            ></el-rate>
            <!-- 数字框 -->
            <el-input-number
              v-else-if="field.type==='input-number'"
              v-model="dataSource[field.prop]" :controls="false"
              :max="field.max" :min="field.min" :precision="field.precision"
              :style="{width: field.width || '100%'}"
              :disabled="disabled || field.disabled || (mode === 'edit' && field.editDisabled) || false"
              v-bind="field.otherConfig"
            ></el-input-number>
            <!-- 开关 -->
            <el-switch
              v-else-if="field.type==='switch'"
              v-model="dataSource[field.prop]"
              :disabled="disabled || field.disabled || (mode === 'edit' && field.editDisabled) || false"
              v-bind="field.otherConfig"
            ></el-switch>
            <!-- 滑块 -->
            <el-slider
              v-else-if="field.type==='slider'"
              v-model="dataSource[field.prop]"
              :style="{width:'95%',margin:'0 auto'}"
              :disabled="disabled || field.disabled || (mode === 'edit' && field.editDisabled) || false"
              v-bind="field.otherConfig"
            ></el-slider>
            <!-- 单选框 -->
            <el-radio-group
              v-else-if="field.type==='radio'"
              v-model="dataSource[field.prop]"
              :disabled="disabled || field.disabled || (mode === 'edit' && field.editDisabled) || false"
              v-bind="field.otherConfig"
            >
              <el-radio v-for="item in options[field.prop]" :key="item.value" :label="item.value">
                {{ item.text }}
              </el-radio>
            </el-radio-group>
            <!-- 多选框 -->
            <el-checkbox-group
              v-else-if="field.type==='checkbox'"
              v-model="dataSource[field.prop]"
              :disabled="disabled || field.disabled || (mode === 'edit' && field.editDisabled) || false"
              v-bind="field.otherConfig"
            >
              <el-checkbox v-for="item in options[field.prop]" :key="item.value" :label="item.value">
                {{ item.text }}
              </el-checkbox>
            </el-checkbox-group>
            <!-- 上传文件 -->
            <el-upload
              v-else-if="field.type==='upload'"
              class="upload-demo"
              :style="{width: field.width || '100%'}"
              action="https://jsonplaceholder.typicode.com/posts/"
              :http-request="httpRequest"
              :before-upload="beforeUpload"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="field.limit"
              :on-exceed="handleExceed"
              :file-list="fileList[field.prop]"
              v-bind="field.otherConfig"
              :on-change="onChange"
              :on-success="onSuccess"
              :on-preview="onPreview"
            >
              <el-button size="small" type="primary"
                         :disabled="disabled || field.disabled || (mode === 'edit' && field.editDisabled) || false"
              >
                点击上传
              </el-button>
              <div slot="tip" class="el-upload__tip">
                <!-- 只能上传jpg/png文件，且不超过500kb -->
              </div>
            </el-upload>
            <!-- 自定义插槽 -->
            <slot
              v-else-if="!field.type"
              :name="field.prop"
              :field="field"
            >
              <!-- {{ dataSource[field.prop] }} -->
            </slot>
            <p v-if="field.hint" class="hint">
              {{ field.hint }}
            </p>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    mode: { // 查看方式
      type: String,
      default: ''
    },
    options: { // 下拉菜单或者多选框/单选框的list
      type: Object,
      default: () => ({})
    },
    fields: { // 需要渲染的表单
      type: Array,
      default: () => []
    },
    dataSource: { // 表单对应的搜索值
      type: Object,
      default: () => {}
    },
    disabled: { // 设置整个表单是否禁用
      type: Boolean,
      default: false
    },
    fileList: { // 上传文件
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleClick(field, event) {
      this.$emit('click', this, field, event)
    },
    handleBlur(field, event) {
      this.$emit('blur', this, field, event)
    },
    handleFocus(field, event) {
      this.$emit('focus', this, field, event)
    },
    handleChange(prop) {
      this.$emit('change', this, prop, event.target.value)
    },
    // 修改下拉菜单
    changeSelect(filed, list) {
      this.$emit('changeSelect', filed, list)
    },
    // 重置表单
    resetForm() {
      this.$refs['form'].resetFields()
    },
    // 远程搜索
    remoteMethod(query) {
      this.$emit('remoteMethod', query)
    },
    // 验证表单
    validate(callback) {
      let valid = true
      this.$refs['form'].validate((isValid) => {
        if (isValid) {
          valid = true
        } else {
          valid = false
        }
        callback(valid)
      })
    },
    // 移除之前
    beforeRemove(file) {
      let flag = true
      flag = this.$confirm('确定要移除该文件吗', '温馨提示', {
        type: 'warning'
      })
      return flag
    },
    handleRemove(file) {
      this.$emit('removeFile', file)
    },
    // 上传之前
    beforeUpload(file) {
      // 判断文件大小是不是有值
      if (file.size === 0) return this.$message.warning('上传的文件不能为空')
      // this.$emit('uploadFile', file)
    },
    // 文件上传
    onChange(file, fileList) {
      this.$emit('uploadFile', file)
    },
    onSuccess(response, file, fileList) {
      console.log('response, file, fileList', response, file, fileList)
    },
    httpRequest() {
    },
    onPreview(file) {
      this.$emit('onPreview', file)
    },
    handleExceed(file, fileList) {
      return this.$message.warning('你已超过上限数量')
    },
    // 点击按钮
    onFieldButtonClick(filed) {

    }
  }
}
</script>
<style lang='scss' scoped>
.rate {
  margin-top: 10px;
}
.hint {
  color: #aaa;
  font-size: 12px;
}
.form-row {
  display: flex;
  flex-wrap: wrap;
}
</style>
