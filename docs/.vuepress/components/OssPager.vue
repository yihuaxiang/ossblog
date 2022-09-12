<template>
  <div class="pager">
    <template v-for="cPage in maxPage">
      <button
          :key="cPage"
          class="page"
          v-show="cPage < 4 || cPage > (maxPage - 3) || Math.abs(cPage - page) < 2"
          :class="{active: page == cPage}"
          @click="$emit('update:page', cPage)"
          :disabled="page == cPage">
        {{ cPage }}
      </button>
    </template>

    <select :value="pageSize" @change="event => $emit('update:pageSize', Number(event.target.value))">
      <template v-for="size in [20, 30, 50, 100]">
        <option :key="size" :value="size">{{size}}</option>
      </template>
    </select>
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
      return Math.ceil(this.total / this.pageSize);
    }
  }
}
</script>

<style scoped>
.pager button, .pager select {
  display: inline-block;
  text-align: center;
  margin: 0 5px;
  padding: 3px 8px;
  padding-left: 8px !important;
  line-height: 15px;
  cursor: pointer;
}

.pager button.active {
  cursor: not-allowed;
}
</style>
