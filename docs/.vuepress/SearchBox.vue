<template>
  <div class="search-box">
    <input type="text" v-model="keyword" placeholder="搜索" @input="handleInput" />
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
  methods: {
    handleInput() {
      console.log('handleInput')
    }
  },
  watch: {
    keyword() {
      console.log('keyword is', keyword);
    }
  }
}
</script>
