<template>
<div class="short-url">
  <div>
    <div class="text-title">短网址服务</div>

    <div>
      <input type="text" id="inputContent" v-model="rawUrl"  placeholder="请输入需要转换的连接">
    </div>

    <div>
      <button class="getShortUrl" title="将长链接还原成短链接">马 上 缩 短</button>
    </div>

    <div id="resultBox">
      <div class="text-center  col-12">
        <div class="h4 text-success my-3">转换结果:
          <template v-if="shortUrl">
            <a target="_blank" :href="shortUrl">{{shortUrl}}</a>
          </template>
          <template v-else>
            <span>--</span>
          </template>
        </div>
      </div>
    </div>

  </div>
</div>
</template>

<script>
export default {
  name: "ShortUrl",
  data() {
    return {
      shortUrl: null,
      rawUrl: null
    }
  },
  mounted() {
  },
  methods: {
    getShortUrl() {
      if(this.rawUrl) {
        fetch(`https://playground.z.wiki/u/save?url=${encodeURIComponent(this.rawUrl)}`, {
          method: 'POST',
        }).then(res => res && res.json()).then(data => {
          console.log('data is ', data);
          if(data && data.shortId) {
            this.shortUrl = `https://z.wiki/u/${data.shortId}`
          } else {
            this.$notify({
              type: 'warn',
              text: '短连接转换失败，请确保您提供的原始链接有效。。'
            })
          }
        })
      }
    }
  },
  watch: {
    rawUrl() {
      this.getShortUrl();
    }
  }
}
</script>

<style scoped>
.text-title {
  font-size: 33px;
  line-height: 1.3;
  margin-top: 16px;
  margin-bottom: 16px;
  text-align: center;
  color: #2d3d50;
}

#inputContent {
  height: 38px;
  line-height: 38px;
  width: 100%;
  box-sizing: border-box;
  border-color: #ffffff;
  border-radius: 4px;
  border-width: 1px;
  padding-left: 20px;
  outline: none;
  box-shadow: none;
  border-style: ridge;
}

.getShortUrl {
  box-shadow: 2px 2px 6px rgb(0 0 0 / 40%);
  transform: translateY(-1px);
  -webkit-transform: translateY(-1px);
  background-color: #3eaf7c!important;
  background-image: linear-gradient(to bottom left, #3ca073, #249c66, #3eaf7c) !important;
  width: 334px;
  max-width: 100%;
  box-sizing: border-box;
  height: 40px;
  line-height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  margin-top: 12px;
  margin-bottom: 12px;
}

.getShortUrl:active {
  transform: translateY(0px);
  -webkit-transform: translateY(0px);
}

</style>
