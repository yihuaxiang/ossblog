---
meta:
  - name: description
    content: robots 是什么？如何使用 robots 进行爬虫爬取策略？如何优化搜索排名？如何优化SEO
  - name: keywords
    content: robots,爬虫协议,爬虫,搜索排名,SEO
tags: ["robots", "爬虫协议", "爬虫", "搜索排名", "SEO"]
---
# robots.txt

### robots.txt 是什么

`robots.txt` 规范官网： [https://www.robotstxt.org/](https://www.robotstxt.org)

`robots.txt` 是位于网站根目录下的纯文本文件，用于告知网络爬虫"改网站中哪些可以被爬取，哪些不可以被爬取"。

`robots.txt` 只是约定俗成的协议，`Google`、百度、`bing`等爬虫都会遵守该规范，但并非所有搜索引擎都支持，故通过`robots.txt`无法 100% 地保证爬取效果（屏蔽效果）。

### robots.txt 怎么用

允许所有的爬虫：

```
User-agent: *
Allow:/
```


仅允许特定的爬虫：（`name_spider`用真实名字代替，具体爬虫名字可在附录连接中查看）

```
User-agent: name_spider
Allow: /
```


拦截所有的爬虫：

```
User-agent: *
Disallow: /
```

禁止所有爬虫访问特定目录：

```
User-agent: *
Disallow: /cgi-bin/
Disallow: /images/
Disallow: /tmp/
Disallow: /private/
```


仅禁止坏爬虫访问特定目录（BadBot用真实的名字代替）：

```
User-agent: BadBot
Disallow: /private/
```


禁止所有爬虫访问特定文件类型：

```
User-agent: *
Disallow: /*.php$
Disallow: /*.js$
Disallow: /*.inc$
Disallow: /*.css$
```

允许所有爬虫进行访问

```text
User-agent: *
Disallow:
```

### 非标准扩展协议

#### Sitemap

目前主流搜索引擎均支持`Sitemap`，`sitemap`用于告诉浏览器网站都包含哪些`URL`，

使用方法（写到 `robots.txt` 中）

```shell
Sitemap: <path-to-sitemap.xml>
```

`sitemap` 文件内容格式如下：


```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
    <url>
        <loc>https://fudongdong.com/</loc>
        <lastmod>2022-04-16T12:42:45.000Z</lastmod>
        <changefreq>daily</changefreq>
    </url>
    <url>
        <loc>https://fudongdong.com/life/</loc>
        <lastmod>2022-02-05T14:55:06.000Z</lastmod>
        <changefreq>daily</changefreq>
    </url>
    <url>
        <loc>https://fudongdong.com/life/bento.html</loc>
        <lastmod>2022-03-28T14:56:49.000Z</lastmod>
        <changefreq>daily</changefreq>
    </url>
</urlset>
```

#### Crawl-delay 指令

`Crawl-delay`参数设置爬虫的爬取时间间隔，避免对服务器的性能造成影响

```
User-agent: *
Crawl-delay: 10
# 每次爬取等待10秒后继续爬取其他链接
```

### 其他替代品

`robots.txt`是最为广泛使用的方法，
此外也可以通过`robots Meta`标签针对特定页面做设置。

```html
<head>
	<meta name="robots" content="noindex,nofollow" />
</head>
```

### 案例分析

#### 腾讯

腾讯官网为`https://www.tencent.com`，对应的 `robots.txt`链接为`https://www.tencent.com/robots.txt` ，内容如下：

```text
User-agent: *
Disallow:
```

从以上配置中可看出，腾讯官网对任意爬虫未设置禁止爬取的规则，既：整个腾讯官网允许任意爬虫进行爬取，那如何验证爬虫爬取了腾讯官网了？
这里就用到了搜索小技巧`site`指令了。

通过百度搜索以下关键字`腾讯 site:www.tencent.com`，如下图，我们能搜到腾讯官网上很多内容。

![](https://1.z.wiki/images/20220501/2be3526a6ff6448ebdc28a776514ddee.png)

#### 淘宝

> 2008年9月8日，淘宝网正式向百度宣战：淘宝网将屏蔽百度的搜索引擎抓取。
> 
> from [https://www.guayunfan.com/baike/305946.html](https://www.guayunfan.com/baike/305946.html)

淘宝屏蔽了百度爬虫，在技术上有很多种手段，但在这里我们只讨论`robots.txt`，查看淘宝的`robots.txt`，内容如下：

```text
User-agent: Baiduspider
Disallow: /

User-agent: baiduspider
Disallow: /
```

![](https://2.z.wiki/images/20220501/bc60a315f18c4d19bf732f83c9890ecb.png)

唯独屏蔽百度爬虫，有意思，有意思！

试试使用百度搜索淘宝上的东西吧，比如：手机，效果如下：

![](https://3.z.wiki/images/20220501/4ceadc46c25342e9a670807932c41354.png)

嗯嗯，整体效果还是不错的，搜索到的内容没有是`taobao.com`域名下的，不过有`cpcwi.taobao.com`域名下的内容，难道有漏网之鱼？
看下这个二级域名下的`robots.txt`，内容如下：

```text
User-agent: *
Disallow: /
```

咳咳，`cpcwi.taobao.com`这个域名是禁止所有爬虫的，难道是百度爬虫不道德？使用百度和必应搜索`手机 site:cpcwi.taobao.com`对比下结果吧。

![](https://4.z.wiki/images/20220501/2e75b51248b941b7b652c425886d7d3a.png)

哈哈，果然是百度不道德了😒😒😒

回到淘宝，淘宝专门屏蔽了百度，却没有屏蔽其他爬虫，那我们用必应搜索`手机 site:taobao.com`应该能搜索内容才对，看下吧：

果不其然

![](https://1.z.wiki/images/20220501/edc227c484af4a559018ff9a3f1970c1.png)

### 附录

1. 爬虫列表 [https://www.robotstxt.org/db.html](https://www.robotstxt.org/db.html)
2. 国内常见爬虫 [https://www.baidu.com/robots.txt](https://www.baidu.com/robots.txt)

```text
百度：Baiduspider
谷歌：Googlebot
微软：MSNBot
百度图片：Baiduspider-image
有道：YoudaoBot
搜狗：Sogou web spider
搜狗学术：Sogou inst spider
搜狗：Sogou spider2
搜狗博客：Sogou blog
搜狗新闻：Sogou News Spider
搜狗：Sogou Orion spider
中搜：ChinasoSpider
搜搜：Sosospider
宜搜：yisouspider
宜搜：EasouSpider
```


<TheEnd />

