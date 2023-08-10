<template>
<div class="solid-img-player">
  <swiper class="swiper" :options="swiperOption">
    <template v-for="(img,index) in imgs">
      <swiper-slide :key="`${img}-${index}`">
        <img :src="img" loading="lazy" onerror="this.onerror=null;this.src='https://z.wiki/autoupload/20230717/PXa0.image-failed-filled_(1).svg'" />
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
  name: "SolidImgPlayer",
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
        spaceBetween: 30,
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows : true
        },
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
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

.swiper-slide img {
}
.swiper {
  height: 100%;
  width: 100%;


}
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  max-height: 400px;
  text-align: center;
  font-weight: bold;
  background-color: #2C8DFB;
  background-position: center;
  background-size: cover;
}
</style>
