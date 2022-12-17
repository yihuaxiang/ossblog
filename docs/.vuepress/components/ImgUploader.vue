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

  <div class="shared">
    <p class="title">获取分享文件：<input type="text" placeholder="请输入分享码,回车搜索" @keydown="getSharedFiles" @onpaste="getSharedFiles" /></p>
    <div class="share-records">
      <template v-for="item in shareList">
        <a :key="item.id" :href="item.url" target="_blank">{{item.fileName}}</a>
      </template>
    </div>
  </div>

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
const PREVENT_AUTO_COPY_KEY = 'PREVENT_AUTO_COPY_KEY';
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
      shareList: [],
    }
  },
  created() {
    if(globalThis.localStorage) {
      const preventAutoCopy = globalThis.localStorage.getItem(PREVENT_AUTO_COPY_KEY);
      if(preventAutoCopy) {
        this.autoCopyUrl = false;
      }
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
    },
    autoCopyUrl(v) {
      if(globalThis.localStorage) {
        if(v) {
          localStorage.removeItem(PREVENT_AUTO_COPY_KEY);
        } else {
          localStorage.setItem(PREVENT_AUTO_COPY_KEY, 'true');
        }
      }
    }
  },
  methods: {
    getSharedFiles(e) {
      e.stopPropagation();
      console.log('getSharedFiles', e.target.value);
      fetch(`https://playground.z.wiki/img/getByShareCode?shareCode=${e.target.value}`).then(res => res.json()).then(list => {
        console.log('list is', list);
        this.shareList = list;
      })
    },
    handleChange(e) {
      this.autoCopyUrl = e.target.checked;
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
      console.info('handlePaste', event);
      if(event.target.tagName == 'INPUT' && event.target.type == 'text') {
        return;
      }
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
</style>
