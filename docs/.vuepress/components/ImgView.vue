<template>
  <div>
    <div v-show="isLoading" class="loading-container">
      <div class="loader"></div>
    </div>
    <img v-show="!isLoading" class="img-view" ref="img" :src="url" :alt="title" :title="title" :style="imgStyle" />
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
    },
    width: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      isLoading: true,
      isError: false
    }
  },
  created() {
  },
  mounted() {
    const img = this.$refs.img;
    img.addEventListener('load', () => {
      this.isLoading = false;
    })
    img.addEventListener('error', () => {
      this.isLoading = false;
      this.isError = true;
      this.$refs.img.src = "https://z.wiki/autoupload/20230717/PXa0.image-failed-filled_(1).svg";
    })
  },
  computed: {
    imgStyle() {
      const style = {};
      if(this.width && !this.isError) {
        style.width = this.width;
      }
      return style;
    }
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

  background-color: #666;
}

.loading:before,
.loading:after {
  position: absolute;
  width: 6px;
  height: 10px;
  content: "";
  background-color: #666;
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
    box-shadow: 0 0 #666;
  }

  40% {
    height: 30px;
    box-shadow: 0 -20px #666;
  }
}
.loading-ctn {
  height: 50px;
  padding-top: 30px;
  padding-left: 40px;
}



.loading-container {
  position: relative;
  width: 100%; /* Adjust based on parent container */
  height: 100%; /* Adjust based on parent container */
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  border: 4px solid rgba(255, 255, 255, 0.3); /* Light grey border */
  border-left-color: #ccc; /* Red part */
  border-radius: 50%;
  width: 30px; /* Size of loader */
  height: 30px; /* Size of loader */
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>

