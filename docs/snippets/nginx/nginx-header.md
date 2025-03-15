---
meta:
  - name: description
    content: nginx header 添加与删除，解决跨域问题，处理 OSS 自动下载问题
  - name: keywords
    content: nginx,header,添加,删除,跨域,CORS,OSS,proxy_hide_header
tags: ["nginx", "header", "CORS", "proxy"]
---

# nginx header 添加与删除


接口和前端部署在不同与名下时可以通过`nginx` 添加`cors header`解决跨域问题

## 添加 header

```
location / {
    ...
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-Content-Type-Options nosniff;
    add_header Access-Control-Allow-Origin *; # 允许跨域访问
}
```

## 删除 header

网站博客部署在`OSS`上，访问`oss`的页面时都会自动下载，
原因是：响应头中添加了`x-oss-force-download`、`Content-Disposition: attachmeng`等字段，
导致浏览器自动下载，故通过`nginx`转发时需要对`header`进行操作


```
location / {
    ...
    proxy_hide_header Content-Disposition;
    proxy_hide_header x-oss-force-download;
}
```
