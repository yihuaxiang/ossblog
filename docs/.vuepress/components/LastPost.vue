<template>
<div class="last-post">
  <h2>最新发表</h2>

  <ul>
    <template v-for="(article, index) in topArticles">
      <li :key="article.path + index">
        <div style="margin-right: 20px; display: flex; justify-content: space-between;">
          <a href="/">{{article.title}}</a>
          <div style="display: flex; align-items: center; font-size: 12px; color: rgba(0, 0, 0, 0.54); font-weight: 200;">
        <span style="display: flex; align-items: center; margin-right: 5px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </span>
            <span>{{article.lastUpdated}}</span>
          </div>
        </div>
      </li>
    </template>

  </ul>


</div>
</template>

<script>
export default {
  name: "LastPost",
  props: {
    number: {
      type: Number,
      required: false,
      default: 3
    },
    prefix: {
      type: String,
      required: false,
      default: undefined
    }
  },
  mounted() {
    console.info('this.$site', this.$site);
  },
  computed: {
    topArticles() {
      const pages = this.$site.pages;
      return pages.filter(p => {
        if(!this.prefix) {
          return true;
        } else {
          return p.path.startsWith(this.prefix);
        }
      })
      .reverse()
      .slice(0, this.number);
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">

</style>
