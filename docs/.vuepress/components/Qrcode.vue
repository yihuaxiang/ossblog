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
.vue-notification-group{display:block;position:fixed;z-index:5000}.vue-notification-wrapper{display:block;overflow:hidden;width:100%;margin:0;padding:0}.notification-title{font-weight:600}.vue-notification-template{background:#fff}.vue-notification,.vue-notification-template{display:block;box-sizing:border-box;text-align:left}.vue-notification{font-size:12px;padding:10px;margin:0 5px 5px;color:#fff;background:#44a4fc;border-left:5px solid #187fe7}.vue-notification.warn{background:#ffb648;border-left-color:#f48a06}.vue-notification.error{background:#e54d42;border-left-color:#b82e24}.vue-notification.success{background:#68cd86;border-left-color:#42a85f}.vn-fade-enter-active,.vn-fade-leave-active,.vn-fade-move{transition:all .5s}.vn-fade-enter,.vn-fade-leave-to{opacity:0}
</style>
