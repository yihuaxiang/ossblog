<template>
  <iframe width="100%" class="web-frame" :src="src" />
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
.web-frame {
  margin-top: 15px;
  margin-bottom: 10px;
  background-image: url("https://z.wiki/autoupload/20230707/9Tzi.1752X2456-image.png");
}
</style>
