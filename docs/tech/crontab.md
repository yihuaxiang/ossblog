---
meta:
  - name: description
    content: linux crontab 定时任务 pm2 任务管理 守护进程 任务调度
  - name: keywords
    content: linux crontab 定时任务 pm2 任务管理 守护进程 任务调度
tags: ["crontab", "定时任务", "任务调度"]
---

# crontab

> 原文连接：[snippets crontab](https://snippets.z.wiki/#!./snippets/shell/crontab/)

`centos 8`默认已安装`crontab`，通过`crontab`可以设置周期性调度任务、启动时任务。

`crontab`中的任务分为用户任务，系统级任务。

### 用户任务

查看用户任务
```shell
crontab -l
```

编辑用户任务
```shell
crontab -e
```

清空任务
```shell
crontab -r
```

注：用户任务配置在目录`/var/spool/cron`下


### 系统级任务
系统级任务配置在`/etc/crontab`中，可配置定时任务，也可配置系统启动时需要执行的任务

> 某些任务需要`root`账号启动，可配置在系统级任务中
> 如：`nginx`默认占用`80`、`443`等特殊端口，而`centos`中，`1000`以内的端口需要`root`账号才能使用

```shell
SHELL=/bin/bash
PATH=/sbin:/bin:/usr/sbin:/usr/bin
MAILTO=root

# For details see man 4 crontabs

# Example of job definition:
# .---------------- minute (0 - 59)
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
# |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
# |  |  |  |  |
# *  *  *  *  * user-name  command to be executed

@reboot root /home/path/start.sh # 系统启动时执行的任务
```

### 查看日志

`crontab` 日志目录为 `/var/log/cron`


### 其他类似方案

#### pm2

`pm2`是基于`nodejs`的进程管理工具，可以配合`shell`执行周期性任务，
也可以用来管理开机自启任务（通过保存进程状态，在开机时恢复进程状态，这一点上比`crontab`好用）。

##### 自动部署服务

编写`shell`脚本，从`github`拉去代码、编译构建、部署到`nginx`中
```shell
cd path-of-project
git pull

npm i
npm run build

mv -f dist/* path-of-nginx

sleep 60 # 这里 sleep 一分钟是为了避免 pm2 过于频繁的执行该脚本
```

通过`pm2`持续性的运行该脚本
```shell
pm2 start shell-path -- -option value

# 或不带参数

pm2 start shell-path
```

如果需要开机自动启动该脚本，可以通过`pm2 save`保存进程状态，开机便会自动运行。


> 注：在使用 `pm2 save`之前需要确保`pm2`本身能够开机启动，执行以下命令并根据提示设置自启动`pm2 startup`

##### 监控

1. 终端监控

```shell
pm2 monit
```

通过执行`pm2 monit`可直接在终端打开监控。

<ImgView title="pm2 终端监控" url="https://2.z.wiki/autoupload/2022-07-28/e31fbb29ab28463f8417d03e3c2f0b72.image.png" />

2. 在线地址

```shell
pm2 plus
```

通过执行`pm2 plus`可开启在线监控，但该服务为收费服务，默认提供`14`天体验时间。

<ImgView title="pm2 在线监控" url="https://2.z.wiki/autoupload/2022-07-28/d4b8b27aba294846b94bf2c8af4b9de4.image.png" />


#### chkconfig


参考文档： [chkconfig](https://www.linuxjournal.com/article/4445)

