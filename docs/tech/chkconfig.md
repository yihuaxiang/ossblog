# chkconfig

腾讯云上的服务器总有需要重启的时候，每次重启都会需要手动开启一堆服务和应用，
如`nginx`、聊天室、博客对应的后台`Java`服务、`node`服务等等，
针对这种情况，之前的文章中介绍过如何通过`crontab`、`pm2`去解决
（[crontab](https://z.wiki/tech/crontab.html#%E7%94%A8%E6%88%B7%E4%BB%BB%E5%8A%A1)），
这次介绍下`chkconfig`。

### chkconfig 是什么

`chkconfig`是用来管理系统初始化期间启动服务的程序

通过`man`手册可以更具体的了解`chkconfig`

```text
CHKCONFIG(8)                System Manager's Manual               CHKCONFIG(8)

NAME
       chkconfig  -  updates  and queries runlevel information for system ser‐
       vices

SYNOPSIS
       chkconfig [--list] [--type type] [name]
       chkconfig --add name
       chkconfig --del name
       chkconfig --override name
       chkconfig  [--level  levels]   [--type   type]   [--no-redirect]   name
       <on|off|reset|resetpriorities>
       chkconfig [--level levels] [--type type] [--no-redirect] name

DESCRIPTION
       chkconfig  provides  a  simple  command-line  tool  for maintaining the
       /etc/rc[0-6].d directory hierarchy by relieving  system  administrators
       of  the  task  of  directly manipulating the numerous symbolic links in
       those directories.
```

### 启动基础知识

当`Linux`机器启动时，出现的第一个程序时`init`，再由`init`执行
`/etc/inittab`下的任务。


未完待续...
