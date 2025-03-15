---
meta:
  - name: description
    content: shell 中进行字符串比较的方法，包括字符串相等判断、子串判断以及其他常用判断方法
  - name: keywords
    content: shell,字符串比较,字符串相等,子串判断,bash,条件判断
tags: ["shell", "bash", "字符串比较", "条件判断"]
---

# shell 中进行字符串比较




判断字符串是否相等

```shell
#!/bin/bash

VAR1="one"
VAR2="two"

if [ "$VAR1" = "$VAR2" ]; then
    echo "Strings are equal."
else
    echo "Strings are not equal."
fi
```


字符串子串判断

```shell
#!/bin/bash

VAR='GNU/Linux is an operating system'
if [[ $VAR == *"Linux"* ]]; then
  echo "It's there."
fi
```

其他判断方法

```
var1 = var2     // 判断 var1 和 var2 相等
var1 != var2    // 判断 var1 和 var2 不相等
var1 < var2     // 判断 var1 比 var2 小
var1 > var2     // 判断 var1 比 var2 大
-n var1         // 判断 var1 长度不为 0
-z var1         // 判断 var1 长度为 0
-d file         // 判断 file 为目录
-e file         // 判断 file 存在
-w file         // 判断 file 存在并可写入
-r file         // 判断 file 存在并可读
-s file         // 判断 file 存在并不为空
-f file         // file 存在并且为文件
-O file         // file 存在并且 owner 为当前用户
-G file         // file 存在并且 owner 和当前用户同为一个 group
-x file         // file 存在并且具有可执行权限
fA -nt fB       // 判断 文件A 比 文件B 新
fA -ot fB       // 判断 文件A 比 文件B 旧
```
