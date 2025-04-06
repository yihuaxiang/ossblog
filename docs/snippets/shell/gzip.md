---
meta:
  - name: description
    content: 查找文件并进行 gzip 压缩，介绍如何使用 find 命令查找 js 和 css 文件并进行 gzip 压缩
  - name: keywords
    content: gzip,find,压缩,js,css,shell,命令行
tags: ["gzip", "find", "shell", "压缩"]
---

# 查找文件并进行 gzip

查找 js css 文件并进行 gzip


```shell
find . \( -name "*\.js" -o -name "*\.css" \) -exec bash -c 'echo Compressing "{}" && gzip -c --best "{}" > "{}.gz"' \;
```

