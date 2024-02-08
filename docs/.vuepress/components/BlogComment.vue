<template>
<div class="blog-comment">
</div>
</template>

<script>
import fetch from 'cross-fetch';
export default {
  name: "BlogComment",
  data() {
    return {
    }
  },
  mounted() {
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler: function() {
        const path = this.$route.path;
        console.log('path is', path);

        if (typeof fetch != undefined) {
          try {
            fetch(`https://playground.z.wiki/comment/list?path=${encodeURIComponent(path)}`)
              .then(res => res.text()).then(info => {
                console.log('info is', info);
            })
          } catch(e) {
            console.warn('failed to fetch accumulation', e);
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.blog-comment{
  display: none;
}
</style>

