<template>
<div class="img-uploader">
  <div class="form-ctn">
    <div class="auto-copy-ctn">
      <input id="autoCopy" type="checkbox" :checked="autoCopyUrl" @change="handleChange">
      <label for="autoCopy">自动复制</label>
    </div>
    <input  @change="uploadFile($event)" type="file">
  </div>
  <br>
  <br>
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
    </template>
  </template>
  <notifications position="top center"/>

  <div class="history">
    <p class="title">上传历史：</p>
    <div class="records">
      <template v-for="record in records">
        <ImgPreview :data="record" :key="record.id" />
      </template>
    </div>
  </div>

  <OssPager :total="total" :page.sync="page" :page-size.sync="pageSize" />

</div>
</template>

<script>
import OssPager from "./OssPager";
import ImgPreview from './ImgPreview'
const axios = require('axios').default;
const lodash = require('lodash');
const { v4 } = require('uuid');
export default {
  name: "ImgUploader",
  components: {OssPager, ImgPreview},
  data() {
    return {
      autoCopyUrl: true, // 上传后是否自动复制网址
      valueUrl: undefined,
      base64Value: undefined,
      loading: false,
      percent: undefined,
      records: undefined, // 当前页的内容
      uuid: undefined,
      total: 0, // 总条数
      page: 1,
      pageSize: 20,
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
  watch: {
    page() {
      this.reloadHistory();
    },
    pageSize() {
      this.page = 1;
      this.reloadHistory();
    }
  },
  methods: {
    handleChange(e) {
      console.log('value changed', e.target);
    },
    createUserId() {
      if (!localStorage.getItem('fdd_uid')) {
        localStorage.setItem('fdd_uid', v4().replaceAll('-', ''));
      }
      this.uuid = localStorage.getItem('fdd_uid');
    },
    reloadHistory() {
      fetch(`https://playground.z.wiki/img/history?uid=${this.uuid}&page=${this.page}&pageSize=${this.pageSize}`).then(res => res.json()).then(pageData => {
        this.records = pageData.data;
        this.total = pageData.total;
      })
    },
    handlePaste(event) {
      console.info('handlePaste')
      const items = (event.clipboardData || window.clipboardData).items;
      console.log('items are', items);
      lodash.map(items, item => {
        console.info('item is ', item);
        const file = item && item.getAsFile();
        if(file) {
          this.postFile(file);
        } else {
          // 尝试读取剪切板中的内容
          if(item.type.match('^text/plain')) {
            item.getAsString(async (clipboardContent) => {
              const blob = await new Blob([clipboardContent]);
              const file = new File([blob], '来自剪切板的文本.txt', {
                type : "text/plain;charset=utf-8"
              });
              this.postFile(file);
            })
          } else {
            console.info('not found file')
            this.$notify({
              type: 'warn',
              text: '剪切板中未找到任何文件。'
            })
          }
        }
      })
    },
    handleCopy(record) {
      navigator.clipboard.writeText(record && record.url || this.valueUrl).then(() => {
        this.$notify({
          type: 'success',
          text: '已复制。'
        })
      });
    },
    uploadFile(el) {
      const files = el.target.files;
      lodash.map(files, file => {
        this.postFile(file);
      })
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
        console.log("upload.then");
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
        if (this.autoCopyUrl) {
          navigator.clipboard.writeText(url);
        }
        this.reloadHistory();
      }).catch(error => {
        this.$notify({
          type: 'error',
          text: error.response.data.message || '接口异常'
        })
        console.warn("upload.catch", error);
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

.result {
  display: flex;
  margin-bottom: 5px;
}
.form-ctn {
  display: flex;
  align-items: center;
}
.auto-copy-ctn {
  padding-right: 15px;
}
</style>
<style>
.vue-notification-group{display:block;position:fixed;z-index:5000}.vue-notification-wrapper{display:block;overflow:hidden;width:100%;margin:0;padding:0}.notification-title{font-weight:600}.vue-notification-template{background:#fff}.vue-notification,.vue-notification-template{display:block;box-sizing:border-box;text-align:left}.vue-notification{font-size:12px;padding:10px;margin:0 5px 5px;color:#fff;background:#44a4fc;border-left:5px solid #187fe7}.vue-notification.warn{background:#ffb648;border-left-color:#f48a06}.vue-notification.error{background:#e54d42;border-left-color:#b82e24}.vue-notification.success{background:#68cd86;border-left-color:#42a85f}.vn-fade-enter-active,.vn-fade-leave-active,.vn-fade-move{transition:all .5s}.vn-fade-enter,.vn-fade-leave-to{opacity:0}
</style>
