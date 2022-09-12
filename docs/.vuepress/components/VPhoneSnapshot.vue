<template>
<div class="v-phone-snapshot">
  <img :src="url" :title="title" :alt="alt" />
  <div class="top"></div>
  <div class="middle"></div>
  <div class="bottom"></div>
</div>
</template>

<script>
export default {
  name: "VPhoneSnapshot",
  props: {
    title: {
      type: String,
      required: false
    },
    alt: {
      type: String,
      required: false
    },
    url: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.v-phone-snapshot {
  margin: 0 auto;
  margin-left: 20px;
  margin-right: 0px;
  position: relative;
  padding: 35px 10px 40px;
  padding-left: 35px;
  padding-right: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
  min-width: 400px;
  box-sizing: border-box;
  height: 316px;
}
.v-phone-snapshot img {
  max-height: 100%;
  max-width: unset;
}

.top, .middle, .bottom {
  background: url('https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/autoupload/2022-09-12/b968fdb56e33469dbd73949df506db9e.%E4%B8%8B%E8%BD%BD%20(1).png');
  position: absolute;
}
.top {
  left: 0px;
  right: 0px;
  width: 100px;
  height: 316px;
  top: 0px;
}

.middle {
  background-repeat: no-repeat;
  left: 100px;
  top: 0px;
  background-position: center;
  bottom: 0px;
  right: 100px;
}

.bottom {
  right: 0px;
  bottom: 0px;
  top: 0px;
  height: 316px;
  width: 100px;
  background-position: right;
}
</style>
