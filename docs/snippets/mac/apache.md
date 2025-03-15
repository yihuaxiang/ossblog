---
meta:
  - name: description
    content: macOS 内置 Apache 服务器的使用指南，包括启动、关闭和配置路径
  - name: keywords
    content: macOS,Apache,服务器,启动,关闭,配置
tags: ["macOS", "Apache", "服务器"]
---

# 内置 Apache


### 启动内置 Apache 服务

```shell
sudo apachectl start
```

### 关闭内置 Apache 服务

```shell
sudo apachectl stop
```

### 其他

1. 站点跟目录 `/Library/WebServer/Documents/`
2. 配置路径 `/etc/apache2/httpd.conf`
