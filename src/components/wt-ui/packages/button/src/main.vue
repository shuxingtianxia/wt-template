<template>
  <button
    class="wt-button"
    :disabled="buttonDisabled || loading"
    :type="nativeType"
    :class="[
      type ? 'wt-button--' + type : '',
      buttonSize ? 'wt-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading
      }
    ]"
    @click="handleClick"
  >
    <i v-if="loading" class="el-icon-loading"></i>
    <i v-if="icon && !loading" :class="icon"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
export default {
  name: 'WtButton',

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  props: {
    type: {
      type: String,
      default: 'default',
      validator(type) {
        if (
          type &&
          !['warning', 'default', 'danger', 'info', 'primary'].includes(type)
        ) {
          console.log(
            '组件的type类型必须为:' +
              ['warning', 'default', 'danger', 'info', 'primary'].join('、')
          )
        }
        return true
      }
    },
    size: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loading: Boolean,
    disabled: Boolean
  },

  computed: {
    buttonSize() {
      return this.size || (this.$ELEMENT || {}).size
    },
    buttonDisabled() {
      return this.disabled
    }
  },

  methods: {
    handleClick(evt) {
      this.$emit('click', evt)
    }
  }
}
</script>
