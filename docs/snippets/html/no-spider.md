---
meta:
  - name: description
    content: 通过 HTML meta 标签和 rel 属性禁止搜索引擎爬虫爬取网页内容的方法
  - name: keywords
    content: HTML,meta,robots,noindex,nofollow,爬虫,搜索引擎优化,SEO
tags: ["HTML", "SEO", "爬虫", "meta标签"]
---

# 通过 meta 标签禁止爬虫爬取


所有的爬虫走开：

```html
<meta name="robots" content="noindex">
```

不要爬这个链接：

```html
<a href="privatepage.html" rel="nofollow">私有链接</a>
```
