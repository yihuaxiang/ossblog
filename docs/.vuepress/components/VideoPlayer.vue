<template>
  <video width="100%" controls autoplay class="video">
    <source :src="src" type="video/mp4">
  </video>
</template>

<script>
export default {
  name: "VideoPlayer",
  props: {
    src: {
      type: String,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
.video {
  margin-top: 15px;
}
</style>
