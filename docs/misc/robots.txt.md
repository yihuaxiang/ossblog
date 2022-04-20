# robots.txt 是什么

`robots.txt` 是位于网站根目录下的纯文本文件，用于告知网络爬虫"改网站中哪些可以被爬取，哪些不可以被爬取"。

`robots.txt` 只是约定俗成的协议，`Google`、百度、`bing`等爬虫都会遵守该规范，但并非所有搜索引擎都支持，故通过`robots.txt`无法 100% 地保证爬取效果（屏蔽效果）。

# robots.txt 怎么用

允许所有的爬虫：

```
User-agent: *
Allow:/
```


仅允许特定的爬虫：（name_spider用真实名字代替）

```
User-agent: name_spider
Allow:
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


# 非标准扩展协议

## Sitemaps

目前主流搜索引擎均支持`Sitemap`，`sitemap`用于告诉浏览器网站都包含哪些`URL`，

使用方法（写到 `robots.txt` 中）

```shell
Sitemap: <path-to-sitemap.xml>
```

## Crawl-delay 指令

`Crawl-delay`参数设置爬虫的爬取时间间隔，避免对服务器的性能造成影响

```
User-agent: *
Crawl-delay: 10
# 每次爬取等待10秒后继续爬取其他链接
```

# 其他替代品

`robots.txt`是最为广泛使用的方法，
此外也可以通过`robots Meta`标签针对特定页面做设置。

```html
<head>
	<meta name="robots" content="noindex,nofollow" />
</head>
```
