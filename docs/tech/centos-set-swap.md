# centos设置缓存区

### 起源

今天，我突发奇想，给服务器装了`gnome`桌面，通过`vnc`链接上去。

安装`idea`也能顺利打开，
事情讲到这儿，形式似乎一篇大好，似乎如同灰姑娘和王子过上了幸福的生活，但现实不是通话

当我一旦用`idea`得开某个项目的时候整个系统会进去假死状态😳

![gnome](https://2.z.wiki/autoupload/20221129/pQy8.1792X2176-image.png)

![idea](https://0.z.wiki/autoupload/20221129/duWx.1792X2176-image.png)

一旦进去假死状态，整个服务器便无任何反应（`ssh`无法登陆、`telnet`无法连接、`uptime`监控报`502`）

![系统假死](https://7.z.wiki/autoupload/20221129/fHkd.1060X1898-image.png)

![监控 502](https://1.z.wiki/autoupload/20221129/TeGc.1326X1338-image.png)

由于腾讯云无法收集到假死期间的任何日志、监控，想借助监控来排查的方案看来是走不通了😌

### 排查

排查思路有两个方向：

1. `CPU`资源不足
2. 内存不足

机器配置是`4C4G`，配置也还行，这配置原价购买的话一年得一千多，作为个人博客使用绰绰有余。

通过`brew`安装`htop`看看系统运行情况：

```shell
brew install htop
```

![htop 查看监控](https://0.z.wiki/autoupload/20221129/vu7o.1990X2484-image.png)

赫然发现，`swap` 0️⃣😲，`4G`内存本身并不少，但是运行`idea`这样重量级的软件还是有点捉襟见肘，同时没有设置任何交换区
导致运行既卡死。

### 设置交换区

系统在物理内存不够时可以通过设置交换区将内存中部分资源放置到交换区中，从而突破物理上的内存限制。

交互区对`linux`系统的性能至关重要。

#### 查看交换区设置

首先确定下，设置交换区必须是`root`账号或有`sudo`权限的账号。

```shell
sudo swapon --show
```

通过`swapon`可以查看已设置的交换区

![查看交换区](https://0.z.wiki/autoupload/20221129/Gmv4.630X1280-image.png)


如上图，我已经给服务器设置了三块交互区，共计`6.5G`空间

#### 创建`swap`文件

```shell
sudo dd if=/dev/zero of=/swapfile bs=1024 count=1024k
```

通过`dd`命令创建一个大小`1G`的交换区文件

#### 设置权限

```shell
sudo chmod 600 /swapfile
```

通过修改权限，使得该文件仅`root`账号可读写

#### 激活交换区

```shell
sudo swapon /swapfile
```

此时，交换区文件已激活，程序可用的内存已经不再受限于物理内存

通过`swapon`可以查看当前已设置的交换区

```shell
sudo swapon --show
```

#### 持久化交换区

以上交换区已设置好，但一旦系统重启交换区配置会丢失，为此可以通过一下命令持久化交换区配置。

```shell
sudo echo "/swapfile swap swap defaults 0 0" >> /etc/fstab
```

支持，交换区已设置好

至此，使用`idea`打开任何项目都没问题啦~

![运行 idea](https://2.z.wiki/autoupload/20221129/hlwX.1792X2176-image.png)

同时，由于交换区的存在，系统平均内存使用量也有大幅度的下降。

![内存监控 大幅下降](https://7.z.wiki/autoupload/20221129/vlDo.1076X2134-image.png)

### 交换区大小

那具体到每个人，交换区应该设置多大比较合适呢？

交换区大小没有绝对正确的设置，
不过根据[红帽](https://www.redhat.com/en/blog/do-we-really-need-swap-modern-systems)建议：系统内存的`20%`大小。
[centos](https://www.centos.org/docs/5/html/Deployment_Guide-en-US/ch-swapspace.html)则建议：内存小于`2G`则交换区设置为内存的两倍，
内存大于`2G`则交换区为内存+`2G`

### 其他

删除交换区

```shell
sudo swapoff -v /swapfile
sudo rm /swapfile
```

