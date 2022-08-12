<template>
  <div class="ctn">
    <img :src="img.url" loading="lazy" :title="img.desc || '敖武的博客-照片'" :alt="img.title || '敖武的照片'" />
    <div class="info" :style="{
              'background-color': img.bgColor || '#9292924f'
            }">
      <h3 class="title" v-show="img.title">{{img.title}}</h3>
      <p class="desc" v-show="img.desc">{{img.desc}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImgWithTitle",
  props: {
    img: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.ctn {
  position: relative;
}
.ctn .info {
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: #9292924f;
  padding: 3px 5px;
  padding-bottom: 28px;
  text-align: left;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
}
.ctn .title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0px;
  font-size: 16px;
  color: #2c3e50;
}
.ctn .desc {
  margin: 0px;
  font-size: 14px;
  color: #2c3e50;
  font-weight: normal;
}
</style>
