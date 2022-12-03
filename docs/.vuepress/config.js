const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)
dayjs.extend(timezone);

module.exports = {
  head: [
    // 添加cnzz统计
    [
      "script",
      {
        src: "https://cdn.staticfile.org/socket.io/1.3.7/socket.io.js"
      }
    ],
    [
      "script",
      {
        src: "https://cdn.staticfile.org/jquery/2.2.1/jquery.min.js"
      }
    ],
    [
      "script",
      {
        src: "https://v1.cnzz.com/z_stat.php?id=1280548058&web_id=1280548058"
      }
    ],
    [
      'link',
      {
        rel: "stylesheet",
        href: "https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/css/css@3.css"
      }
    ],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      }
    ],
    [
      'meta',
      {
        name: 'baidu-site-verification',
        content: 'code-zlxkNua3Rq'
      }
    ],
    [
      'meta',
      {
        name: '360-site-verification',
        content: 'bf083d8bf20aa759b43de197e6005e59'
      }
    ],
    [
      "script",
      {
        src: "https://s.ssl.qhres2.com/ssl/ab77b6ea7f3fbf79.js",
        id: "sozz"
      }
    ]
  ],
  title: '敖武的博客',
  description: '敖武的博客',
  lang: 'zh-CN',
  plugins: [
    [
      "@mr-hope/git",
      {
        contributor: false,
        timezone: 'Asia/Shanghai',
      },
    ],
    [
      'sitemap',
      {
        hostname: 'https://z.wiki'
      }
    ],
    // 评论插件
    [
      "vuepress-plugin-comment",
      {
        choosen: "valine",
        // options选项中的所有参数，会传给Valine的配置
        options: {
          el: "#valine-vuepress-comment",
          appId: "yWol7msCKGE7rhKvJ8GF2wvT-gzGzoHsz",
          appKey: "U22GE79KAkhSrl66FaHi1qqx",
          path: '<%- frontmatter.to.path %>'
        }
      }
    ],
    [
      'social-share',
      {
        networks: ["facebook", "line", "reddit", "email", "skype", "telegram", "twitter", "weibo", "qq", "douban", "whatsapp"],
        autoQuote: true,
        isPlain: true
      },
    ],
    'img-lazy',
    '@vuepress/nprogress',
    '@vuepress/back-to-top',
    [
      'copyright',
      {
        disabled: false,
        noCopy: false, // 选中的文字将无法被复制
        minLength: 20, // 如果长度超过 100 个字符
        authorName: 'https://z.wiki'
      },
    ],
    [
      'vuepress-plugin-medium-zoom',
      {
        delay: 1000,
        selector: 'body :not(a) > img:not(.icon):not(.medium-zoom-image)',
        options: {},
      },
    ],
    [
      'seo',
      {
        siteTitle: (_, $site) => $site.title,
        title: $page => $page.title,
        description: $page => $page.frontmatter.description,
        author: (_, $site) => $site.themeConfig.author,
        tags: $page => $page.frontmatter.tags,
        twitterCard: _ => 'summary_large_image',
        type: $page => ['articles', 'posts', 'blog'].some(folder => $page.regularPath.startsWith('/' + folder)) ? 'article' : 'website',
        url: (_, $site, path) => ($site.themeConfig.domain || '') + path,
        image: ($page, $site) => $page.frontmatter.image && (($site.themeConfig.domain && !$page.frontmatter.image.startsWith('http') || '') + $page.frontmatter.image),
        publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
        modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
      }
    ],
    ['@vuepress/last-updated', {
      transformer: (timestamp, lang) => {
        dayjs.locale(lang)
        return dayjs(timestamp).toString()
      }
    }]
  ],
  themeConfig: {
    algolia: {
      apiKey: 'c9c735fa648b371048492cc6e47695d9',
      indexName: 'fudongdong',
      appId: 'LYSTANXHG8',
    },
    lastUpdated: '最后更新', // string | boolean
    // sidebar: 'auto',
    displayAllHeaders: true,
    // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    nextLinks: true,
    // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    prevLinks: true,
    nav: [
      {text: '首页', link: '/'},
      {text: '技术', link: '/tech/'},
      {
        text: '工具',
        ariaLabel: '工具',
        items: [
          {text: '正则', link: 'https://z.wiki/tools/reg/'},
          {text: '聊天室', link: 'https://chat.z.wiki/'},
          {text: '音乐', link: 'https://chat.z.wiki/player'},
          {text: '图床', link: 'https://tuchuang.z.wiki/misc/tuchuang.html'},
          {text: 'IP查询', link: 'https://playground.z.wiki/lbs/showIp'},
          {text: '百度', link: 'https://baidu.z.wiki'},
          {text: 'LOGO制作', link: 'https://logoly.pro/#/'},
          {text: '表情制作', link: 'https://sorry.xuty.tk/wangjingze/'},
          {text: '二维码', link: 'https://z.wiki/misc/qrcode.html'},
          {text: '徽章', link: 'https://shields.io/'},
          {text: 'jsbin', link: 'https://z.wiki/jsbin/'},
          {text: '短网址', link: 'https://z.wiki/misc/short-url.html'},
          {text: 'adcode 查询', link: 'https://playground.z.wiki/lbs/showCityInfo'},
        ]
      },
      {
        text: '下载',
        ariaLabel: '下载',
        items: [
          {text: '系统镜像', link: 'https://z.wiki/resource/system-mirror-iso.html'},
        ]
      },
      {text: '生活', link: '/life/'},
      {text: '工作', link: '/work/'},
      {text: '琐碎', link: '/misc/'},
      {text: '游乐场', link: 'https://playground.z.wiki'},
      {text: 'snippets', link: 'https://snippets.z.wiki'},
      // {text: 'github', link: 'https://github.com/yihuaxiang/ossblog'}
    ],
    sidebar: {
      '/tech/': [
        'db',
        'centos-set-swap',
        'shell',
        'mysql-login',
        'css-to-jss',
        'jsbin',
        'placeholder',
        'coordinate-system',
        'meeting',
        'download-speed',
        'html-space-entity',
        'springboot-circular-dependencies',
        'java-httpclient',
        'chkconfig',
        'crontab',
        'uuid',
        'nginx-cache',
        'snippets',
        'my-first-post-in-stackoverflow',
        'koa-vs-egg',
        'growth',
        'mfe',
        "chromeext",
        "docker",
        "bdzz",
        "360zz",
        "beian",
        'neovim',
        'git',
        'pronunciation',
        'ripgrep'
      ],
      '/life/': [
        'moha',
        'ukraine',
        'horrible-lift-well',
        'olympic-tower',
        'love',
        'aosen',
        'feeling',
        'usstock',
        'decorate',
        'baike',
        'climbing',
        'july-xiangshan',
        'communication',
        'da-wangjing-gongyuan',
        'olympic-forest-park',
        '2022-labour-day',
        'dayidu',
        'girl-in-spring-of-2022',
        'the-tomb-sweeping-day',
        'playground',
        'bento',
        'food',
        'firstsnow',
        'snow',
        'halloween',
        'sea',
        'switch',
        'switchfitness',
        'tianmen',
        'tsingtao',
        'thatgirl',
        'billiards',
        'flowercountry',
        'first-snow-in-2022',
        'the-winter-olympics',
        'solana',
        'zy-smooth4',
        'youth',
        'bombomspace',
        'involution',
        'wine'
      ],
      '/misc/': [
        'report',
        'ShortUrl',
        'macos-ventura',
        'lightproxy',
        'sls',
        'real-estate-trend',
        'old-videos',
        'iOS16',
        'phone-blog',
        'rent-ratio',
        'open-source-request',
        'iterm2',
        'rom',
        'document-fragment',
        'alfred-adcode-query',
        'invalid-attack',
        'watermask',
        'fav-website',
        'idea-plugins',
        'robots.txt',
        'z-dot-wiki',
        'ip-query',
        'img-cloud',
        'alfred',
        'centos-8-eof',
        'cmd-recommend',
        'goodthings',
        'cultrue-of-argument',
        'ru',
        'shortcut',
        'religious',
        'karabiner',
        'ishot',
        'chrome-extensions',
        'realtime-caption',
        'discrimination'
      ],
      '/work/': [
        'performance',
        'the-answers-of-alibaba'
      ]
    }
  },
  locales: {
    '/': {
      lang: 'zh-CN',
    }
  },
  globalUIComponents: ['PvAccumulation'],
  evergreen: true
}
