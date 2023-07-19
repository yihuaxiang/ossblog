---
meta:
  - name: description
    content: sever-send-event sse http协议 服务端推送
  - name: keywords
    content: sever-send-event sse http协议 服务端推送
tags: ["sse", "sever-side-events", "server-send-events", "http 协议", "服务端推送"]
---

# Server-Send-Event

想从服务端进行数据推送的话有哪些方案呢？

以前我只知道有`WebSocket`

<ImgView title="WebSocket" url="https://z.wiki/autoupload/20230706/1u0z.580X1302-image.png" />

最近在搞`AI`，大模型在生成回复的时候都是实时推送的，今天自己了解了下，原来用的是`Server-Send-Event`方案。

### Server-Send-Event

`Server-Sent-Events`（`SSE`）是一种`HTML5` `API`，用于在服务器和客户端之间实时推送数据流。
它基于`HTTP`协议，通过建立一个持久连接，服务器可以推送消息给客户端，而无需客户端发起请求。
这使得服务器可以实时向客户端发送数据，而不需要客户端轮询服务器。`SSE`可以用于实现实时通知、实时聊天、实时数据更新和实时监控等功能。

#### 技术上：

1. `SSE`是基于`HTTP`长连接实现的，由客户端发起一次请求，服务器端保持连接打开，随时可以向客户端推送数据，直到客户端关闭连接。

2. `SSE`使用的是`text/event-stream` `MIME`类型，服务器端通过这个`MIME`类型告诉客户端它将发送一系列事件流。

3. 服务器可以发送多个事件流，每个事件流以`event`关键字开始（如果没有`event`字段则前端只能通过`onmessage`监听 ），
数据字段以`data`关键字开始，并以一个换行符结束。整个事件流以连续两个换行符结束。

4. 服务器可以发送一个`retry`字段，用来指定在连接断开后重新连接的时间间隔。

```
event: ${eventName}
id: 1
retry: 5000
data: ${dataString}

```

5. 客户端通过`EventSource` `API`接收`SSE`。


#### DEMO

[源码](https://github.com/yihuaxiang/koa-sse)

[在线 DEMO](https://playground.z.wiki/sse)

[SSE 前端](https://z.wiki/jsbin/roqepikolu)

<WebFrame src="https://z.wiki/jsbin/roqepikolu" />


#### PHP 代码

```php
date_default_timezone_set("America/New_York");
header("Cache-Control: no-store");
header("Content-Type: text/event-stream");

$counter = rand(1, 10);
while (true) {
  // Every second, send a "ping" event.
  echo "event: ping\n";
  $curDate = date(DATE_ISO8601);
  echo 'data: {"time": "' . $curDate . '"}';
  echo "\n\n";
  // Send a simple message at random intervals.
  $counter--;
  if (!$counter) {
    echo 'data: This is a message at time ' . $curDate . "\n\n";
    $counter = rand(1, 10);
  }
  ob_end_flush();
  flush();
  // Break the loop if the client aborted the connection (closed the page)
  if (connection_aborted()) break;
  sleep(1);
}
```

### nginx 代理 Server-Send-Events

如果需要使用`nginx`对`Server-Send-Events`进行反向代理的话，需要进行如下额外配置：

```
proxy_http_version 1.1;
proxy_set_header Connection "";
proxy_buffering off;
```


#### 参考

1. [Server-sent events](https://developer.mozilla.org/zh-CN/docs/Web/API/Server-sent_events/Using_server-sent_events)
2. [EventSource](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource)
3. [Server-Sent Events: пример использования](https://habr.com/ru/articles/519982/)
4. [Nginx proxy for SSE](https://serverfault.com/questions/801628/for-server-sent-events-sse-what-nginx-proxy-configuration-is-appropriate)


