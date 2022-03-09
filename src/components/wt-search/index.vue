<template>
  <div class="wt-search" :class="searchMore ? 'h-auto' : ''" :style="{ maxHeight: searchHeight }">
    <!-- 【1】搜索 -->
    <el-form
      v-if="showFormJudge"
      ref="ruleForm"
      class="form-box"
      :class="['form-container', searchMore ? '' : 'f-shrink']"
      :model="formData"
      inline
      @submit.native.prevent
    >
      <el-row class="form-row" :gutter="20">
        <el-col
          v-for="(field, index) in formConfig"
          :key="index"
          :span="rowSpan || 6"
          :md="colW || 8"
          :sm="colW || 12"
          :xs="colW || 24"
        >
          <el-form-item
            v-if="field.isShow"
            :label="field.label"
            :prop="field.prop || ''"
            :rules="field.rules || []"
          >
            <!-- 自定义label -->
            <template slot="label">
              <span>{{ field.label }}</span>
              <el-tooltip v-if="field.tip" class="item" effect="dark" :content="field.tip" placement="top-start">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </template>
            <!--输入框-->
            <el-input
              v-if="field.type==='input'"
              v-model="formData[field.prop]"
              :placeholder="`请输入${field.placeholder ? field.placeholder : ''}`"
              :style="{width:field.width+'px'}"
              :clearable="field.clearable || true"
              v-bind="field.otherConfig"
              @keydown.enter.native="handleKeydown(field, $event, formData[field.prop])"
              @blur="handleBlur(field, $event, formData[field.prop])"
              @focus="handleFocus(field, $event, formData[field.prop])"
              @change="handleChange(field.prop)"
            >
            </el-input>
            <!-- 选择框 -->
            <el-select
              v-else-if="field.type==='select'"
              v-model="formData[field.prop]"
              placeholder="请选择"
              :clearable="field.clearable || true"
              :disabled="field.disabled || false" style="width: 100%"
              v-bind="field.otherConfig"
              @change="onElSelectChange(field, options[field.prop])"
            >
              <el-option
                v-for="op in options[field.prop] || []"
                :key="op[field.value] || op.value"
                :label="op[field.text] || op.text"
                :value="op[field.value] || op.value"
              ></el-option>
            </el-select>
            <!-- 日期选择器 时间+时分秒  /  时间  /   时间+时分秒+区间  /   时间+区间 -->
            <el-date-picker
              v-else-if="field.type==='datetime'||field.type==='date'||field.type==='datetimerange'||field.type==='daterange'"
              v-model="formData[field.prop]"
              :style="{width:'100%'}"
              :clearable="field.clearable || true"
              placeholder="请选择"
              :type="field.type || 'date'"
              :disabled="field.disabled || false"
              v-bind="field.otherConfig"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col
          :span="rowSpan || 6"
          :md="colW || 8"
          :sm="colW || 12"
          :xs="colW || 24"
        >
          <slot :data="formData" name="formButton"></slot>
        </el-col>
        <el-col
          :span="rowSpan || 6"
          :md="colW || 8"
          :sm="colW || 12"
          :xs="colW || 24"
        >
          <el-form-item class="search-group-cli">
            <span v-if="toggleBtnVisible" class="more-serach" @click="toggleSearchBtn()">
              {{ moreMsg }}
              <i class="el-icon-d-arrow-left"></i>
            </span>
            <el-button v-if="true" type="primary" @click="handleSubmit1">
              查询
            </el-button>
            <el-button v-if="true" @click="resetForm">
              重置
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: '',
  props: {
    searchData: { // 搜索：formData
      type: Object,
      default: () => {}
    },
    formConfig: {
      type: Array,
      default: () => []
    },
    showLineNumber: {
      type: Number,
      default: 1
    },
    options: { // 下拉列表
      type: Object,
      default: () => ({})
    },
    rowSpan: {
      type: Number,
      default: 6
    }
  },
  data() {
    return {
      toggleBtnVisible: true,
      formData: { ...this.searchData },
      searchMore: false,
      colW: 0
    }
  },
  computed: {
    // 判断查询form区域是否显示
    showFormJudge() {
      const bol = this.formConfig.length > 0 || this.$scopedSlots.formItem || this.$scopedSlots.formButton
      return bol
    },
    moreMsg() {
      return this.searchMore ? '收起查询' : '更多查询'
    },
    // 根据 showLineNumber 参数返回组件显示的行数
    searchHeight() {
      const number = Math.abs(parseInt(this.showLineNumber))
      // 如果当前行
      if ((24 / this.colW) * (number - 1) - 1 >= this.formConfig.length) return 'auto'
      return number - 1 ? (number - 1) * 44 + 52 + 'px' : '52px'
    },
    ...mapState('size', [
      'value'
    ])
  },
  watch: {
    formData: {
      handler(val) {
        this.$bus.$emit('handleFormData', val)
      },
      deep: true
    },
    searchData: {
      handler(newVal, oldVal) {
        if (JSON.stringify(newVal) === JSON.stringify(oldVal)) return
        this.formData = { ...newVal }
      },
      immediate: false,
      deep: true
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.getRowSpan()
    })
    this.$nextTick(() => {
      this.getRowSpan()
    }, 100)
  },
  methods: {
    handleSubmit(e) {
      const copySearch = this.getFormData()
      console.log('copySearch', copySearch)
      this.$emit('submit', copySearch)
    },
    // 点击查询
    handleSubmit1() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.handleSubmit()
          this.getRowSpan()
        }
      })
    },
    // 重置
    resetForm() {
      this.formData = { ...this.searchData }
      this.handleSubmit()
    },
    // 给table的formData
    getFormData() {
      const formData = this.formData
      const copySearch = Object.assign({}, formData)
      for (const i in copySearch) {
        // 字符串前后空格去除
        if (copySearch[i] && typeof copySearch[i] === 'string') {
          copySearch[i] = copySearch[i].replace(/(^\s*)|(\s*$)/g, '')
        }
        // 空字符串置null
        if (copySearch[i] === '') {
          copySearch[i] = null
        }
      }

      const fields = this.formConfig
      for (let j = 0; j < fields.length; j++) {
        // 遍历fields，类型为int类型的转换
        if (fields[j].valueType === 'int' && copySearch[fields[j].prop]) {
          copySearch[fields[j].prop] = Number(copySearch[fields[j].prop])
        } else if ((fields[j].type === 'date' || fields[j].type === 'datetime' || fields[j].type === 'datetimerange' || fields[j].type === 'daterange') && copySearch[fields[j].prop]) {
          // 类型为时间，时间转换时间戳
          // 时间范围类处理
          if (fields[j].type === 'datetimerange' || fields[j].type === 'daterange') {
            const value = copySearch[fields[j].prop]
            var valStart = null
            var valEnd = null
            if (value[0] && value[1]) {
              valStart = Math.trunc(
                new Date(value[0]).getTime()
              )
              valEnd = Math.trunc(
                new Date(value[1]).getTime()
              )
            }
            // 如果开始时间和结束时间需要分两个不同的字段
            if (fields[j].startField && fields[j].endField) {
              copySearch[fields[j].startField] = valStart
              copySearch[fields[j].endField] = valEnd
              // 跟其他name重名则不删除
              if (fields[j].prop !== fields[j].startField && fields[j].prop !== fields[j].endField) {
                delete copySearch[fields[j].prop]
              }
            } else { // 开始时间和结束时间用逗号隔开
              copySearch[fields[j].prop] = value.join(',')
            }
          } else {
            copySearch[fields[j].prop] = Math.trunc(
              new Date(copySearch[fields[j].prop]).getTime()
            )
          }
        } else if ((fields[j].type === 'area' && fields[j].subNames) || (fields[j].type === 'oldarea' && fields[j].subNames)) {
          // 类型为area的将value分别赋值给对应的subNames
          const subNames = fields[j].subNames
          const key = fields[j].prop
          if (copySearch[key]) {
            for (var i = 0; i < subNames.length; i++) {
              if (copySearch[key][i]) {
                copySearch[subNames[i]] = copySearch[key][i]
              } else {
                copySearch[subNames[i]] = null
              }
            }
          }

          // 跟subNames重名则不删除
          let sameName = false
          for (let idx = 0; idx < subNames.length; idx++) {
            if (key === subNames[idx]) {
              sameName = true
              break
            }
          }
          if (!sameName) {
            delete copySearch[key]
          }
        } else if (fields[j].type === 'slot') {
          const key = fields[j].prop
          delete copySearch[key]
        }
      }
      return copySearch
    },
    handleKeydown(field, event, value) {
      this.handleSubmit1()
      this.$emit('handleKeydown', field, event, value)
    },
    handleBlur(field, event, value) {
      this.$emit('handleBlur', field, event, value)
    },
    handleFocus() {

    },
    handleChange() {

    },
    getRowSpan() {
      if (innerWidth < 768) {
        this.colW = 24
      } else if (innerWidth >= 768 && innerWidth < 992) {
        this.colW = 12
      } else if (innerWidth >= 992 && innerWidth < 1200) {
        this.colW = 8
      } else {
        this.colW = this.rowSpan
      }
      this.toggleBtnVisible = this.showLineNumber * (24 / this.colW) - 1 < this.formConfig.length
      this.searchMore = false
      this.splitFn()
    },
    // 点击是否显示更多按钮
    toggleSearchBtn() {
      this.searchMore = !this.searchMore
      if (this.searchMore) {
        this.formConfig.forEach((item, index) => {
          this.$set(item, 'isShow', true)
        })
      } else {
        // 显示多少条
        this.splitFn()
      }
    },
    // 显示和隐藏的函数
    splitFn() {
      const num = this.showLineNumber * (24 / this.colW)
      this.formConfig.forEach((item, index) => {
        if (index < num - 1) {
          this.$set(item, 'isShow', true)
        } else {
          this.$set(item, 'isShow', false)
        }
      })
    },
    onElSelectChange(value, key) {
      console.log('value, key', value, key)
    }
  }
}
</script>

<style lang='scss' scoped>
.wt-search {
  position: relative;
  // height: 52px;
  min-height: 52px;
  border-bottom: 1px solid #eff7fa;
  font-size: 12px;
  z-index: 1999 !important;
  overflow: hidden !important;
  display: flex;
  flex-direction: column;
  &.h-auto {
    overflow: auto !important;
    max-height: 140px !important;
    .search-group-cli{
      .more-serach{
        .el-icon-d-arrow-left {
        transform: rotate(90deg) scale(0.8);
        vertical-align: text-top;
        }
      }
    }
  }
  .form-container {
    display: flex;
    padding: 10px 20px 0;
    background-color: #fff;
  }
  .f-shrink {
      flex-shrink: 0;
  }
  .search-left-box {
    flex: 1;
    text-align: left;
  }
  .search-group-cli {
    text-align: right;
    .more-serach {
      padding-right: 15px;
      color: #3396fb;
      cursor: pointer;
      -webkit-user-select: none;
      .el-icon-d-arrow-left {
        padding-left: 3px;
        font-size: 12px;
        transform: rotate(-90deg) scale(0.8);
        vertical-align: text-bottom;
      }
    }
  }
}
.form-row {
  width: 100%;
}
::v-deep .el-form-item {
  width: 100%;
  display: flex;
}
::v-deep .el-form-item__content {
  display: flex;
  flex: 1;
}
::v-deep .el-tooltip {
  color: #ff8d1a;
}
</style>
