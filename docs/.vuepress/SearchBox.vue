<template>
  <div class="sb-ctn">
    <div class="search-box">
      <input type="text" v-model="keyword" placeholder="搜索" @input="handleInput" />
    </div>
    <div class="list">

    </div>
  </div>
</template>
<script>
export default {
  name: 'SearchBox',
  data() {
    return {
      keyword: '',
      list: []
    }
  },
  methods: {
    handleInput(e) {
      console.log('handleInput', e.target.value);
      const value = e.target.value;
      fetch(`https://playground.z.wiki/search/index?keyword=${value}`).then(res => res.json()).then(data => {
        console.log('data is', data);
        this.list = data || [];
      })
    }
  },
  watch: {
    keyword() {
      console.log('keyword is', this.keyword);
    }
  }
}
</script>
