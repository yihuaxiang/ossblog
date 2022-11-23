<template>
<div class="qrcode">
  <notifications position="top center"/>
  <div class="notice">
    您可在左侧输入内容，右侧会自动更新二维码。
  </div>
  <div class="ctn">
    <div class="textarea">
      <textarea placeholder="请输入内容"
                v-model.trim="rawText"
                name="" id="" cols="30" rows="10"></textarea>
      <div class="opt">
        <input type="number" min="1" max="20" v-model="loop" />
        <button class="loop" @click="handleLoopClick">循环编码</button>
      </div>
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
      rawText: '',
      loop: 5,
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
    async handleLoopClick() {
      console.info('handleLoopClick')
      if(!this.rawText || !(this.rawText.trim())) {
        this.$notify({
          type: 'warn',
          text: '请先输入需要编码的内容。'
        })
      } else {
        console.info('content is ', this.rawText);
        this.$notify({
          type: 'info',
          text: '渲染中，请稍后。'
        })
        const _this = this;

        async function render(content, num) {
          console.info('render', content, num);
          _this.$notify({
            type: 'info',
            text: `第${_this.loop - num}次渲染中`
          })
          if(num <= 0) {
            return content;
          } else {
            const base64 = await QRCode.toDataURL(content);
            const formData = new FormData();
            formData.append('base64', base64);
            const url = await fetch(`https://playground.z.wiki/img/upload/base64`, {
              body: formData,
              method: "post"
            }).then(res => res.text());
            return render(url, num - 1);
          }
        }

        const url = await render(this.rawText, this.loop)
        await this.render(url);
        this.$notify({
          type: 'success',
          text: '渲染成功。'
        })
      }
    },
    render: lodash.debounce(function(value) {
      const text = value || this.rawText;
      const qrcodeCanvas = document.querySelector('#qrcode-canvas');
      if(text) {
        QRCode.toCanvas(qrcodeCanvas, text, {
          width: 260,
          height: 260,
          color: {
            light: '#fafafa'
          }
        });
        console.log(QRCode.toDataURL(text))
      }
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
  position: relative;
}
.ctn .textarea .opt {
  position: absolute;
  left: 10px;
  bottom: 10px;
  display: flex;
}
.ctn .textarea .opt input {
  max-width: 40px;
  margin-right: 5px;
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
<style>
</style>
