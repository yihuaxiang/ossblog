# lightProxy 常见配置


`LightProxy` 是 `IFE` 团队开发的一款基于 `Electron` 和 `whistle` 的开源桌面代理软件，致力于让前端开发人员能够精确的掌握自己的开发环境，通过 HTTP 代理使用规则转发、修改每一个请求和响应的内容。

通过`LightProxy`用户可以快速进行转包、修改包，解决开发过程中的各个拦路虎。

![](https://z.wiki/images/20220330/bdb51ebd3fb94a479cad74fb631bd68e.png)

1. 下载链接：[github/alibaba/lightproxy](https://github.com/alibaba/lightproxy/releases)
2. 国内下载：[LightPxory](https://z.wiki/autoupload/2022-09-14/57a22caeb1b24568bd5a588f1062c5e2.LightProxy.app.zip)

典型应用：


### 映射本地文件

```
https://z.wiki/web.js file:///Users/xxx/xxx/web.js
```

### 解决跨域问题

```
https://z.wiki/path resCors://https://xxx.com
```

### 添加请求头

```
https://z.wiki/path resHeaders://`
{
    "key": "value"
}
`
```

### 请求添加`cookie`

```
https://z.wiki reqCookies://{“cookie_name”:”cookie_value”}
```

### 设置响应内容

```
https://z.wiki/path `{"content": "content"}`
```

### 域名转发


```
https://z.wiki https://z.wiki # 将前者的所有请求转发到后者
```

### 设置响应头


```
https://z.wiki/welcome  resHeaders://`{"Content-Type": "text/html"}`  `<html>test</html>`
```

### 模拟延迟


```
https://z.wiki/api.json resDelay://1000
```
