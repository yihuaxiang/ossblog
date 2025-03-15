---
meta:
  - name: description
    content: nginx 缓存配置详解，包括静态资源缓存、代理缓存等配置方法和最佳实践
  - name: keywords
    content: nginx,cache,缓存,静态资源,配置,代理缓存
tags: ["nginx", "cache", "缓存", "配置"]
---

# nginx 缓存


### 静态资源缓存

设置为一天缓存，更多缓存配置可参考[nginx 缓存](https://z.wiki/tech/nginx-cache.html)

```
location ~* .(?:css|js)$ {
  expires 1d;
  add_header Cache-Control "public";
}
```
