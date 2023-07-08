<template>
<div class="navi-links">
  <h2>站点导航</h2>

  <ul>
    <template v-for="(link, index) in links">
      <li :key="link.url + index">
        <div style="margin-right: 20px; display: flex; justify-content: space-between;">
          <a :href="link.url" target="_blank" style="flex-shrink: 0;" :title=link.title>{{link.title}}</a>
          <div style="padding-left: 5px;display: flex; align-items: center; font-size: 12px; color: rgba(0, 0, 0, 0.54); font-weight: 200;flex-shrink: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            <span style="overflow: hidden; text-overflow: ellipsis;">{{link.desc}}</span>
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
        title: '🎠 敖武的游乐园',
        url: 'https://playground.z.wiki/',
        desc: '诸多游乐项目，快来体验吧！',
      }, {
        title: '🧑‍💻 代码片段',
        url: 'https://snippets.z.wiki/',
        desc: '包含js、shell、nginx、java等实用代码片段！',
      }, {
        title: '🖼 敖武的图床',
        url: 'https://tuchuang.z.wiki/misc/tuchuang.html',
        desc: '免费图床，上传图片、压缩包等任意文件。',
      }, {
        title: '🔗 短网址服务',
        url: 'https://z.wiki/misc/short-url.html',
        desc: '缩短你的网址，永久有效。',
      }, {
        title: '🌆 城市信息查询',
        url: 'https://playground.z.wiki/lbs/showCityInfo',
        desc: '城市 adcode 查询。',
      }, {
        title: '🏫 30分钟正则入门教程',
        url: 'https://z.wiki/tools/reg/',
        desc: '通俗易懂的正则表达式入门教程。',
      }]
    },
   
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">

</style>
