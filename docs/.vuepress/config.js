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
        src: "https://z.wiki/autoupload/20240123/it8z.socket.io.js"
      }
    ],
    [
      "script",
      {
        src: "https://z.wiki/autoupload/20240123/ndwt.jquery.min.js"
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
        rel: "prerender",
        href: "https://playground.z.wiki/search/page"
      }
    ],
    [
      'link',
      {
        rel: "stylesheet",
        href: "https://z.wiki/autoupload/20240201/ehnl.css%403.css"
      }
    ],
    [
      'link',
      {
        rel: 'manifest',
        href: './tools/manifest.json'
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
    ],
    [
      "script",
      {
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6344690795699907",
        async: "",
        crossorigin: "anonymous"
      }
    ],
    [
      "script",
      {
        src: "https://cdn.ampproject.org/v0/amp-ad-0.1.js",
        async: true,
        "custom-element": "amp-ad"
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
    // [
    //   "vuepress-plugin-comment",
    //   {
    //     choosen: "valine",
    //     // options选项中的所有参数，会传给Valine的配置
    //     options: {
    //       el: "#valine-vuepress-comment",
    //       appId: "yWol7msCKGE7rhKvJ8GF2wvT-gzGzoHsz",
    //       appKey: "U22GE79KAkhSrl66FaHi1qqx",
    //       path: '<%- frontmatter.to.path %>'
    //     }
    //   }
    // ],
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
        minLength: 300, // 如果长度超过 100 个字符
        authorName: 'https://z.wiki'
      },
    ],
    [
      'vuepress-plugin-medium-zoom',
      {
        delay: 1000,
        selector: 'body .content__default :not(a) > img:not(.icon):not(.medium-zoom-image)',
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
    }],
    require('./search.js')
  ],
  themeConfig: {
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
          {text: '实验室', link: 'https://z.wiki/jsbin/'},
          {text: '短网址', link: 'https://z.wiki/misc/short-url.html'},
          {text: 'adcode 查询', link: 'https://playground.z.wiki/lbs/showCityInfo'},
          {text: '在线画图', link: 'https://hua.ps.ooo'},
          {text: '在线PS', link: 'https://ps.ooo/'},
          {text: '文心一言', link: 'https://yiyan.baidu.com/'},
          {text: 'URL编辑器', link: 'https://playground.z.wiki/URL-Editor/'},
          {text: '免费音乐', link: 'https://tool.liumingye.cn/music/'},
          {text: '程序员鱼皮', link: 'https://codefather.cn/'},
        ]
      },
      {
        text: '友链',
        ariaLabel: '友情链接',
        items: [
          {text: '泪雪博客', link: 'https://zhangzifan.com'},
          {text: '尼尔的编程专栏', link: 'https://www.supremepole.com/'},
          {text: '黄金工具箱', link: 'https://goldtools.cn/'},
          {text: '余子越的博客', link: 'https://yuchaoshui.com/'},
          {text: '小鹿的个人网站', link: 'https://www.siena.zone/'},
          {text: '谦行 CSDN', link: 'https://home.cnblogs.com/u/dolphinX'},
          {text: '谦行 语雀', link: 'https://www.yuque.com/sunluyong'},
          {text: '鄢云峰的个人网站', link: 'https://yanyunfeng.com/'},
          {text: '程序员工具箱', link: 'https://fukit.cn/'},
          {text: '余华的个人博客', link: 'https://www.yuhua.pub/'},
          {text: '51杀猪网', link: 'https://51shazhu.com'},
          {text: 'Tech Philosopher', link: 'https://blog.bktus.com/'},
          {text: 'Python简明教程', link: 'https://memoo.online'},
        ]
      },

      {text: '生活', link: '/life/'},
      {text: '搜索', link: 'https://playground.z.wiki/search/page'},
      {
        text: '其他', 
        items: [
          {text: '琐碎', link: '/misc/'},
          {text: '工作', link: '/work/'},
          {text: '游乐场', link: 'https://playground.z.wiki'},
          {text: '代码片段', link: '/snippets/'},
          {
            text: '下载',
            ariaLabel: '下载',
            items: [
              {text: '系统镜像', link: 'https://z.wiki/resource/system-mirror-iso.html'},
              {text: '破解软件', link: 'https://z.wiki/resource/apps.html'},
              {text: '电子书', link: 'https://z.wiki/resource/ebooks.html'},
            ]
          },
        ]
      },
      // {text: 'github', link: 'https://github.com/yihuaxiang/ossblog'}
    ],
    sidebar: {
      '/tech/': [
        'python',
        'jsonpath',
        'arthas',
        'lets-encrypt',
        'vim-jump',
        'apple-privacy-protection',
        'here-document',
        'request-merge',
        'google-console-insight',
        'secure-gallery',
        'google-seo',
        'edge-rubbish',
        'tls',
        'reversal',
        'github-passkey',
        'http2',
        'docker-tech',
        'vim-macro',
        'lsof',
        'sse',
        'glm-130b',
        'ai-text-split',
        'docker-container-port',
        'coroutine',
        'http',
        'free-domain',
        'cdn',
        'baota',
        'aspx',
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
        'shijiazhuang',
        'taizhou',
        'sanya',
        'hk',
        'night',
        'shaoxing',
        'mingyu',
        'jeju',
        'life-show',
        'bike',
        'rent-a-house',
        'economic-downturn',
        'remove',
        'cloud',
        '2024-new-year',
        'zhuhai',
        'tianjin-2',
        'google-search-console',
        'us-visa',
        'ai',
        'turtledove',
        'sla-compensation',
        'weight',
        'tianjin',
        'zelda',
        'sanguo',
        'spring-2023',
        'pad-pasting',
        'procreate',
        'friendship',
        'chrome-keychain',
        'beijing-wildlife-park',
        'christmas-of-2022',
        'covid-19-positive',
        'openai',
        'detection-of-covid-19',
        'COVID-19',
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
        'ddos-new',
        'android',
        'gmail',
        'ukraine',
        'weibo-jubao',
        'paris-olympic-games',
        'new-macbook',
        'meiguodaxuan',
        'aliyun',
        'ai',
        'ussr',
        'ddos',
        'attack-tuchuang',
        'china-in-1925',
        'aigc',
        'try-files',
        'it-tools',
        'zlib',
        'riskprins',
        'google-ads',
        'opera',
        'blog-upgrade',
        'issue-from-comment-plugins',
        'redis-search',
        'comment-plugin',
        'art-of-strategy',
        'tech-article-skill',
        'mvn',
        'tuchuang-upgrade',
        'debian',
        'the-nature-of-management',
        'vue-weekly-download',
        'report',
        'short-url',
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
        'my-minds',
        'performance',
        'the-answers-of-alibaba'
      ],
      '/snippets/': [
        'css/',
        'htaccess/',
        'html/',
        'javascript/',
        'mac/',
        'nginx/',
        'robots/',
        'shell/'
      ]

    }
  },
  locales: {
    '/': {
      lang: 'zh-CN',
    }
  },
  globalUIComponents: ['BlogComment', 'PvAccumulation'],
  evergreen: true
}


