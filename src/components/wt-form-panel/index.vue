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
            <!-- 数字框 -->
            <el-input-number
              v-else-if="field.type==='number'"
              v-model="dataSource[field.prop]" :controls="false"
              :max="field.max" :min="field.min" :precision="field.precision"
              :style="{width: field.width || '100%'}"
              :disabled="disabled || field.disabled || (mode === 'edit' && field.editDisabled) || false"
              v-bind="field.otherConfig"
              @click="handleClick(field, $event)"
              @blur="handleBlur(field, $event)"
              @focus="handleFocus(field, $event)"
              @change="handleChange(field.prop)"
            ></el-input-number>
            <!-- 整数数字框 -->
            <el-input-number
              v-else-if="field.type==='integer'"
              v-model="dataSource[field.prop]"
              :controls="false"
              :max="field.max" :min="field.min"
              :precision="field.precision"
              :style="{width: field.width || '100%'}"
              :disabled="disabled || field.disabled || (mode === 'edit' && field.editDisabled) || false"
              v-bind="field.otherConfig"
              @click="handleClick(field, $event)"
              @blur="handleBlur(field, $event)"
              @focus="handleFocus(field, $event)"
              @change="changeInteger(field, $event)"
            ></el-input-number>
            <!-- 浮点数字框 -->
            <el-input-number
              v-else-if="field.type==='float'"
              v-model="dataSource[field.prop]"
              :controls="false"
              :max="field.max" :min="field.min"
              :precision="field.precision"
              :style="{width: field.width || '100%'}"
              :disabled="disabled || field.disabled || (mode === 'edit' && field.editDisabled) || false"
              v-bind="field.otherConfig"
              @click="handleClick(field, $event)"
              @blur="handleBlur(field, $event)"
              @focus="handleFocus(field, $event)"
              @change="handleChange(field.prop)"
            ></el-input-number>
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
            <!-- <el-input-number
              v-else-if="field.type==='input-number'"
              v-model="dataSource[field.prop]" :controls="false"
              :max="field.max" :min="field.min" :precision="field.precision"
              :style="{width: field.width || '100%'}"
              :disabled="disabled || field.disabled || (mode === 'edit' && field.editDisabled) || false"
              v-bind="field.otherConfig"
            ></el-input-number> -->
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
            <!-- 上传图片 -->
            <wt-upload-picture v-else-if="field.type==='image'" :file-lists="dataSource[field.prop]" @onComplete="onComplete" @handleRemove="handleRemove"></wt-upload-picture>
            <!-- 富文本 -->
            <vm-tinyMCE v-else-if="field.type==='rich'" :tinymce-html.sync="dataSource[field.prop]" :height="field.height"></vm-tinyMCE>
            <!-- 上传文件 -->
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
import wtUploadPicture from '@/components/wt-upload-picture'
export default {
  name: '',
  components: {
    wtUploadPicture
  },
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
    }
  },
  data() {
    return {
    }
  },
  methods: {
    // 整数校验
    changeInteger(field, val) {
      console.log('val', parseInt(val))
      this.dataSource[field.prop] = parseInt(val) || undefined
      this.$emit('changeInteger', field, val)
    },
    // 点击事件
    handleClick(field, event) {
      this.$emit('click', this, field, event)
    },
    // 失去焦点
    handleBlur(field, event) {
      this.$emit('blur', this, field, event)
    },
    // 获得焦点
    handleFocus(field, event) {
      this.$emit('focus', this, field, event)
    },
    // change事件
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
    // 点击按钮
    onFieldButtonClick(filed) {

    },
    // 删除图片
    handleRemove(index, type) {
      this.$emit('removeFile', index, type)
    },
    // 图片上传成功
    onComplete(url, type) {
      this.$emit('onComplete', url, type)
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
