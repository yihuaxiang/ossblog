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

## Sitemap

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
