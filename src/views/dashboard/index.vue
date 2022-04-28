<template>
  <div class="">
    <h1>首页</h1>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
    }
  },
  created() {
    console.log('this.$spi', this.$api.aaa({ a: 11 }, { id: 123 }))
  },
  methods: {
  }
}
</script>
<style lang='scss' scoped>
</style>
