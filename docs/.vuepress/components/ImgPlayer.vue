<template>
<div class="img-player">
  <swiper class="swiper" :options="swiperOption">
    <template v-for="(img,index) in imgs">
      <swiper-slide :key="`${img}-${index}`">
        <img :src="img" />
      </swiper-slide>
    </template>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: "ImgPlayer",
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    imgs: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
}
</script>

<style scoped>
.swiper {
  width: 100%;
}
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
}
</style>
