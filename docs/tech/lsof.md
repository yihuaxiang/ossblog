---
meta:
  - name: description
    content: lsof 命令详解，介绍 lsof 的基本用法、查看文件、网络连接、进程、用户和设备文件等功能
  - name: keywords
    content: lsof,linux,文件,网络连接,进程,用户,设备
tags: ["lsof", "linux", "命令行"]
---

# lsof

`lsof` 含义为：`list of open file`

<ImgView title="lsof" url="https://3.z.wiki/autoupload/20230708/BlFy.450X800-image.png" />


`lsof` 是一个列出所有打开文件的工具，可以用来检查打开的文件、网络连接、进程等信息。下面是 `lsof` 常用的功能和用途：

1. 查看文件

`lsof` 可以查看系统中打开的所有文件，包括文本文件、二进制文件、设备文件、目录等。可以使用 `lsof filename` 命令来查看某个文件被哪些进程打开。

2. 查看网络连接

`lsof` 可以查看系统中所有打开的网络连接，包括 TCP、UDP、Unix 域套接字、网络文件系统等。可以使用 `lsof -i` 或 `lsof -i tcp:8080` 或 `lsof -i:8080` 等命令来查看某些指定端口的网络连接。

3. 查看进程

`lsof` 可以查看系统中所有运行的进程信息，包括进程 ID、进程所占用的端口号、进程运行的程序、进程打开的文件等。可以使用 `lsof -p PID` 命令来查看某个指定进程的信息。

4. 查看登录的用户

`lsof` 可以查看登录到系统中的所有用户信息，包括用户 ID、用户所在的组、用户登录的终端等。可以使用 `lsof -u username` 命令来查看某个指定用户的信息。

5. 查看设备文件

`lsof` 可以查看系统中所有打开的设备文件，包括磁盘、光驱、串口、USB 等。可以使用 `lsof /dev/disk1` 命令来查看某个指定设备的信息。

更多脚本可访问[敖武的代码片段](https://snippets.z.wiki/#!./snippets/shell/lsof/)
