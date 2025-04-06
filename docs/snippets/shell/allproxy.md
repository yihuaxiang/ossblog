---
meta:
  - name: description
    content: 终端翻墙设置指南，介绍如何在命令行终端中配置代理实现科学上网
  - name: keywords
    content: 终端,翻墙,代理,proxy,socks5,http_proxy,all_proxy,shell
tags: ["终端", "翻墙", "代理", "proxy", "shell"]
---

# 终端翻墙

电脑上打开代理软件后，终端其实并不会自动翻墙，运行如下命令可以实现终端翻墙。


```shell
export all_proxy="socks5://127.0.0.1:1086"

# 或

export http_proxy=http://127.0.0.1:1087
```
