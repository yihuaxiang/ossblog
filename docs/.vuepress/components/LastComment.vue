<template>
<div class="last-post">
  <h2>{{title}}</h2>

  <ul>
    <template v-for="(comment, index) in topComments">
      <li :key="comment.id">
        <div style="margin-right: 20px; display: flex; justify-content: space-between;">
          <a class="comment-link" :href="comment.url" @click.prevent="pushRoute(comment.url)" v-html="comment.comment"></a>
          <div style="display: flex; align-items: center; font-size: 12px; color: rgba(0, 0, 0, 0.54); font-weight: 200;">
            <span>{{comment.nick}}</span>
          </div>
        </div>
      </li>
    </template>

  </ul>


</div>
</template>

<script>
import fetch from 'cross-fetch';
const lodash = require('lodash');
export default {
  name: "LastComment",
  props: {
    title: {
      type: String,
      required: false,
      default: '最新评论'
    },
    number: {
      type: Number,
      required: false,
      default: 10
    }
  },
  data() {
    return {
      comments: null
    }
  },
  methods: {
    pushRoute(path) {
      console.info('pushRoute', path);
      this.$router.push({
        path
      });
    },
    queryData() {
      fetch("https://playground.z.wiki/comment/latest?size=3").then(res => res.json()).then(list => {
        this.comments = list;
      })
    }
  },
  mounted() {
    this.queryData();
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler: function() {
        this.queryData();
      }
    }
  },
  computed: {
    topComments() {
      return lodash.uniqBy(this.comments, 'url');
    }
  }
}
</script>

<style scoped>
.comment-link {
  display: flex;
  align-items: center;
}
.comment-link /deep/ img {
  height: 18px;;
}
</style>
