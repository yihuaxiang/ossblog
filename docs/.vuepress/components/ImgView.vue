<template>
  <div>
    <div v-show="isLoading" class="loading-container-div">
      <div class="lds-hourglass"></div>
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
    },
    extStyle: {
      type: Object,
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
      const style = this.extStyle || {};
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
  border: 1px solid #e7e9e8;
  border-radius: 4px;
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





@media only screen and (max-width: 600px) {
  .loading-container-div {
    margin: 0 auto;
    text-align: center;
  }
}


.lds-hourglass {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-hourglass:after {
  content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 8px;
  box-sizing: border-box;
  border: 32px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-hourglass 1.2s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}


</style>

