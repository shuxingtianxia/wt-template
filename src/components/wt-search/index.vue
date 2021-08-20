<template>
  <div class="wt-search" :class="searchMore ? 'h-auto' : ''" :style="{ height: toggleBtnVisible ? 'auto' : searchHeight }">
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
      <!-- 搜索内容 -->
      <div class="search-left-box">
        <el-form-item v-for="field in formConfig" :key="field.key" :label="field.label">
          <!--输入框-->
          <el-input
            v-if="field.type==='input'"
            v-model="formData[field.key]"
            :placeholder="`请输入${field.placeholder ? field.placeholder : ''}`"
            :style="{width:field.width+'px'}"
            :clearable="field.clearable || true"
            @keydown.enter.native="handleKeydown(field, $event, formData[field.key])"
            @blur="handleBlur(field, $event, formData[field.key])"
            @focus="handleFocus(field, $event, formData[field.key])"
            @change="handleChange(field.key)"
          >
          </el-input>
          <!-- 选择框 -->
          <el-select
            v-else-if="field.type==='select'"
            v-model="formData[field.key]"
            placeholder="请选择"
            :clearable="field.clearable || true"
            :disabled="field.disabled || false" style="width: 100%"
            @change="onElSelectChange(field, options[field.key])"
          >
            <el-option
              v-for="op in options[field.key] || []"
              :key="op[field.value] || op.value"
              :label="op[field.text] || op.text"
              :value="op[field.value] || op.value"
            ></el-option>
          </el-select>
          <!-- 日期选择器 -->
          <el-date-picker
            v-else-if="field.type==='datetime'||field.type==='date'||field.type==='time'||field.type==='datetimerange'"
            v-model="formData[field.key]"
            :style="{width:'100%'}"
            :clearable="field.clearable || true"
            placeholder="请选择"
            :type="field.type || 'date'"
            :disabled="field.disabled || false"
            value-format="timestamp"
            :default-time="['00:00:00', '23:59:59']"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit1">
            查询
          </el-button>
          <el-button @click="resetForm">
            重置
          </el-button>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <slot name="formButton"></slot>
        </el-form-item>
      </div>
      <!-- 搜索按钮 -->
      <div v-if="false" class="search-group-cli">
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
      </div>
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
    }
  },
  data() {
    return {
      toggleBtnVisible: true,
      formData: { ...this.searchData },
      searchMore: false
    }
  },
  computed: {
    // 判断查询form区域是否显示
    showFormJudge() {
      const bol = this.formConfig.length > 0 || this.$scopedSlots.formItem || this.$scopedSlots.formButton || this.enableConfig && this.enableConfig.showExportBtn.show
      return bol
    },
    moreMsg() {
      return this.searchMore ? '收起查询' : '更多查询'
    },
    // 根据 showLineNumber 参数返回组件显示的行数
    searchHeight() {
      const number = Math.abs(parseInt(this.showLineNumber))
      return number - 1 ? (number - 1) * 44 + 52 + 'px' : '52px'
    },
    ...mapState('size', [
      'value'
    ])
  },
  mounted() {
    this.$nextTick(() => {
      const height = this.$refs.ruleForm.$el.clientHeight
      let elH = 57
      switch (this.value) {
        case 'default':
          elH = 72
          break
        case 'medium':
          elH = 68
          break
        case 'small':
          elH = 61
          break
        case 'mini':
          elH = 57
          break
      }
      this.toggleBtnVisible = height > elH * this.showLineNumber
    })
  },
  methods: {
    handleSubmit: function(e) {
      const copySearch = this.getFormData()
      this.$emit('submit', copySearch)
    },
    // 点击查询
    handleSubmit1() {
      this.handleSubmit()
      this.searchMore = false
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
        if (fields[j].valueType === 'int' && copySearch[fields[j].key]) {
          copySearch[fields[j].key] = Number(copySearch[fields[j].key])
        } else if ((fields[j].type === 'date' || fields[j].type === 'datetime' || fields[j].type === 'datepicker' || fields[j].type === 'datetimerange') && copySearch[fields[j].key]) {
          // 类型为时间，时间转换时间戳
          // 时间范围类处理
          if (fields[j].type === 'datetimerange' || fields[j].type === 'daterange') {
            const value = copySearch[fields[j].key]
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

            copySearch[fields[j].startField] = valStart
            copySearch[fields[j].endField] = valEnd
            // 跟其他name重名则不删除
            if (fields[j].key !== fields[j].startField && fields[j].key !== fields[j].endField) {
              delete copySearch[fields[j].key]
            }
          } else {
            copySearch[fields[j].key] = Math.trunc(
              new Date(copySearch[fields[j].key]).getTime()
            )
          }
        } else if ((fields[j].type === 'area' && fields[j].subNames) || (fields[j].type === 'oldarea' && fields[j].subNames)) {
          // 类型为area的将value分别赋值给对应的subNames
          const subNames = fields[j].subNames
          const key = fields[j].key
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
          for (let i = 0; i < subNames.length; i++) {
            if (key === subNames[i]) {
              sameName = true
              break
            }
          }
          if (!sameName) {
            delete copySearch[key]
          }
        } else if (fields[j].type === 'slot') {
          const key = fields[j].key
          delete copySearch[key]
        }
      }
      Object.assign(copySearch, this.slotData)
      return copySearch
    },
    handleKeydown(field, event, value) {
      this.$emit('handleKeydown', field, event, value)
    },
    handleBlur(field, event, value) {
      this.$emit('handleBlur', field, event, value)
    },
    handleFocus() {

    },
    handleChange() {

    },
    toggleSearchBtn() {
      this.searchMore = !this.searchMore
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
  height: 52px;
  min-height: 52px;
  border-bottom: 1px solid #eff7fa;
  font-size: 12px;
  z-index: 1999 !important;
  overflow: hidden !important;
  display: flex;
  flex-direction: column;
  &.h-auto {
    overflow: visible !important;
    height: auto !important;
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
</style>
