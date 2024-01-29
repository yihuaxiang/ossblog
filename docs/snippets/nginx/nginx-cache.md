# nginx 缓存


### 静态资源缓存

设置为一天缓存，更多缓存配置可参考[nginx 缓存](https://z.wiki/tech/nginx-cache.html)

```
location ~* .(?:css|js)$ {
  expires 1d;
  add_header Cache-Control "public";
}
```
