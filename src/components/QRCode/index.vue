<template>
  <div ref="QRCode"/>
</template>
<script>
import QRCode from 'qrcodejs2'

export default {
  name: 'QRCode',
  props: {
    url: {
      type: String,
      required: false,
      default: document.location.href
    }
  },
  data() {
    return {
      qrcode: undefined
    }
  },
  mounted() {
    console.log("当前url:"+this.url)
    this.qrcode = new QRCode(this.$refs.QRCode, {
      text: this.url,
      width: 128,
      height: 128,
      colorDark : "#000000",
      colorLight : "#ffffff",
    })
  },
  beforeDestroy() {
    this.qrcode.clear()
  }
}
</script>
