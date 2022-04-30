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
          {{'复制网址'}}
        </button>
      </div>
      <div class="result">
        <input type="text" :value="base64Value && base64Value.substring(0, 100) + '...'" readonly />
        <button @click="handleCopyBase64">
          {{'复制base64'}}
        </button>
      </div>
    </template>
  </template>
  <notifications position="top center"/>

  <div class="history">
    <p class="title">上传历史：</p>
    <div class="records">
      <template v-for="record in records">
        <div class="record" :key="record.id" @click="handleClick(record)">
          <img class="icon" :src="record.url" width="100" height="100" />
          <span class="name">{{record.fileName}}</span>
        </div>
      </template>
    </div>
  </div>
</div>
</template>

<script>
const axios = require('axios').default;
const lodash = require('lodash');
const { v4 } = require('uuid');
export default {
  name: "ImgUploader",
  data() {
    return {
      valueUrl: undefined,
      base64Value: undefined,
      loading: false,
      percent: undefined,
      records: undefined,
      uuid: undefined
    }
  },
  mounted() {
    document.addEventListener('paste', this.handlePaste);
    this.createUserId();
    this.reloadHistory();
  },
  unmounted() {
    document.removeEventListener('paste', this.handlePaste);
  },
  methods: {
    createUserId() {
      if (!localStorage.getItem('fdd_uid')) {
        localStorage.setItem('fdd_uid', v4().replaceAll('-', ''));
      }
      this.uuid = localStorage.getItem('fdd_uid');
    },
    reloadHistory() {
      fetch(`https://playground.z.wiki/img/history?uid=${this.uuid}`).then(res => res.json()).then(records => {
        this.records = records;
      })
    },
    handleClick(record) {
      navigator.clipboard.writeText(record.url).then(() => {
        this.$notify({
          type: 'success',
          text: '已复制。'
        })
      });
    },
    handlePaste(event) {
      console.info('handlePaste')
      const items = (event.clipboardData || window.clipboardData).items;
      const item = lodash.find(items, item => {
        return item.type.indexOf('image') >= 0 || item.type.indexOf('video') >= 0;
      })
      const file = item?.getAsFile();
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
    handleCopyBase64() {
      navigator.clipboard.writeText(this.base64Value).then(() => {
        this.$notify({
          type: 'success',
          text: '已复制。'
        })
      });
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
      this.base64Value = undefined;
      this.percent = 0;
      reader.onload = function () {  // 文件读取完成后
        // 读取完成后，将结果赋值给img的src
        this.valueUrl = this.result;
      };
      const formData = new FormData();  // 创建一个formdata对象
      formData.append('file', file);
      formData.append('fileName', file.name);
      formData.append('uid', this.uuid);
      axios.request({
        method: 'post',
        url: 'https://playground.z.wiki/img/upload',
        data: formData,
        onUploadProgress: (p) => {
          this.percent = Math.floor(p.loaded / p.total * 100)
        }
      }).then(res => {
        const record = res.data;
        const url = record.url;
        console.info('url is ', url);
        this.valueUrl = url;
        this.base64Value = record.base64;
        this.loading = false;
        this.$notify({
          type: 'success',
          text: '已上传成功。'
        })
        this.reloadHistory();
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

.records {
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
  align-items: baseline;

}
.record {
  margin-right: 21px;
  margin-bottom: 15px;
  position: relative;
  cursor: pointer;
  box-shadow: 0px 0px 1px #ccc;
  transition: all 0.5s ease;
}

@media screen and (max-width: 395px) {
  .record {
    margin-right: 14px;
  }
}
@media screen and (max-width: 375px) {
  .record {
    margin-right: 8px;
  }
}
@media screen and (max-width: 360px) {
  .record {
    margin-right: 4px;
  }
}

.record .name {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 20px;
  line-height: 20px;
  background-color: #cccc;
  white-space: nowrap;
  overflow: hidden;
  padding-left: 8px;
  text-overflow: ellipsis;
}
.record:hover {
  box-shadow: 0px 0px 7px #999;
}
</style>
<style>
.vue-notification-group{display:block;position:fixed;z-index:5000}.vue-notification-wrapper{display:block;overflow:hidden;width:100%;margin:0;padding:0}.notification-title{font-weight:600}.vue-notification-template{background:#fff}.vue-notification,.vue-notification-template{display:block;box-sizing:border-box;text-align:left}.vue-notification{font-size:12px;padding:10px;margin:0 5px 5px;color:#fff;background:#44a4fc;border-left:5px solid #187fe7}.vue-notification.warn{background:#ffb648;border-left-color:#f48a06}.vue-notification.error{background:#e54d42;border-left-color:#b82e24}.vue-notification.success{background:#68cd86;border-left-color:#42a85f}.vn-fade-enter-active,.vn-fade-leave-active,.vn-fade-move{transition:all .5s}.vn-fade-enter,.vn-fade-leave-to{opacity:0}
</style>
