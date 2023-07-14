<template>
  <div>
    <img v-show="isLoading" class="img-loading" src="https://z.wiki/autoupload/20230714/yQFT.loading.svg" style="40" height="40" />
    <img v-show="!isLoading" class="img-view" ref="img" :src="url" :alt="title" :title="title" />
  </div>
</template>

<script>
export default {
  name: "ImgView",
  props: {
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoading: true
    }
  },
  created() {
  },
  mounted() {
    const img = this.$refs.img;
    img.addEventListener('load', () => {
      console.log('img load done');
    })
  }
}
</script>

<style scoped>
.img-view {
}
</style>

