# debian 11 国内镜像源

### 使用说明

将`/etc/apt/sources.list`文件中`Debian`默认的软件仓库地址和安全更新仓库地址修改为国内的镜像地址即可，
比如将`deb.debian.org`和`security.debian.org`改为`mirrors.aliyun.com`，并使用`https`访问，可使用如下命令：

```shell
sed -i "s@http://\(deb\|security\).debian.org@https://mirrors.aliyun.com@g" /etc/apt/sources.list
```

### 国内镜像源

#### 阿里云


```
deb https://mirrors.aliyun.com/debian/ bullseye main non-free contrib
deb-src https://mirrors.aliyun.com/debian/ bullseye main non-free contrib
deb https://mirrors.aliyun.com/debian-security/ bullseye-security main
deb-src https://mirrors.aliyun.com/debian-security/ bullseye-security main
deb https://mirrors.aliyun.com/debian/ bullseye-updates main non-free contrib
deb-src https://mirrors.aliyun.com/debian/ bullseye-updates main non-free contrib
deb https://mirrors.aliyun.com/debian/ bullseye-backports main non-free contrib
deb-src https://mirrors.aliyun.com/debian/ bullseye-backports main non-free contrib
```

#### 腾讯云

```
deb https://mirrors.tencent.com/debian/ bullseye main non-free contrib
deb-src https://mirrors.tencent.com/debian/ bullseye main non-free contrib
deb https://mirrors.tencent.com/debian-security/ bullseye-security main
deb-src https://mirrors.tencent.com/debian-security/ bullseye-security main
deb https://mirrors.tencent.com/debian/ bullseye-updates main non-free contrib
deb-src https://mirrors.tencent.com/debian/ bullseye-updates main non-free contrib
deb https://mirrors.tencent.com/debian/ bullseye-backports main non-free contrib
deb-src https://mirrors.tencent.com/debian/ bullseye-backports main non-free contrib
```


#### 清华大学

```
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye main contrib non-free
deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye main contrib non-free
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-updates main contrib non-free
deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-updates main contrib non-free
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-backports main contrib non-free
deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-backports main contrib non-free
deb https://mirrors.tuna.tsinghua.edu.cn/debian-security bullseye-security main contrib non-free
deb-src https://mirrors.tuna.tsinghua.edu.cn/debian-security bullseye-security main contrib non-free
```
