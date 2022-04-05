<template>
<div class="img-uploader">
  <input  @change="uploadFile($event)" type="file">
  <br>
  <br>
  <div class="preview">
    <img width="200px" :src=valueUrl  v-if="valueUrl">
  </div>
  <template v-if="loading">
    <span class="loading">上传中...</span>
  </template>
  <template v-else>
    <template v-if="valueUrl">
      <br>
      <div class="result">
        <input type="text" v-model="valueUrl" readonly />
        <button @click="handleCopy">
          {{notice || '点此复制'}}
        </button>
      </div>
    </template>
  </template>
</div>
</template>

<script>
export default {
  name: "ImgUploader",
  data() {
    return {
      valueUrl: undefined,
      loading: false,
      notice: undefined
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
        this.loading = true;
        this.valueUrl = undefined;
        const formData = new FormData();  // 创建一个formdata对象
        formData.append('file', file);
        fetch('https://playground.fudongdong.com/img/upload', {
          body: formData,
          method: 'post'
        }).then(res => res.text()).then(url => {
          console.info('url is ', url);
          this.valueUrl = url;
          this.loading = false;
        })
      } else {
        console.info('not found file')
      }
    },
    handleCopy() {
      navigator.clipboard.writeText(this.valueUrl).then(() => {
        this.notice = '复制成功'
        setTimeout(() => {
          this.notice = undefined;
        }, 1000)
      });
    },
    uploadFile(el) {
      if (!el.target.files[0].size) return; // 如果文件大小为0，则返回
      if (el.target.files[0].type.indexOf('image') === -1) { //如果不是图片格式
        console.log('请选择图片文件');
      } else {
        const reader = new FileReader(); // 创建读取文件对象
        reader.readAsDataURL(el.target.files[0]); // 发起异步请求，读取文件
        this.loading = true;
        this.valueUrl = undefined;
        reader.onload = function () {  // 文件读取完成后
          // 读取完成后，将结果赋值给img的src
          this.valueUrl = this.result;
        };
        const formData = new FormData();  // 创建一个formdata对象
        formData.append('file', el.target.files[0]);
        fetch('https://playground.fudongdong.com/img/upload', {
          body: formData,
          method: 'post'
        }).then(res => res.text()).then(url => {
          console.info('url is ', url);
          this.valueUrl = url;
          this.loading = false;
        })
      }
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
