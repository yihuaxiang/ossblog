module.exports = {
  title: '符栋栋的博客',
  description: '符栋栋的博客',
  themeConfig: {
    lastUpdated: 'Last Updated', // string | boolean
    // sidebar: 'auto',
    displayAllHeaders: true,
    // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    nextLinks: true,
    // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    prevLinks: true,
    nav: [
      { text: '首页', link: '/' },
      { text: '技术文章', link: '/tech/' },
    { text: '生活', link: '/life/' }
    ],
    sidebar: {
        '/tech/': [
            '',
            'first',
            'second',
            'third'
        ],
      '/life/': [
          '',
          'first',
          'second',
          'third'
      ]
    }
  }
}
