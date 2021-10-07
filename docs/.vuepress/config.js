module.exports = {
  title: '符栋栋的博客',
  description: '符栋栋的博客',
  themeConfig: {
    // sidebar: 'auto',
    displayAllHeaders: true,
    // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    nextLinks: true,
    // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    prevLinks: true,
    nav: [
      { text: '首页', link: '/' },
      { text: '技术文章', link: '/tech/' }
    ],
    sidebar: [
      {
        title: '技术文章',   // 必要的
        path: '/tech/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/tech/first',
          '/tech/second',
          '/tech/third'
        ]
      }
    ]
  }
}
