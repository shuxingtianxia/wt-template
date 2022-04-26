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
      websocketLink: 'wss://srmdev.wingtech.com/service1/wt-websocket/getMsg/srm/test?userAccount=user1',
      Socket: ''
    }
  },
  created() {
    this.createSocket(this.websocketLink)
  },
  methods: {
    createSocket(url) {
      this.Socket && this.Socket.close()
      if (!this.Socket) {
        this.Socket = new WebSocket(url)
        this.Socket.onopen = this.onopenWS
        this.Socket.onmessage = this.onmessageWS
        this.Socket.onerror = this.onerrorWS
        this.Socket.onclose = this.oncloseWS
      }
    },
    onopenWS() {},
    onmessageWS(e) {
      console.log('我是客户user1，我接收到消息了', e)
    },
    onerrorWS() {
      this.Socket.close()
      console.log('this.Socket', this.Socket)
      if (this.Socket.readyState !== 3) {
        this.Socket = null
        this.createSocket(this.websocketLink)
      }
    },
    oncloseWS() {
      if (this.Socket.readyState !== 2) {
        this.Socket = null
        this.createSocket(this.websocketLink)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
