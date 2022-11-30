---
meta:
  - name: description
    content: centos 8 更新软件源
  - name: keywords
    content: centos 8 更新软件源
---
# CentOS 8 寿终正寝

> 背景：随着2022年的到来，`CentOS 8`的寿命也终止了，`CentOS 8`将无法获取更新功能，更为致命的是，原来的镜像源也已移除。
这意味着无法通过`yum`进行软件安装、软件更新等操作了。第三方源也无法同步`CentOS 8`的源。

本想安装`JDK`，发现如下报错。

![](https://0.z.wiki/images/20220320/f14250eb61f54149a400a8367ee3291e.png)

看来`CentOS 8`的寿终正寝还真影响到我了。😓

![寿终正寝](https://1.z.wiki/images/20220520/0225197518a5476a8cfb884ab3fc08c3.png)

正好顺便换成国内镜像，下载资源还能快点。

### 国内镜像

[网易源](http://mirrors.163.com/centos-vault)
[阿里云源](https://mirrors.aliyun.com/centos-vault)
[华为云源](https://repo.huaweicloud.com/centos-vault)
[腾讯源](https://mirrors.cloud.tencent.com/centos-vault/)


### 切换源

备份并切换源

```shell
# 备份原配置
mkdir /etc/yum.repos.d/bak
mv /etc/yum.repos.d/CentOS-Linux-* /etc/yum.repos.d/bak


# 写入新镜像地址
cat <<EOF > /etc/yum.repos.d/centos.repo 
[baseos]
name=CentOS Linux $releasever - BaseOS
baseurl=https://mirrors.tuna.tsinghua.edu.cn/centos-vault/8.5.2111/BaseOS/$basearch/os/?arch=$basearch
gpgcheck=1
enabled=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial

[appstream]
name=CentOS Linux $releasever - AppStream
baseurl=https://mirrors.tuna.tsinghua.edu.cn/centos-vault/8.5.2111/AppStream/$basearch/os/
gpgcheck=1
enabled=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial

[extras]
name=CentOS Linux $releasever - Extras
baseurl=https://mirrors.tuna.tsinghua.edu.cn/centos-vault/8.5.2111/extras/$basearch/os/
gpgcheck=1
enabled=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial
EOF
```

更新软件


![centos 更新软件](https://2.z.wiki/images/20220320/3755fa2ff4374cbda253fb2dc29c43be.png)
