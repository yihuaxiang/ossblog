<template>
  <video width="100%" controls class="video">
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

<style scoped>
.video {
  margin-top: 15px;
}
</style>
