<template>
<div class="pv-accumulation">
  访问量：{{pv || '-'}}
</div>
</template>

<script>
import fetch from 'cross-fetch';
export default {
  name: "PvAccumulation",
  data() {
    return {
      isHtml: false,
      pv: undefined
    }
  },
  mounted() {
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler: function() {
        const path = this.$route.path;
        if(path && path.endsWith('.html')) {
          this.isHtml = true;
        } else {
          this.isHtml = false;
        }
        if (typeof fetch != undefined) {
          try {
            fetch(`https://playground.z.wiki/blog/accumulation?url=${encodeURIComponent(path)}&host=${encodeURIComponent(window.location.host)}`)
              .then(res => res.text()).then(pv => {
              this.pv = pv;
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
.pv-accumulation {
  text-align: right;
  padding-right: 20px;
  color: rgb(122,122,122);
  font-size: 14px;
}
</style>
