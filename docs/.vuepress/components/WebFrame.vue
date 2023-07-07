<template>
  <div class="web-frame-ctn">
    <iframe class="web-frame" :src="src" />
    <div class="hidden-ctn" />
  </div>
</template>

<script>
export default {
  name: "WebFrame",
  props: {
    src: {
      type: String,
      required: true,
    }
  }
}
</script>

<style scoped>
.web-frame-ctn {
  position: relative;
  background-image: url(https://z.wiki/autoupload/20230707/9Tzi.1752X2456-image.png);
  background-size: 100%;
  padding-top: 50px;
  padding-left: 35px;
  padding-right: 40px;

  .hidden-ctn {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 140px;
    height: 50px;
    transform: translateX(-50%) translateY(-50%);
    background: white;
    z-index: 1;
  }
}
.web-frame {
    position: relative;
    z-index: 2;
    margin-top: 15px;
    margin-bottom: 10px;
    border: none;
    width: -webkit-fill-available;
    height: 470px;
}
</style>
