<template>
  <div class="img-preview" :title="data.fileName">
    <img class="icon" :src="getIcon(data)" width="100" height="100" />
    <span class="name" :title="data.fileName">{{data.fileName}}</span>
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
const lodash = require('lodash');

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
      if(this.isImg(url)) {
        // 图片：返回图片链接
        return url;
      } else {
        // 返回对应文件类型的后缀
        const map = {
          ['.zip']: 'https://0.z.wiki/autoupload/2022-08-16/4ce28595bb5f4b898f595bcd2f628f8d.zip.svg',
          ['.pdf']: 'https://0.z.wiki/autoupload/2022-09-09/995ec22a130649e1b8aed3d83a648781.pdf.svg',
          ['.mp4']: 'https://4.z.wiki/autoupload/2022-09-16/343f6678edf54cf4a4527e3600f17cb2.MP4.svg',
          ['.html']: 'https://3.z.wiki/autoupload/2022-09-18/dfa2279d57f5479a83103dd9445958f5.html.svg',
          ['.htm']: 'https://3.z.wiki/autoupload/2022-09-18/dfa2279d57f5479a83103dd9445958f5.html.svg',
          ['.js']: 'https://7.z.wiki/autoupload/2022-09-18/95308d066c9e49f28b2527c14bc3b430.logo-javascript.svg',
          ['.css']: 'https://1.z.wiki/autoupload/2022-09-18/f44b7e3b35de4dc2a33640619b64ca5c.CSS.svg',
          ['.php']: 'https://8.z.wiki/autoupload/2022-09-18/80dbd4edcc4b4d2a96b5f3bda9f8ff25.PHP.svg',
          ['.ico']: 'https://4.z.wiki/autoupload/2022-09-18/14cad0db1f174478be7d038c740f95ec.图片.svg',
          ['.mp3']: 'https://5.z.wiki/autoupload/2022-09-18/6a714ce4fcb44a1b93a844388e510533.MP3.svg',
          ['.doc']: 'https://8.z.wiki/autoupload/2022-09-18/a159eb76c9d5490385d8a0825eb38a41.doc、docx.svg',
          ['.docx']: 'https://8.z.wiki/autoupload/2022-09-18/a159eb76c9d5490385d8a0825eb38a41.doc、docx.svg',
          ['.txt']: 'https://6.z.wiki/autoupload/2022-09-18/e83a12526ee3491188a5b995ed4e4016.txt.svg',
          ['.ppt']: 'https://2.z.wiki/autoupload/2022-09-18/728eb566f0644d108ab1d98f54561df5.ppt.svg',
          ['.pptx']: 'https://2.z.wiki/autoupload/2022-09-18/728eb566f0644d108ab1d98f54561df5.ppt.svg',
          ['.psb']: 'https://2.z.wiki/autoupload/2022-09-18/8a023049b2e749ff911099b338d77383.PS.svg',
          ['.xml']: 'https://2.z.wiki/autoupload/2022-09-18/b4247c301b0948708582c3f030cf664b.XML.svg',
          ['.csv']: 'https://2.z.wiki/autoupload/2022-09-18/306ac35844fa4117a1d317c91663b66c.CSV.svg',
          ['.key']: 'https://6.z.wiki/autoupload/2022-09-18/1326995267e345f192b9ecfdec36196a.keynote.svg',
          ['.xls']: 'https://6.z.wiki/autoupload/2022-09-18/8ed51cfaf5f04d88b7ef0f0eb13e0035.excel.svg',
          ['.xltx']: 'https://6.z.wiki/autoupload/2022-09-18/8ed51cfaf5f04d88b7ef0f0eb13e0035.excel.svg',
          ['.xlsm']: 'https://6.z.wiki/autoupload/2022-09-18/8ed51cfaf5f04d88b7ef0f0eb13e0035.excel.svg',
          ['.xlsb']: 'https://6.z.wiki/autoupload/2022-09-18/8ed51cfaf5f04d88b7ef0f0eb13e0035.excel.svg'
        };
        let icon = 'https://5.z.wiki/autoupload/2022-09-18/a426d828fa6242cdb9698fbe32a430a4.unknownfile.svg';
        Object.keys(map).forEach(suffix => {
          if(url.endsWith(suffix)) {
            icon = map[suffix];
          }
        })
        return icon;
      }
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
      // 图片后缀，预览图中如果是图片需要显示照片内容，否则显示文件类型图标
      const imgSuffixs = ['.bmp', '.jpg', '.jpeg', '.png', '.gif', '.webp', '.ico', '.tiff'];
      return lodash.some(imgSuffixs, imgSuffix => {
        return url && url.toLowerCase().endsWith(imgSuffix);
      })
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
