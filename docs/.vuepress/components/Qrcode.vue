<template>
<div class="qrcode">
  <div class="notice">
    您可在左侧输入内容，右侧会自动更新二维码。
  </div>
  <div class="ctn">
    <div class="textarea">
      <textarea placeholder="请输入内容"
                v-model="rawText"
                name="" id="" cols="30" rows="10"></textarea>
    </div>
    <div class="qrcode-img">
      <canvas width="260" height="260" v-show="!isEmpty" id="qrcode-canvas" />
      <div v-show="isEmpty" class="placeholder">
        二维码在此显示
      </div>
    </div>
  </div>
</div>
</template>

<script>
const lodash = require('lodash');
const QRCode = require('qrcode')
export default {
  name: "Qrcode",
  data() {
    return {
      rawText: ''
    }
  },
  watch: {
    rawText() {
      this.render();
    }
  },
  computed: {
    isEmpty() {
      return !this.rawText || !(this.rawText.trim())
    }
  },
  methods: {
    render: lodash.debounce(function() {
      const qrcodeCanvas = document.querySelector('#qrcode-canvas');
      if(this.rawText) {
        QRCode.toCanvas(qrcodeCanvas, this.rawText, {
          width: 260,
          height: 260,
          color: {
            light: '#fafafa'
          }
        });
      }
      console.info('render qrcode');
    }, 100)
  }
}
</script>

<style scoped>
.qrcode {
  font-size: 14px;
}
.notice {

}
.ctn {
  display: flex;
  margin-top: 20px;
}
.ctn .textarea {
  flex-grow: 1;
  padding-right: 10px;
}
.ctn .textarea textarea {
  box-sizing: border-box;
  display: block;
  height: 100%;
  width: 100%;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 3px;
  resize:none;
  padding: 10px;
  outline: none;
}
.ctn .textarea textarea:focus {
  box-shadow: rgb(0 0 0 / 8%) 0px 1px 4px;
}
.ctn .qrcode-img {
  width: 260px;
  height: 260px;
}
.ctn .qrcode-img .placeholder {
  line-height: 260px;
  text-align: center;
  color: #ccc;
  background: #fafafa;
}
</style>
