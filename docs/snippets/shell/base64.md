---
meta:
  - name: description
    content: base64 编码解码操作指南，介绍如何在服务器和本地之间通过 base64 编码传输文件
  - name: keywords
    content: base64,编码,解码,文件传输,shell
tags: ["base64", "shell", "文件传输", "编码"]
---

# base64 操作


经常需要将服务器上的照片复制到本地，
如果本地直连服务器，可以通过`scp`进行复制，
如果有网络隔离，
可以先将照片转`base64`编码再进行文本复制、还原照片。

```shell
base64 <file-name>
```



