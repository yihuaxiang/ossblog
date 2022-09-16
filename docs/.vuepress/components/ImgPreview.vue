<template>
  <div class="img-preview">
    <!--支持 zip 文件上传-->
    <template v-if="data.url.endsWith('.zip')">
      <img class="icon" src="https://0.z.wiki/autoupload/2022-08-16/4ce28595bb5f4b898f595bcd2f628f8d.zip.svg" width="100" height="100" />
    </template>
    <template v-else-if="data.url.endsWith('.pdf')">
      <img class="icon" src="https://0.z.wiki/autoupload/2022-09-09/995ec22a130649e1b8aed3d83a648781.pdf.svg" width="100" height="100" />
    </template>
    <template v-else>
      <img class="icon" :src="data.url" width="100" height="100" />
    </template>
    <span class="name">{{data.fileName}}</span>
    <div class="buttons">
      <button class="button" @click="handleCopy(data)">复制连接</button>
      <button class="button" @click="handleCopyMD(data)" v-show="isImg(data.url)">复制MD</button>
      <button class="button" @click="handleCopyBase64(data)" v-show="isImg(data.url)">复制base64</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImgPreview",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    isImg(url) {
      return !url.endsWith('.zip') && !url.endsWith('.pdf');
    },
    handleCopyBase64(record) {
      if(record && record.id) {
        fetch(`https://playground.z.wiki/img/detail?id=${record.id}&uid=${record.uid}`).then(r => r.json()).then(record => {
          navigator.clipboard.writeText(record.base64).then(() => {
            this.$notify({
              type: 'success',
              text: '已复制。'
            })
          });
        })
      } else {
        navigator.clipboard.writeText(this.base64Value).then(() => {
          this.$notify({
            type: 'success',
            text: '已复制。'
          })
        });
      }
    },
    handleCopy(record) {
      navigator.clipboard.writeText(record && record.url || this.valueUrl).then(() => {
        this.$notify({
          type: 'success',
          text: '已复制。'
        })
      });
    },
    handleCopyMD(record) {
      navigator.clipboard.writeText(`![](${record && record.url || this.valueUrl})`).then(() => {
        this.$notify({
          type: 'success',
          text: '已复制。'
        })
      });
    },
  }
}
</script>

<style scoped>
.img-preview {
  margin-right: 21px;
  margin-bottom: 15px;
  position: relative;
  box-shadow: 0px 0px 1px #ccc;
  transition: all 0.5s ease;
}

@media screen and (max-width: 395px) {
  .img-preview {
    margin-right: 14px;
  }
}
@media screen and (max-width: 375px) {
  .img-preview {
    margin-right: 8px;
  }
}
@media screen and (max-width: 360px) {
  .img-preview {
    margin-right: 4px;
  }
}

.img-preview .name {
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
.img-preview:hover {
  box-shadow: 0px 0px 7px #999;
}
.img-preview .buttons {
  position: absolute;
  display: none;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-size: 12px;
  text-align: center;
}
.img-preview:hover .buttons {
  display: block;
}
.img-preview .buttons button {
  font-size: 12px;
  zoom: 0.8;
  white-space: nowrap;
  text-align: center;
}
.img-preview .buttons button:not(:last-child) {
  margin-bottom: 2px;
  cursor: pointer;
}
</style>
