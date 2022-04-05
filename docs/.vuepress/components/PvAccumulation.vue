<template>
<div class="pv-accumulation">
  访问量：{{pv || '-'}}
</div>
</template>

<script>
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
        if (fetch) {
          fetch(`https://playground.fudongdong.com/blog/accumulation?url=${encodeURIComponent(path)}`)
              .then(res => res.text()).then(pv => {
            this.pv = pv;
          })
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
