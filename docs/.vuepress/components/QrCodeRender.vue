<template>
  <div class="qr-code-render">
    <img v-if="dataUri" :src="dataUri" />
  </div>
</template>

<script>
const QRCode = require('qrcode')

export default {
  name: "QrCodeRender",
  props: {
    text: String
  },
  data() {
    return {
      dataUri: null
    }
  },
  watch: {
    text: {
      immediate: true,
      handler(text) {
        QRCode.toDataURL(text).then(dataUri => {
          this.dataUri = dataUri;
        })
      }
    }
  }
}
</script>

<style scoped>
.qr-code-render {
}
.qr-code-render img {
  outline: 1px #ccc solid;
  box-shadow: 0px 0px 3px #ccc;
}
</style>
