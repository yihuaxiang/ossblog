---
meta:
  - name: description
    content: Linux 后台运行程序指南，详解多种让程序在后台执行的方法及相关命令使用
  - name: keywords
    content: Linux,后台运行,nohup,jobs,fg,bg,shell,命令行
tags: ["Linux", "后台运行", "nohup", "shell", "命令行"]
---

# 后台运行程序


`linux`后台运行程序的方式

### 方式一

`${command} &`

该方式可以让程序后台执行，但同时日志会实时输出到终端。通过`${command} > tmp.log 2>&1 &`可以将日志输出到文件`tmp.log`中。

命令执行后会输出进程`ID`，通过该进程`ID`可以查看或管理进程。

缺点：终端终止的时候运行的程序也会终止。


### 方式二

`nohup ${command} &`

功能同上，但是终端终止的时候程序不会终止。


### 其他相关命令

`jobs`：查看当前在后台运行的程序。
`fg`：将后台运行的程序放到前台。
`bg`：将后台挂起的程序放到后台继续运行，程序依然会占据标准输入流、标准输出流，终端一旦关闭程序也会关闭。
`Ctrl+Z`：将当前运行的程序放到后台执行。
