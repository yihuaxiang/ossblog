<template>
  <div>
    <div v-show="isLoading" class="loading-ctn">
      <div class="loading"></div>
    </div>
    <img v-show="!isLoading" class="img-view" ref="img" :src="url" :alt="title" :title="title" />
  </div>
</template>

<script>
export default {
  name: "ImgView",
  props: {
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoading: true
    }
  },
  created() {
  },
  mounted() {
    const img = this.$refs.img;
    img.addEventListener('load', () => {
      console.log('img load done');
      this.isLoading = false;
    })
  }
}
</script>

<style scoped>
.img-view {
}
.loading {
  display: block;
  position: relative;
  width: 6px;
  height: 10px;

  animation: rectangle infinite 1s ease-in-out -0.2s;

  background-color: #000;
}

.loading:before,
.loading:after {
  position: absolute;
  width: 6px;
  height: 10px;
  content: "";
  background-color: #000;
}

.loading:before {
  left: -14px;

  animation: rectangle infinite 1s ease-in-out -0.4s;
}

.loading:after {
  right: -14px;

  animation: rectangle infinite 1s ease-in-out;
}

@keyframes rectangle {
  0%,
  80%,
  100% {
    height: 20px;
    box-shadow: 0 0 #000;
  }

  40% {
    height: 30px;
    box-shadow: 0 -20px #000;
  }
}
.loading-ctn {
  height: 50px;
  padding-top: 30px;
  padding-left: 40px;
}
</style>

