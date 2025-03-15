---
meta:
  - name: description
    content: find命令与exec结合使用教程，介绍如何查找文件并执行其他命令的高效方法
  - name: keywords
    content: find,exec,xargs,查找文件,执行命令,Linux,Shell
tags: ["find", "exec", "xargs", "shell", "linux"]
---

# find 并执行其他命令


先通过`find`查找文件并对文件执行特定命令

通过`-exec`选项实现

```shell
find . -type f -exec ls -l {} \;
```

通过`xargs`实现
```shell
find . -maxdepth 1 -name "*.log" | xargs -i  du -hs {}
```

### 应用实战一

查找所有项目并自动拉取`master`分支上的最新代码

```shell
find . -type d -depth 1 -exec git --git-dir={}/.git --work-tree=$PWD/{} pull origin master \;
```

### 应用实战二

查找特定的文件并清空内容

```shell
find . -type f -name "user*" -exec bash -c 'echo 0x0 > {}' \;
```

找到所有`user`开头的文件，并对每个文件执行脚本`echo 0x0 > {}`清空文件内容，
当脚本执行的时候`{}`会被动态替换成当前文件名，
最后结尾的`\;`表示该分号是执行子命令的内容，不是`find`需要处理的分号。
