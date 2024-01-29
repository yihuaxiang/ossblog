# 通过 meta 标签禁止爬虫爬取


所有的爬虫走开：

```html
<meta name="robots" content="noindex">
```

不要爬这个链接：

```html
<a href="privatepage.html" rel="nofollow">私有链接</a>
```
