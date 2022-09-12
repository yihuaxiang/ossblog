<template>
<div class="pager">
  <template v-for="cPage in maxPage">
    <button class="page" :class="{active: page == cPage}" :disabled="page == cPage">{{cPage}}</button>
  </template>
</div>
</template>

<script>
export default {
  name: "OssPager",
  props: {
    total: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    }
  },
  computed: {
    maxPage() {
      return Math.floor(this.total / this.pageSize);
    }
  }
}
</script>

<style scoped>
.pager button {

}
.pager button.active {

}
</style>
