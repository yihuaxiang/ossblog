<template>
  <div class="img-preview">
    <img class="icon" :src="getIcon(data)" width="100" height="100" />
    <span class="name">{{data.fileName}}</span>
    <div class="buttons">
      <button class="button" @click="handleCopy(data)">复制连接</button>
      <button class="button" @click="handleCopyMD(data)" v-show="isImg(data.url)">复制MD</button>
      <button class="button" @click="handleCopyBase64(data)" v-show="isImg(data.url)">复制base64</button>
      <button v-if="!isImg(data.url)" class="button" @click="handleCopyOssLink(data)">OSS链接</button>
      <button v-if="isImg(data.url)" class="button" @click="handleCopyWikiLink(data)">原图</button>
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
    getIcon(data) {
      // 根据数据返回对应的图表（根据文件后缀名
      const url = data.url;
      const map = {
        ['.zip']: 'https://0.z.wiki/autoupload/2022-08-16/4ce28595bb5f4b898f595bcd2f628f8d.zip.svg',
        ['.pdf']: 'https://0.z.wiki/autoupload/2022-09-09/995ec22a130649e1b8aed3d83a648781.pdf.svg',
        ['.mp4']: 'https://4.z.wiki/autoupload/2022-09-16/343f6678edf54cf4a4527e3600f17cb2.MP4.svg'
      };
      let icon = url;
      Object.keys(map).forEach(suffix => {
        if(url.endsWith(suffix)) {
          icon = map[suffix];
        }
      })
      return icon;
    },
    doCopy(value) {
      navigator.clipboard.writeText(value).then(() => {
        this.$notify({
          type: 'success',
          text: '已复制。'
        })
      });
    },
    handleCopyWikiLink(data) {
      const url = data.url;
      this.doCopy(url.replace(/(\d.)?z.wiki/, 'z.wiki'));
    },
    handleCopyOssLink(data) {
      const url = data.url;
      this.doCopy(url.replace(/(\d.)?z.wiki/, 'fudongdong-statics.oss-cn-beijing.aliyuncs.com'));
    },
    isImg(url) {
      return !url.endsWith('.zip') && !url.endsWith('.pdf') && !url.endsWith('.mp4');
    },
    handleCopyBase64(record) {
      if(record && record.id) {
        fetch(`https://playground.z.wiki/img/detail?id=${record.id}&uid=${record.uid}`).then(r => r.json()).then(record => {
          this.doCopy(record.base64);
        })
      } else {
        this.doCopy(this.base64Value);
      }
    },
    handleCopy(record) {
      this.doCopy(record && record.url || this.valueUrl);
    },
    handleCopyMD(record) {
      this.doCopy(`![](${record && record.url || this.valueUrl})`);
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
