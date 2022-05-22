# 服务违规提醒

### 起源

大半夜的，腾讯给我发来通知，说我的服务器存在对其他服务器的攻击。

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220522/f491a1eeca17497f90f6ce4a0ee6fba8.png?x-oss-process=style/z.wiki)

平时安装软件、使用权限、防火墙都很小心的，怎么会存在中木马呢？

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220522/62c5231d5e204fe1af559f3a43589106.png?x-oss-process=style/z.wiki)

### 自查

通过腾讯的指导文件，去服务器上自查，完全没有问题啊，
有一个进程在不断地往`oss`上上传资源，难道说的是这个？这是攻击行为？？
可这是我的业务需求，而且访问的也是我自己的`oss`。

![ivan-aleksic-hko-iWhYdYE-unsplash.jpg](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220522/5a0d69a1ead64e91b34aa886eebe0dd7.jpg?x-oss-process=style/z.wiki)

### 反馈

问了腾讯的在线客服，一开始完全是重复消息中的内容。

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220522/1d4021c2998f41459995d8fb98d2a463.png?x-oss-process=style/z.wiki)


自我的强势追问下，客服告诉我"在攻击这个ip 47.75.19.144"。

> 画外音：好消息好消息，起码距离真相更近一步了。


🤔🤔🤔，看着像是公网ip，访问看下吧

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220522/c2e4b46f50344907aef462030b23b627.png?x-oss-process=style/z.wiki)

┓( \´∀\` )┏ 好熟悉，这不是阿里云的 `oss`吗？很像，看看响应头信息确认下吧。

```text
Connection: keep-alive
Content-Length: 237
Content-Type: application/xml
Date: Sun, 22 May 2022 06:31:15 GMT
Server: AliyunOSS // 阿里云的 oss 服务
x-oss-request-id: 6289D8B323C0543838018911
x-oss-server-time: 0
```

😌，破案了，我访问个`oss`都会被腾讯误认为有攻击行为。。。


剩下的就让客服去处理吧
![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220522/72cf3b8bbabe41b68dee15c0bf1b042d.png?x-oss-process=style/z.wiki)

### 思考

腾讯这玩意儿，知道非工作日自己的人休息，就不知道我也想休息吗？限我 24 小时解决，否则暂停服务，结果是误判，腾讯打脸了。
![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220522/298c71aa089c4a23a3c965a223958fff.png?x-oss-process=style/z.wiki)


