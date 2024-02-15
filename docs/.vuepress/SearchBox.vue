<template>
  <div class="sb-ctn">
    <div class="search-box">
      <input type="text" v-model="keyword" placeholder="搜索" @input="handleInput" @blur="handleBlur" />
    </div>
    <div class="list" v-if="list && list.length > 0">
      <div v-for="item in list">
        <a :href="item.link">
          <p v-html="item.title">{{item.title}}</p>
        </a>
      </div>
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
    handleBlur() {
      setTimeout(() => {
        this.keyword = '';
        this.list = [];
      }, 100);
    },
    handleInput(e) {
      console.log('handleInput', e.target.value);
      const value = e.target.value;
      fetch(`https://playground.z.wiki/search/index?keyword=${value}`).then(res => res.json()).then(data => {

        if (this.keyword != value) {
          return;
        }

        console.log('data is', data);
        this.list = (data || []).map(item => {
          item.title = item.title
            .replace(/__START_TAG__/g, '<b>')
            .replace(/__END_TAG__/g, '</b>');
          item.content = item.content
            .replace(/__START_TAG__/g, '<b>')
            .replace(/__END_TAG__/g, '</b>');
          return item;
        });
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
<style scoped>
.sb-ctn {

  .search-box {
    display: inline-block;
    position: relative;
    margin-right: 1rem;

    input {
      cursor: text;
      width: 6rem;
      height: 2rem;
      color: #4e6e8e;
      display: inline-block;
      border: 1px solid #cfd4db;
      border-radius: 2rem;
      font-size: .9rem;
      line-height: 2rem;
      padding: 0 .5rem 0 2rem;
      outline: none;
      transition: all .2s ease;
      background: #fff url(/assets/img/search.83621669.svg) .6rem .5rem no-repeat;
      background-size: 1rem;
    }
  }

  .list {
    max-height: 200px;
    overflow: auto;
    max-width: 200px;
    padding: 5px;
    padding-left: 10px;
    border-radius: 6px;
    border: 1px #ccc solid;
    margin-top: 5px;
    line-height: 0px;

    a {
      color: unset;
      font-weight: normal;
      display: inline-block;
      padding-top: 2px;
      padding-bottom: 2px;
    }

    p {
      margin: 0px;
      padding: 0px;
    }

    b {
      color: red;
    }
  }
}
</style>
