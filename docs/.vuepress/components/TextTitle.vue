<template>
  <img class="text-title" :src="`https://z.wiki/placeholder/740x120?text=${text}&color=black&pinyin=true`" :title="title" >
</template>

<script>
export default {
  name: "TextTitle",
  props: {
    text: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.text-title {
  margin-top: 15px;
}
</style>

