# Server-Send-Event

想从服务端进行数据推送的话有哪些方案呢？

以前我只知道有`WebSocket`

![](https://6.z.wiki/autoupload/20230706/1u0z.580X1302-image.png)

最近在搞`AI`，大模型在生成回复的时候都是实时推送的，今天自己了解了下，原来用的是`Server-Send-Event`方案。

### Server-Send-Event

`Server-Sent-Events`（`SSE`）是一种`HTML5` `API`，用于在服务器和客户端之间实时推送数据流。
它基于`HTTP`协议，通过建立一个持久连接，服务器可以推送消息给客户端，而无需客户端发起请求。
这使得服务器可以实时向客户端发送数据，而不需要客户端轮询服务器。`SSE`可以用于实现实时通知、实时聊天、实时数据更新和实时监控等功能。

#### 技术上：

1. `SSE`是基于`HTTP`长连接实现的，由客户端发起一次请求，服务器端保持连接打开，随时可以向客户端推送数据，直到客户端关闭连接。

2. `SSE`使用的是`text/event-stream` `MIME`类型，服务器端通过这个`MIME`类型告诉客户端它将发送一系列事件流。

3. 服务器可以发送多个事件流，每个事件流都以`event`关键字开始，并以两个连续的换行符结束。事件流可以包含任意数量的字段，每个字段以`data`关键字开始，并以一个换行符结束。

4. 服务器可以发送一个`retry`字段，用来指定在连接断开后重新连接的时间间隔。

5. 客户端通过`EventSource` `API`接收`SSE`，每当客户端接收到一个事件流，就会触发一个`message`事件。在这个事件中可以获取到事件流中的数据。

#### DEMO

[源码](https://github.com/yihuaxiang/koa-sse)

[在线 DEMO](https://playground.z.wiki/sse)



