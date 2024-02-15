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
    handleInput(e) {
      console.log('handleInput', e.target.value);
    }
  },
  watch: {
    keyword() {
      console.log('keyword is', this.keyword);
    }
  }
}
</script>
