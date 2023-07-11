# nginx 缓存设置

![](https://z.wiki/images/20220430/541461df6dca45498a9960f79f9a7de8.png)

### nginx 是什么

`Nginx`是异步非阻塞框架的`web`服务器，可以用作反向代理、负载平衡器、缓存服务器。
该软件由俄罗斯程序员伊戈尔·赛索耶夫开发并于`2004`年首次公开发布。`2011`年成立同名公司以提供支持服务。

### 什么是`http`缓存

![](https://z.wiki/images/20220430/f06eae6fce9949b19768de6295e4b423.png)


在`web`开发中，`http`缓存是指充分利用浏览器（和`CDN`）的特性对于已下载的资源进行复用（从内存、磁盘中直接读取，而非重新发送网络请求），从而显著的提升网络加载速度。


浏览器都具有缓存能力，尤其对于静态资源文件，在刷新页面的时候都会优先从缓存中读取。如下图，浏览器控制台，使用本地缓存的请求往往都能在数毫秒内完成，从而在提升网站加载速度的同时减轻服务器的负载。

![](https://z.wiki/images/20220430/1a1d9c7d78f44f758798d0dcfa0236b1.png)

生产开发中，客户端缓存（浏览器）仅是我们要面对的缓存之一，另外一种就是`CDN`缓存，`CDN`是利用全国（全球）大量节点提供快速、稳定、安全的内容分发加速服务，
通过提前缓存资源，利用用户最近节点提供下载服务，从而加速客户访问速度（顺便降低服务器压力）。

`Cache-Control` 是一个`http`响应头字段，
通过该响应头可以告诉浏览器、`CDN`指定的资源是否可以缓存、缓存多久。

### 如何在 NGINX 中使用缓存控制

`Cache-Control`的可选值

1. `public` 公开信息，可以被浏览器+`CDN`进行缓存，适用于大部分静态资源
2. `private` 包含`CDN`不应该缓存的信息，但是浏览器可以缓存，一般为和用户相关的数据
3. `no-cache` 名称具有一定的误导性，`no-cache`并不表示🈲缓存，而是协商缓存，既需要和服务器进行内容校验，内容无变更的情况下加载本地缓存（对应`304`状态码）
4. `no-store` 禁止缓存


设置缓存的最大生命周期`max-age`，`max-age`的值通常以秒为单位的数字，如：

```nginx
add_header Cache-Control "public, max-age=120"; # 设置 120 秒的缓存
```

但是如下值有特殊含义

1. -1 或`off`: 关闭缓存
2. `epoch`: 设置过期时间为`1 January,1970,00:00:01 GMT`（🤔设置成这个值有啥意义呢？）
3. `max`: `the Unix Epoch`，2037 年 12 月 31 日 （[2038年问题](https://baike.baidu.com/item/2038%E5%B9%B4%E9%97%AE%E9%A2%98/10578442)）
4. `30s`: `30`秒
5. `1m`: `1`分钟
6. `24h`: `24`小时
7. `3d`: `3`天
8. `1M`: `1`个月
9. `2y`: `2`年

此外，还可以添加`no-transform`指令来禁止可能存在的任何转换，例如，一些`CDN`服务会压缩图像以减少带宽。该指令禁用该行为。

在`nginx`配置中，可以按如下方式添加`Cache-Control`头信息:

```nginx
expires 1y; # 将 max-age 设置为 1 年
add_header Cache-Control "public, no-transform"; # 设置为公开信息，浏览器、CDN 均可缓存，并禁止 CDN 的任何转换
```

如果将以上配置放到`server`代码块中可以实现整站缓存配置，但更好的方案是通过文件后缀进行配置:

```nginx
location ~* .(?:css|js)$ {
  expires 1y;
  add_header Cache-Control "public";
}
```

以上配置只对`css`、`js`文件设置了缓存。

```nginx
location /profile {
    expires 2d;
    add_header Cache-Control "public, no-transform";
}
```

以上配置只对 `/profile` 以及对应子路径进行缓存配置。

此外还可以使用 `=` 修饰符，只对指定的路径进行缓存配置。

### Surrogate-Control

上文提到的缓存配置将同时对浏览器、`CDN`生效，如果需要对`CDN`单独进行配置，则可通过`Surrogate-Control`头信息配置，
大多数`CDN`均支持该头信息。

配置如下：

```nginx
add_header Surrogate-Control "public, max-age=86400";
add_header Cache-Control "public, max-age=120";
```

### 参考文档

1. [http 缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching)
2. [nginx 添加 header](https://snippets.z.wiki/#!./snippets/nginx/nginx-header/)
