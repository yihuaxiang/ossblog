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
        title: '🔥 站内搜',
        url: 'https://playground.z.wiki/search/page',
        desc: '全文检索，无所不能',
      }, {
        title: '🖼 敖武的图床',
        url: 'https://playground.z.wiki/img-cloud/index.html',
        desc: '免费图床，上传图片、压缩包等任意文件。',
      }, {
        title: '🖼 图床小镇',
        url: 'https://imgbed.cn/',
        desc: '专业稳定的外贸图床',
      }, {
        title: '💻 AI 中转服务',
        url: 'https://xiangfaka.com/item/rhm0qc',
        desc: '为 CodeX 提供的稳定可靠的中转服务',
      }, {
        title: '⚒️  IT 工具箱',
        url: 'https://fukit.cn/',
        desc: '程序员的百宝箱',
      }, {
        title: '🧪 敖武的实验室',
        url: 'https://z.wiki/jsbin',
        desc: '在线写代码，实时预览，实时分享。',
      }]
    },
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">

</style>
