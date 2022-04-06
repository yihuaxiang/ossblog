<template>
<div class="img-uploader">
  <input  @change="uploadFile($event)" type="file">
  <br>
  <br>
  <div class="preview">
    <img width="200px" :src=valueUrl  v-if="valueUrl">
  </div>
  <template v-if="loading">
    <span class="loading">
      上传中...({{percent || '-'}}%)
    </span>
  </template>
  <template v-else>
    <template v-if="valueUrl">
      <br>
      <div class="result">
        <input type="text" v-model="valueUrl" readonly />
        <button @click="handleCopy">
          {{'点此复制'}}
        </button>
      </div>
    </template>
  </template>
  <notifications position="top center"/>
</div>
</template>

<script>
import Notifications from 'vue-notification';
const axios = require('axios').default;
export default {
  name: "ImgUploader",
  data() {
    return {
      valueUrl: undefined,
      loading: false,
      percent: undefined,
    }
  },
  mounted() {
    document.addEventListener('paste', this.handlePaste);
  },
  unmounted() {
    document.removeEventListener('paste', this.handlePaste);
  },
  methods: {
    handlePaste(event) {
      console.info('handlePaste')
      const items = (event.clipboardData || window.clipboardData).items;
      let file = null;
      if (items && items.length) {
        // 搜索剪切板items
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            file = items[i].getAsFile();
            break;
          }
        }
      }
      if(file) {
        this.postFile(file);
      } else {
        console.info('not found file')
        this.$notify({
          type: 'warn',
          text: '剪切板中未找到任何照片。'
        })
      }
    },
    handleCopy() {
      navigator.clipboard.writeText(this.valueUrl).then(() => {
        this.$notify({
          type: 'success',
          text: '已复制。'
        })
      });
    },
    uploadFile(el) {
      if (!el.target.files[0].size) return; // 如果文件大小为0，则返回
      if (el.target.files[0].type.indexOf('image') === -1) { //如果不是图片格式
        this.$notify({
          type: 'error',
          text: '请选择图片文件。'
        })
      } else {
        this.postFile(el.target.files[0]);
      }
    },
    // 上传文件
    postFile(file) {
      const reader = new FileReader(); // 创建读取文件对象
      reader.readAsDataURL(file); // 发起异步请求，读取文件
      this.loading = true;
      this.valueUrl = undefined;
      this.percent = 0;
      reader.onload = function () {  // 文件读取完成后
        // 读取完成后，将结果赋值给img的src
        this.valueUrl = this.result;
      };
      const formData = new FormData();  // 创建一个formdata对象
      formData.append('file', file);
      axios.request({
        method: 'post',
        url: 'https://playground.fudongdong.com/img/upload',
        data: formData,
        onUploadProgress: (p) => {
          this.percent = Math.floor(p.loaded / p.total * 100)
        }
      }).then(res => {
        const url = res.data;
        console.info('url is ', url);
        this.valueUrl = url;
        this.loading = false;
        this.$notify({
          type: 'success',
          text: '已上传成功。'
        })
      })
    }
  }
}
</script>

<style scoped>
.img-uploader {

}
.img-uploader.loading{

}
</style>
