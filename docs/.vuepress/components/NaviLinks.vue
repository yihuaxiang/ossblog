<template>
<div class="navi-links">
  <h2>站点导航</h2>

  <ul>
    <template v-for="(link, index) in links">
      <li :key="link.url + index">
        <div style="margin-right: 20px; display: flex; justify-content: space-between;">
          <a :href="link.url" target="_blank">{{link.title}}</a>
          <div style="display: flex; align-items: center; font-size: 12px; color: rgba(0, 0, 0, 0.54); font-weight: 200;">
            <span>{{link.desc}}</span>
          </div>
        </div>
      </li>
    </template>

  </ul>


</div>
</template>

<script>
export default {
  name: "NaviLinks",
  computed: {
    links() {
      return [{
        title: '敖武的游乐园',
        url: 'https://playground.z.wiki/',
        desc: '',
      }, {
        title: '代码片段',
        url: 'https://snippets.z.wiki/',
        desc: '',
      }, {
        title: '敖武的图床',
        url: 'https://tuchuang.z.wiki/misc/tuchuang.html',
        desc: '',
      }, {
        title: '端网址服务',
        url: 'https://z.wiki/misc/short-url.html',
        desc: '',
      }, {
        title: '城市信息查询',
        url: 'https://playground.z.wiki/lbs/showCityInfo',
        desc: '',
      }, {
        title: '30分钟正则入门教程',
        url: 'https://z.wiki/tools/reg/',
        desc: '',
      }]
    },
   
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">

</style>
