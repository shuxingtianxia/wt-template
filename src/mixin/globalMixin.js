export default {
  data() {
    return {

    }
  },
  created() {

  },
  methods: {
    // 取消操作，路由后退，关闭当前标签
    closeTag() {
      this.$store.dispatch('page/close', { tagName: this.$route.fullPath, isTo: 'page' })
    }
  }
}
