# GLM-130B

由于工作需要，部署`GLM-130B`模型，官网：[GLM-130B](https://github.com/THUDM/GLM-130B)


### 申请机器

支持在一台 `A100`（`40G * 8`） 或 `V100`（`32G * 8`）服务器上对千亿规模的参数进行推理


`A100` 机器，`250`元每小时，一个月约：`18W`,
![](https://7.z.wiki/autoupload/20230606/Mo3u.170X1774-image.png)

`V100` 机器，`157`元每小时，一个月大约：`11W`

![](https://0.z.wiki/autoupload/20230606/VMp1.170X1770-image.png)

预算有限，就选`V100`机器吧

`1.5T` 的硬盘（模型大小`260G`，需要分包下载，下载后将模型聚合成一个压缩文件，再进行解压，
所以模型需要 `260 * 3 G`的空间）


### 登录机器

`8`个显卡

![](https://0.z.wiki/autoupload/20230606/xnpS.1674X1314-image.png)

`96`核`CPU`

![](https://6.z.wiki/autoupload/20230606/QJlJ.966X2066-image.png)


### 安装必要依赖

```
yum update -y
yum install dnf -y
dnf groupinstall "Development Tools" -y
dnf install zlib-devel -y
yum install libffi-devel -y
yum install bzip2-devel -y
yum install openssl-devel -y
yum install libX11 -y
yum install libXext -y
yum install sqlite-devel -y
yum install libsqlite3-dev -y
yum install axel -y
yum install epel-release -y
yum install aria2 -y
```

`Python 3.9+` / `PyTorch 1.10+` / `DeepSpeed 0.6+` / `Apex`（需要安装包含 `CUDA` 和 `C++` 扩展的版本，参考资料）

由于`centos 7.9` 默认自带 `python 2.7` `python3.6`所以需要更新`python`版本，这里我选择使用`miniconda`进行环境管理。


[`miniconda` 官网](https://docs.conda.io/en/latest/miniconda.html)




安装流程：
```
wget https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/autoupload/20230606/gI1w.Miniconda3-latest-Linux-x86_64.sh
sh gI1w.Miniconda3-latest-Linux-x86_64.sh
conda -V
```




### 创建 python3.9 运行环境


```
conda create -n py39 python=3.9
```

查看环境
```
conda env list
```

切换环境
```
conda activate py39
```


### 下载GLM-130B源码

```
git clone https://github.com/THUDM/GLM-130B.git
```

安装依赖

```
cd GLM-130B
pip install -r requirements.txt
```

![](https://5.z.wiki/autoupload/20230606/G0XY.1396X2072-image.png)

ps:百兆带宽，下载速度真快！！

如果下载过程慢的话也可以尝试切换到国内其他源
```
# 豆瓣源
pip install -r requirements.txt -i http://pypi.douban.com/simple/ --trusted-host pypi.douban.com

# 阿里云源
pip install -r requirements.txt -i http://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com
```



### 下载模型

申请下载 `GLM-130B` 的模型检查点

![](https://2.z.wiki/autoupload/20230606/9DVX.1320X1846-image.png)


申请后很快便会收到邮件，按邮件里的流程下载即可

注：模型较大，下载比较费时间。


![](https://3.z.wiki/autoupload/20230606/zOg4.1036X2796-image.png)


```
mkdir ~/130b
cd ~/130b
wget https://8.z.wiki/autoupload/20230606/Okx1.urls.txt
aria2c -x 16 -s 16 -j 4 --continue=true -i Okx1.urls.txt
```

下载过程中可以通过`ifstat`来查看网络状况

```
watch -n 1 -c -d ifstat
```

![](https://5.z.wiki/autoupload/20230606/01TY.372X1142-image.png)
