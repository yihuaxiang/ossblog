# nginx 注入内容


通过`nginx`进行反向代理的时候可以通过`sub_filter`指令进行内容替换、内容注入

```Nginx
location / {
  ...
  sub_filter </head>
      '<style>.navbar {display: none;} .chatroom {display: none;}</style></head>';
  sub_filter_once on;
  ...
}
```


### 注意事项一：

如果被代理的服务返回的是`gzip`压缩的内容，则上述指令无效，可以通过`proxy_set_header Accept-Encoding "";`确保被代理的服务返回非压缩内容。

### 注意事项二：


`sub_filter` 指令由`http_sub_module`模块提供，`nginx`默认没有安装，可通过`nginx -V`查看已安装的模块。





