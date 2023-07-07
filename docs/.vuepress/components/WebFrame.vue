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

  .hidden-ctn {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 50px;
    transform: translateX(-50%) translateY(-50%);
  }
}
.web-frame {
    margin-top: 15px;
    margin-bottom: 10px;
    background-image: url(https://z.wiki/autoupload/20230707/9Tzi.1752X2456-image.png);
    border: none;
    background-size: 100%;
    padding-top: 50px;
    padding-left: 35px;
    width: -webkit-fill-available;
    padding-right: 40px;
    height: 470px;
}
</style>
