# HTTP 协议，从 ZERO 到 HERO

![](https://9.z.wiki/autoupload/20230212/2t8Y.1610X2000-image.png)

### 介绍

HTTP（Hypertext Transfer Protocol）是一种用于分布式、协作式和超媒体信息系统的应用层协议。
它是万维网（World Wide Web）的基础协议，所有的网页浏览和数据交互都依赖于它。

HTTP 的主要目的是通过互联网将超媒体文档（如 HTML 文件）从服务器传送到客户端，
同时客户端也可以通过 HTTP 向服务器发送请求，以获取需要的资源（如图片、音频文件等）。

HTTP 协议是基于请求/响应模型的，客户端向服务器发送请求，服务器接收请求并进行处理，
最后向客户端返回响应。HTTP 协议使用简单的文本格式，并通过状态码、方法和头字段来管理请求/响应的过程。

### 历史

HTTP 协议的历史可以追溯到 1989 年，当时 Tim Berners-Lee 发明了万维网，
并创建了 HTTP 协议作为万维网的核心协议。HTTP 0.9 版本在 1991 年发布，
提供了简单的请求/响应模型，允许客户端请求 HTML 文件。随着万维网的发展，
HTTP 协议经历了多次版本的更新，从 1.0 到 1.1，其中包含了许多重要的改进，如支持更多的方法、状态码和头字段等。

目前，HTTP 协议已经成为网络应用开发的标准协议，广泛应用于各种网络应用，
如网页浏览、电子邮件、文件传输等。HTTP 2.0 版本在 2015 年发布，与之前的版本相比，
HTTP 2.0 提供了更快的数据传输速度和更高的效率，成为现代网络应用的主要协议之一。

![](https://1.z.wiki/autoupload/20230212/bfkU.878X2212-image.png)


### 请求/响应模型

HTTP 请求/响应模型是 HTTP 协议的基础。它描述了客户端和服务器之间的通信过程。

在 HTTP 协议中，客户端是请求方，服务器是响应方。请求的过程是：客户端发送请求到服务器，服务器接收请求并做出响应。

请求的格式如下：

```
请求方法 URL HTTP/版本
请求头

请求主体
```

请求方法描述了客户端对资源的请求方式，常用的请求方法包括 GET，POST，HEAD，PUT，DELETE 等。
URL 是请求的目标资源的位置。
HTTP/版本 是协议版本，最常见的是 HTTP/1.1。
请求头是可选的附加信息，包括客户端的需求、请求的内容等。
请求主体是请求的实际内容，如请求表单数据。

响应的格式如下：

```
HTTP/版本 状态码 状态码描述
响应头

响应主体
```

HTTP/版本是协议版本，通常是 HTTP/1.1。
状态码是一个三位数字，描述了服务器响应请求的结果。常见的状态码有 200 OK，404 Not Found，503 Service Unavailable 等。
状态码描述是对状态码的文字说明。

响应头是可选的附加信息，用于传递有关响应的附加信息。常见的 HTTP 响应头包括：

1. Cache-Control：控制缓存的行为。
2. Connection：指示是否需要保持连接。
3. Content-Encoding：指示使用的压缩方法。
4. Content-Length：指示响应正文的长度。
5. Content-Type：指示响应正文的 MIME 类型。
6. Date：指示响应的日期和时间。
7. Expires：指示响应过期的日期和时间。
8. Last-Modified：指示资源的最后修改日期和时间。
9. Server：指示服务器软件的名称和版本。
10. Set-Cookie：用于设置 cookie。

这仅仅是一些常见的 HTTP 响应头，实际上还有很多其他类型的 HTTP 响应头。更多 HTTP 响应头可以查看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)文档。

### 报文格式

HTTP 报文是通过 HTTP 协议进行请求和响应的主要内容。HTTP 报文由请求报文和响应报文两种形式组成。

请求报文通常由以下组成部分组成：

请求行：包含了请求方法（例如 GET、POST）、请求的 URL 和使用的 HTTP 版本。
请求头：包含了有关请求的附加信息，例如请求的内容长度、请求的来源和请求的 Acceptable 内容类型。
<空行>
请求主体：请求的正文，仅在请求方法为 POST 时出现。

响应报文通常由以下组成部分组成：

状态行：包含了 HTTP 版本、响应状态代码和状态代码的文本描述。
响应头：包含了有关响应的附加信息，例如内容长度、内容类型和服务器的类型。
<空行>
响应主体：响应的正文，包含了请求的结果。

总的来说，HTTP 报文是通过首部字段、空行和正文组成的。首部字段包含了有关请求或响应的附加信息，而正文则包含了请求或响应的主要内容。

例如当你访问[z.wiki](http://z.wiki)时：

请求如下
```
GET / HTTP/1.1
Host: z.wiki
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: io=MK50jBsxjF5t6aEsAAOG
```

响应如下
```
HTTP/1.1 301 Moved Permanently
Server: Tengine
Date: Sun, 12 Feb 2023 13:24:58 GMT
Content-Type: text/html
Content-Length: 262
Location: https://z.wiki/
Via: kunlun6.cn5186[,0]
Timing-Allow-Origin: *
EagleId: 7cec6e1016762082989013691e
Proxy-Connection: Keep-alive

<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html>
<head><title>301 Moved Permanently</title></head>
<body>
<h1>301 Moved Permanently</h1>
<p>The requested resource has been assigned a new permanent URI.</p>
<hr/>Powered by Tengine</body>
</html>

```

以上请求、响应可通过[Charles](https://www.charlesproxy.com/)查看


### 方法

HTTP协议支持多种请求方法，常见的方法包括：

GET：请求获取某一资源的数据，该方法是最常用的请求方法，一般用于请求静态数据。

POST：请求向服务器提交数据，常用于请求动态数据，例如提交表单数据。

PUT：请求更新某一资源，例如更新文件。

DELETE：请求删除某一资源。

HEAD：请求获取某一资源的响应头数据，而不请求整个资源内容。

OPTIONS：请求查询服务器的性能，例如支持的请求方法等。

CONNECT：请求将请求连接转换为隧道模式。

TRACE：请求服务器回显请求信息，用于调试。

以上只是 HTTP 协议支持的常见请求方法，不同的服务器实现可能支持不同的请求方法。

### 状态码

HTTP 协议的状态码是服务器向客户端返回的状态码，它表示请求的处理结果。状态码由三位数字组成，第一个数字定义了状态码的类别，如下所示：

1xx：消息，表示请求已被接受，需要继续处理。

2xx：成功，表示请求已被成功处理。

3xx：重定向，表示需要进一步的操作以完成请求。

4xx：客户端错误，表示请求中有语法错误或请求无法实现。

5xx：服务器错误，表示服务器在处理请求时发生内部错误。

#### 常见状态码

以下是一些常见的状态码：

200 OK：表示请求已被成功处理。

201 Created：表示请求已经被实现，而且有一个新的资源已经依据请求的需要而建立，且其 URI 已经随 Location 头信息返回。

204 No Content：表示请求已经被处理，但是没有返回任何内容。

301 Moved Permanently：表示请求的资源已永久移动到新位置。

302 Found：表示请求的资源临时从不同的 URI 响应请求。

400 Bad Request：表示请求中存在语法错误。

401 Unauthorized：表示请求未经授权。

403 Forbidden：表示禁止访问。

404 Not Found：表示请求的资源不存在。

500 Internal Server Error：表示系统内部错误。

501 Not Implemented：服务器不支持当前请求所需要的某个功能。

502 Bad Gateway：网关错误，表示服务器作为网关或代理服务器，从上游服务器接收到了无效的响应。

503 Service Unavailable：服务不可用，表示服务器暂时处于超负载或正在停机维护状态。

504 Gateway Timeout：网关超时，表示服务器作为网关或代理服务器，在尝试从上游服务器接收请求时超时。

#### 不常见状态码

以下是一些不常见的状态码：

102 Processing：服务器正在处理请求，需要更长的时间。

103 Checkpoint：服务器已接收部分请求并在继续处理它。

205 Reset Content：服务器已处理请求，但不会返回任何内容。

226 IM Used：服务器已经执行了某些请求，并已产生一些内容，但是客户端已经发出了一个期望其完成的请求。

308 Permanent Redirect：服务器返回该代码，表示请求的资源已永久删除，且将永远不可用。

这些状态码在日常开发和使用中并不常用，但了解其含义还是有必要的。

![](https://3.z.wiki/autoupload/20230212/gqfx.736X641-状态码.png)


### 常用头字段

HTTP 协议中常用的请求/响应头字段包括：

Accept: 表示客户端能够处理的内容类型，比如 "Accept: text/plain" 表示客户端只接受纯文本格式的内容。

Content-Type: 表示请求体的内容类型，比如 "Content-Type: application/json" 表示请求体是 JSON 格式的数据。

User-Agent: 表示客户端软件的信息，比如 "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36" 表示客户端是使用 Google Chrome 浏览器。

Accept-Encoding: 表示客户端能够接受的内容编码格式，比如 "Accept-Encoding: gzip" 表示客户端接受 GZIP 压缩格式的内容。

Authorization: 表示客户端的认证信息，比如 "Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=" 表示客户端使用基本认证方式，并传递了用户名和密码的信息。

Cache-Control: 表示客户端缓存策略，比如 "Cache-Control: no-cache" 表示客户端不使用缓存。

![](https://2.z.wiki/autoupload/20230212/eB8s.262X728-image.png)

### 安全性

HTTP协议本身是一种明文协议，因此有很多安全性问题需要考虑。

加密：为了防止数据在传输过程中被窃取，通常使用 SSL/TLS 协议加密 HTTP 通信。加密后的通信称为 HTTPS。

认证：为了防止未经授权的用户访问敏感信息，通常使用用户名密码或数字证书等方式进行认证。

除此之外，还有其他安全问题，如：XSS、CSRF、SSRF等，需要采取相应措施保护。

![](https://2.z.wiki/autoupload/20230212/DpLC.878X1228-web安全.png)

### 总结

通过这篇文章对 HTTP 协议做了一个简单的整理：
从它的历史和发展到请求/响应模型，以及报文格式、请求方法、常用的请求/响应头字段、状态码以及安全性问题等。
我们也看到了 HTTP 协议在 Web 世界中的重要性，因为它是整个 Web 技术堆栈的基础。

