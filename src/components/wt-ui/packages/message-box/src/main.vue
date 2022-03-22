<template>
  <!-- BEM：块（block）、元素（element）、修饰符（modifier） -->
  <transition name="msgbox-fade">
    <div v-show="visible" class="wt-message-box__wrapper">
      <div class="wt-message-box">
        <div class="wt-message-box__header">
          <i class="iconfont icon-icon_delete_pop-22 close" @click="handleAction('cancel')"></i>
        </div>
        <div class="wt-message-box__content">
          <div class="wt-message-box__status">
            <img :src="require(`@/assets/images/msgBox/icon_${type}.png`)" alt="">
          </div>
          <div class="wt-message-box__message">
            <p class="wt-message-box__message--main">
              {{ message }}
            </p>
            <p class="wt-message-box__message--tip" :class="type ? 'wt-message-box__message--'+type : ''">
              {{ tip }}
            </p>
          </div>
        </div>
        <div class="wt-message-box__btns">
          <wt-button
            size="small"
            :loading="loading"
            @click.native="handleAction('cancel')"
            @keydown.enter="handleAction('cancel')"
          >
            {{ cancelButtonText }}
          </wt-button>
          <wt-button
            ref="confirm"
            :loading="loading"
            type="primary"
            size="small"
            @click.native="handleAction('confirm')"
            @keydown.enter="handleAction('confirm')"
          >
            {{ confirmButtonText }}
          </wt-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'WtMessageBox',
  data() {
    return {
      loading: false,
      visible: false,
      hoverClose: false,
      cancelButtonText: '',
      confirmButtonText: '',
      type: 'primary',
      message: '',
      tip: ''
    }
  },
  methods: {
    // 按钮点击
    handleAction(action) {
      this.action = action
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(action, this, this.close)
      } else {
        this.doClose()
      }
    },
    doClose() {
      if (!this.visible) return
      this.visible = false
      // 调用confirm / cancel函数
      this[this.action]()
    },
    close() {
      this.doClose()
    }
  }
}
</script>
