<template>
  <div class="img-preview" :title="data.fileName">
    <img class="icon" :src="getIcon(data)" width="100" height="100" />
    <span class="name" :title="data.fileName">{{data.fileName}}</span>
    <div class="buttons">
      <button class="button" @click="handleCopy(data)" title="复制链接">链接</button>
      <button class="button" @click="handleCopyMD(data)" v-show="isImg(data.url)" title="复制 MarkDown 图片">MD</button>
      <button class="button" @click="handleCopyBase64(data)" v-show="isImg(data.url)" title="复制 base64 编码内容">base64</button>
      <button class="button" @click="handleCopyCDN(data)" v-show="isImg(data.url)" title="复制 CDN 链接">CDN</button>
      <button v-if="!isImg(data.url)" class="button" @click="handleCopyOssLink(data)" title="复制 OSS 链接">OSS链接</button>
      <button v-if="isImg(data.url)" class="button" @click="handleCopyWikiLink(data)" title="复制原图链接">原图</button>
      <a class="button" target="_blank" :href="data.url" title="访问">访问</a>
      <button class="button qrbutton">
        <span>二维码</span>
        <QrCodeRender class="qr" :text="data.url" />
      </button>
      <button class="button" @click="handleSetShareCode(data)" title="设置分享码">分享码</button>
    </div>
  </div>
</template>

<script>
import QrCodeRender from "./QrCodeRender.vue";

const lodash = require('lodash');

export default {
  name: "ImgPreview",
  components: {QrCodeRender},
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
        return url + "?type=preview";
      } else {
        // 返回对应文件类型的后缀
        const map = {
          ['.zip']: 'https://0.z.wiki/autoupload/2022-08-16/4ce28595bb5f4b898f595bcd2f628f8d.zip.svg',
          ['.svg']: 'https://6.z.wiki/autoupload/2022-09-18/4a9ab33c22d54f9f838801f145cb8516.SVG图标.svg',
          ['.pdf']: 'https://0.z.wiki/autoupload/2022-09-09/995ec22a130649e1b8aed3d83a648781.pdf.svg',
          ['.mp4']: 'https://4.z.wiki/autoupload/2022-09-16/343f6678edf54cf4a4527e3600f17cb2.MP4.svg',
          ['.html']: 'https://3.z.wiki/autoupload/2022-09-18/dfa2279d57f5479a83103dd9445958f5.html.svg',
          ['.htm']: 'https://3.z.wiki/autoupload/2022-09-18/dfa2279d57f5479a83103dd9445958f5.html.svg',
          ['.js']: 'https://7.z.wiki/autoupload/2022-09-18/95308d066c9e49f28b2527c14bc3b430.logo-javascript.svg',
          ['.css']: 'https://1.z.wiki/autoupload/2022-09-18/f44b7e3b35de4dc2a33640619b64ca5c.CSS.svg',
          ['.java']: 'https://4.z.wiki/autoupload/2022-09-19/447070ea92a547e78d40a096d32a9c45.java.svg',
          ['.jsx']: 'https://3.z.wiki/autoupload/2022-09-19/95312e34636942eba6f57174c6c0c62f.jsx.svg',
          ['.vue']: 'https://3.z.wiki/autoupload/2022-09-19/71256c09030e447f94172c7846b8b8c6.Vue.svg',
          ['.sh']: 'https://8.z.wiki/autoupload/2022-09-19/a0fac9929f8c43d4898a355c6929403f.cloudshell 云命令行.svg',
          ['.jar']: 'https://5.z.wiki/autoupload/2022-09-19/fd812b74b27a4f10a63b7459ebd3cef6.JAR.svg',
          ['.class']: 'https://8.z.wiki/autoupload/2022-09-19/a388ddc5203643daaa41c2b1ea1b883a.class.svg',
          ['.php']: 'https://8.z.wiki/autoupload/2022-09-18/80dbd4edcc4b4d2a96b5f3bda9f8ff25.PHP.svg',
          ['.ico']: 'https://4.z.wiki/autoupload/2022-09-18/14cad0db1f174478be7d038c740f95ec.图片.svg',
          ['.mp3']: 'https://5.z.wiki/autoupload/2022-09-18/6a714ce4fcb44a1b93a844388e510533.MP3.svg',
          ['.doc']: 'https://3.z.wiki/autoupload/2022-09-18/64880d19208a4eef99ce63c2f8494f68.doc.svg',
          ['.docx']: 'https://3.z.wiki/autoupload/2022-09-18/64880d19208a4eef99ce63c2f8494f68.doc.svg',
          ['.txt']: 'https://7.z.wiki/autoupload/20221224/5eVn.txt-ext.svg',
          ['.json']: 'https://7.z.wiki/autoupload/2022-09-18/194c5e66be6b44a5b88d95a7eea0c05e.JSON.svg',
          ['.md']: 'https://5.z.wiki/autoupload/2022-09-18/e0aa344b2d924b228d6a01026ed4b4e0.markdown.svg',
          ['.ppt']: 'https://2.z.wiki/autoupload/2022-09-18/728eb566f0644d108ab1d98f54561df5.ppt.svg',
          ['.pptx']: 'https://2.z.wiki/autoupload/2022-09-18/728eb566f0644d108ab1d98f54561df5.ppt.svg',
          ['.psb']: 'https://2.z.wiki/autoupload/2022-09-18/8a023049b2e749ff911099b338d77383.PS.svg',
          ['.xml']: 'https://2.z.wiki/autoupload/2022-09-18/b4247c301b0948708582c3f030cf664b.XML.svg',
          ['.csv']: 'https://2.z.wiki/autoupload/2022-09-18/306ac35844fa4117a1d317c91663b66c.CSV.svg',
          ['.key']: 'https://6.z.wiki/autoupload/2022-09-18/1326995267e345f192b9ecfdec36196a.keynote.svg',
          ['.torrent']: 'https://4.z.wiki/autoupload/2022-09-18/0942076a759345a4a28e5105439da15e.file_bt.svg',
          ['.xls']: 'https://6.z.wiki/autoupload/2022-09-18/8ed51cfaf5f04d88b7ef0f0eb13e0035.excel.svg',
          ['.xltx']: 'https://6.z.wiki/autoupload/2022-09-18/8ed51cfaf5f04d88b7ef0f0eb13e0035.excel.svg',
          ['.xlsm']: 'https://6.z.wiki/autoupload/2022-09-18/8ed51cfaf5f04d88b7ef0f0eb13e0035.excel.svg',
          ['.xlsb']: 'https://6.z.wiki/autoupload/2022-09-18/8ed51cfaf5f04d88b7ef0f0eb13e0035.excel.svg',
          ['.alfredworkflow']: 'https://1.z.wiki/autoupload/20221224/FwUM.workflow.svg',
          ['.tiff']: 'https://3.z.wiki/autoupload/20221224/x2Fz.Tiff.svg',
          ['.exe']: 'https://5.z.wiki/autoupload/20221224/PvKj.exe.svg',
          ['.7z']: 'https://0.z.wiki/autoupload/20221224/NpA2.7z.svg',
          ['.rar']: 'https://3.z.wiki/autoupload/20221224/uRGw.rar.svg',
          ['.gz']: 'https://6.z.wiki/autoupload/20221224/GUg7.gzip.svg',
          ['.ts']: 'https://7.z.wiki/autoupload/20221224/X169.typescript-def.svg',
          ['.dmg']: 'https://5.z.wiki/autoupload/20221224/0IXD.dmg.svg'
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
      const imgSuffixs = ['.bmp', '.jpg', '.jpeg', '.png', '.gif', '.webp', '.ico', '.svg'];
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
    handleCopyCDN(record) {
      this.doCopy(record && record.cdnUrl);
    },
    handleSetShareCode(data) {
      console.log('handleSetShareCode', data);
      const shareCode = window.prompt('请输入分享码', data.shareCode || '')
      if(shareCode != null) {
        fetch(`https://playground.z.wiki/img/setShareCode?uid=${data.uid}&id=${data.id}&shareCode=${shareCode}`, {method: 'POST'}).then(res => {
          return res.json();
        }).then(data => {
          if(data.success) {
            this.$notify({
              type: 'success',
              text: '已设置分享码。'
            })
          } else {
            this.$notify({
              type: 'error',
              text: '分享失败。'
            })
          }
        })
      }
    }
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
  width: 100%;
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
.img-preview:hover {
  position: relative;
  z-index: 9999999;
}
.img-preview .buttons .button {
  font-size: 12px;
  zoom: 0.8;
  white-space: nowrap;
  text-align: center;
  position: relative;

  appearance: auto;
  writing-mode: horizontal-tb !important;
  text-rendering: auto;
  color: buttontext;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: center;
  align-items: flex-start;
  cursor: default;
  box-sizing: border-box;
  margin: 0em;
  padding: 1px 6px;
  border-width: 2px;
  border-style: outset;
  border-color: buttonborder;
  background-color: buttonface;
  border-image: initial;
}
.img-preview .buttons .button:not(:last-child) {
  margin-bottom: 2px;
  cursor: pointer;
}

.qrbutton {
  position: relative;
}
.qrbutton:hover .qr{
  display: block;
  z-index: 9999;
}
.qrbutton .qr {
  position: absolute;
  top: 0px;
  left: 100%;
  width: 200px;
  height: 200px;
  display: none;
}
</style>
