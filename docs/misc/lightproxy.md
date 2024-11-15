---
meta:
  - name: description
    content: lightProxy 常见配置 使用规则 教程 开发必备 前端程序员 后端
  - name: keywords
    content: lightProxy 抓包 代理 请求拦截 收集调试 debug
---
# lightProxy 常见配置


`LightProxy` 是 `IFE` 团队开发的一款基于 `Electron` 和 `whistle` 的开源桌面代理软件，致力于让前端开发人员能够精确的掌握自己的开发环境，通过 HTTP 代理使用规则转发、修改每一个请求和响应的内容。

通过`LightProxy`用户可以快速进行转包、修改包，解决开发过程中的各个拦路虎。

<ImgView title="lightProxy" url="https://z.wiki/images/20220330/bdb51ebd3fb94a479cad74fb631bd68e.png" />

1. 下载链接：[github/alibaba/lightproxy](https://github.com/alibaba/lightproxy/releases)
2. 国内下载：[LightPxory](https://z.wiki/autoupload/2022-09-14/57a22caeb1b24568bd5a588f1062c5e2.LightProxy.app.zip)

典型应用：


### 映射本地文件

```
https://z.wiki/web.js file:///Users/xxx/xxx/web.js
```


批量映射 js
```
^https://s.alicdn.com/@g/sc/pc-home-2022/***/css/***.css http://localhost:3333/css/$2.css
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


### 脚本动态生成内容

```
https://z.wiki/ scriptfile://`
exports.handleRequest = async (ctx, next) => {
  // do sth
  // ctx.fullUrl 可以获取请求url
  // ctx.headers 可以获取请求头
  // ctx.options 里面包含一些特殊的请求头字段，分别可以获取一些额外信息，如请设置的规则等
  // ctx.method 获取和设置请求方法
  // const reqBody = await ctx.getReqBody(); 获取请求body的Buffer数据，如果没有数据返回null
  // const reqText = await ctx.getReqText();  获取请求body的文本，如果没有返回''
  // const formData = await ctx.getReqForm(); 获取表单对象，如果不是表单，返回空对象{}
  // ctx.req.body = String| Buffer | Stream | null，修改请求的内容
  // next方法可以设置next({ host, port });
  // 只有执行next方法后才可以把正常的请求发送出去
  const { statusCode, headers } = await next(); 
  // do sth
  // const resBody = yield ctx.getResBody();
  // const resText = yield ctx.getResText();
  // ctx.status = 404; 修改响应状态码
  // ctx.set(headers); 批量修改响应头
  // ctx.set('x-test', 'abc'); 修改响应头
  // ctx.body = String| Buffer | Stream | null; 修改响应内容
  ctx.body = 'MOCK数据';
};
`
```

### 在终端中使用


```
export https_proxy=http://127.0.0.1:12888 http_proxy=http://127.0.0.1:12888 all_proxy=socks5://127.0.0.1:12889

curl https://baidu.com -I

Response

HTTP/1.1 200 Connection Established
Proxy-Agent: whistle
HTTP/2 302
server: bfe/1.0.8.18
date: Fri, 19 Jun 2020 03:36:36 GMT
content-type: text/html
content-length: 161
location: http://www.baidu.com/
__lightproxy-host-ip__: 127.0.0.1
__lightproxy-rules__: none
__lightproxy-real-url__: https://baidu.com/
__lightproxy-help__: See https://github.com/alibaba/lightproxy

```

### 更多文档

lightproxy 基于 whisle 开发而来，因此可以参考 whisle 的语法，文档地址：[https://wproxy.org/whistle/](https://wproxy.org/whistle/)
