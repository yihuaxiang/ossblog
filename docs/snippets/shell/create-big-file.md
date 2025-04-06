---
meta:
  - name: description
    content: 在 Linux 系统中创建大文件的方法，包括使用 dd 和 fallocate 命令的详细说明和示例
  - name: keywords
    content: Linux,大文件,dd,fallocate,创建文件,shell,命令行
tags: ["Linux", "Shell", "文件操作", "dd", "fallocate"]
---

# 创建大文件



### 使用`dd`创建大文件

```shell
dd if=/dev/zero of=./test.file bs=1024 count=1M
```

`dd`会不停从`/dev/zero`中读取数据并写入`./test.file`中，在创建大文件时会消耗一定时间。

### 使用`fallocate`创建大文件

```shell
fallocate -l 10G gentoo_root.img
```


`fallocate`是创建大文件的最优选择，磁盘会直接给该文件分配指定的空间，
由于不会写入内容所以创建速度极快。

