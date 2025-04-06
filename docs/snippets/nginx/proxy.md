---
meta:
  - name: description
    content: nginx 反向代理配置指南，包括如何设置反向代理并追加参数，解决域名解析问题
  - name: keywords
    content: nginx,反向代理,proxy_pass,resolver,域名解析,参数追加
tags: ["nginx", "反向代理", "proxy_pass", "resolver"]
---

# nginx 反向代理并追加参数



反向代理并追加参数
```nginx
location /v1/resources {
    resolver 8.8.8.8;
    proxy_pass https://domain.com$uri?key=value;
}
```

设置`resolver`是因为`proxy_pass`转发到某个域名时会尝试自行从`DNS`缓存中获取域名解析后的`ip`，
由于未设置域名解析服务导致如果没有缓存就会报错。
