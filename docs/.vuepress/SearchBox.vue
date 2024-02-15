<template>
  <div class="search-box">
    <input type="text" v-model="keyword" />
  </div>
</template>
<script>
export default {
  name: 'SearchBox',
  data() {
    return {
      keyword: ''
    }
  },
  watch: {
    keyword() {
      console.log('keyword is', keyword);
    }
  }
}
</script>
