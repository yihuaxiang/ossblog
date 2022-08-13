<template>
<div class="img-player">
  <swiper class="swiper" :options="swiperOption">
    <template v-for="(img,index) in imgs">
      <swiper-slide :key="`${img}-${index}`">
        <template v-if="typeof img === 'string'">
          <img :src="img" loading="lazy" title="敖武的博客-照片" alt="照片加载中..." />
        </template>
        <template v-else>
          <ImgWithTitle :img="img" />
        </template>
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
import ImgWithTitle from "./ImgWithTitle";
export default {
  name: "ImgPlayer",
  components: {
    ImgWithTitle,
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
.ctn .info {
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: #9292924f;
  padding: 3px 5px;
  padding-bottom: 28px;
  text-align: left;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>

<style>
.img-player .ctn .info {
  padding-bottom: 28px !important;
}
</style>
