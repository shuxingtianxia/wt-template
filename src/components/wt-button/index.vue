<template>
  <div class="container" :class="isShowBorder ? 'border' : ''">
    <template v-for="(item, index) in buttonArr">
      <el-button v-if="!item.slotName && (item.code ? hasButtonPermission(item.code) : true)" :key="index" class="wt-button-item" :type="item.type" :icon="item.icon" :loading="btnLoading" :disabled="item.disabled" @click="handleClick(item.clickType)">
        {{ item.text }}
      </el-button>
      <slot v-else class="wt-slot" name="formButton"></slot>
    </template>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    btnLoading: {
      type: Boolean,
      default: false
    },
    buttonArr: {
      type: Array,
      default: () => []
    },
    isShowBorder: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleClick(type) {
      if (!type) return
      switch (type) {
        case 'back':
          this.closeTag()
          break
        case 'import': { // 导入
          console.log('123456', 123456)
          break
        }
        default:
          this.$emit('clickBtn', type)
          break
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.container {
  margin: 5px 0;
}
.border {
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
</style>
