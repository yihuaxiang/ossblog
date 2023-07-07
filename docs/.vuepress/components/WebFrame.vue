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
}
</style>
