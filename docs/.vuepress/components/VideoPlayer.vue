<template>
  <video width="100%" controls class="video" :poster="poster">
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
    },
    poster: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped>
.video {
  margin-top: 15px;
}
</style>
