---
meta:
  - name: description
    content: nginx 重定向配置指南，包括单页面重定向、整站重定向和子路径重定向的实现方法
  - name: keywords
    content: nginx,redirect,重定向,301重定向,永久重定向,临时重定向,单页面重定向,整站重定向
tags: ["nginx", "redirect", "重定向", "服务器配置"]
---

# nginx 重定向 redirect



单页面重定向
```nginx
server {
    location = /oldpage.html {
        return 301 http://example.org/newpage.html;
    }
}
```


整站重定向
```nginx
server {
    server_name old-site.com
    return 301 $scheme://new-site.com$request_uri;
}
```


子路径重定向
```nginx
location /old-site {
    rewrite ^/old-site/(.*) http://example.org/new-site/$1 permanent;
}
```


