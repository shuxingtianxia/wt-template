<template>
  <transition name="wt-message-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      :class="[
        'wt-message',
        assist ? 'wt-message__assist' : '',
        `wt-message--${ type }`,
        center ? 'is-center' : '',
        showClose ? 'is-closable' : '',
        customClass
      ]"
      :style="positionStyle"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <i :class="typeClass"></i>
      <slot>
        <div>
          <p v-if="assist" class="wt-message__title">
            {{ title || titleText }}
          </p>
          <p v-if="!dangerouslyUseHTMLString" class="wt-message__content">
            {{ message }}
          </p>
        </div>
        <!-- <p v-else class="el-message__content"></p> -->
      </slot>
      <i v-if="showClose" class="el-message__closeBtn el-icon-close" @click="close"></i>
    </div>
  </transition>
</template>

<script>
const typeMap = {
  success: 'success',
  primary: 'warning',
  warning: 'warning',
  danger: 'error'
}
const titleMap = {
  success: '操作成功！',
  primary: '帮助信息',
  warning: '请注意！',
  danger: '操作失败！'
}
export default {
  name: 'WtMessage',
  data() {
    return {
      visible: true,
      assist: false, // 是不是辅助型
      message: '', // 提示信息
      title: '', // 标题
      duration: 3000,
      type: 'primary', // 状态
      customClass: '',
      onClose: null,
      showClose: false,
      closed: false,
      verticalOffset: 0,
      timer: null,
      dangerouslyUseHTMLString: false,
      center: false
    }
  },
  computed: {
    typeClass() {
      return this.type ? `wt-message__icon el-icon-${typeMap[this.type]}` : ''
    },
    titleText() {
      return titleMap[this.type]
    },
    positionStyle() {
      return {
        'top': `${this.verticalOffset}px`
      }
    }
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false
      }
    }
  },
  mounted() {
    this.startTimer()
    document.addEventListener('keydown', this.keydown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown)
  },
  methods: {
    handleAfterLeave() {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },
    clearTimer() {
      clearTimeout(this.timer)
    },

    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close()
          }
        }, this.duration)
      }
    },
    close() {
      this.closed = true
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
    }
  }
}
</script>

<style>

</style>
