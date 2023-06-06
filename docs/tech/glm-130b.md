# GLM-130B

由于工作需要，尝试进行部署`GLM-130B`模型，官网：[GLM-130B](https://github.com/THUDM/GLM-130B)


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

操作系统：`centos 7.9`


### 安装必要依赖

```shell
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

此外，`GLM-130B`运行需要如下环境：

`Python 3.9+` / `PyTorch 1.10+` / `DeepSpeed 0.6+` / `Apex`（需要安装包含 `CUDA` 和 `C++` 扩展的版本，参考资料）

由于`centos 7.9` 默认自带 `python 2.7` `python3.6`所以需要更新`python`版本，这里我选择使用`miniconda`进行环境管理。


[`miniconda` 官网](https://docs.conda.io/en/latest/miniconda.html)




安装流程：

```shell
wget https://9.z.wiki/autoupload/20230606/gI1w.Miniconda3-latest-Linux-x86_64.sh
sh gI1w.Miniconda3-latest-Linux-x86_64.sh
conda -V
```




### 创建 python3.9 运行环境


```shell
conda create -n py39 python=3.9
```

查看环境

```shell
conda env list
```

切换环境

```shell
conda activate py39
```

### 安装 apex

```shell
cd ~
git clone https://github.com/NVIDIA/apex
cd apex
pip install -v --disable-pip-version-check --no-cache-dir --global-option="--cpp_ext" --global-option="--cuda_ext" ./
```

😅报错了。。。。


```shell
  RuntimeError: Cuda extensions are being compiled with a version of Cuda that does not match the version used to compile Pytorch binaries.  Pytorch binaries were compiled with Cuda 11.7.
  In some cases, a minor-version mismatch will not cause later errors:  https://github.com/NVIDIA/apex/pull/323#discussion_r287021798.  You can try commenting out this check (at your own risk).
  error: subprocess-exited-with-error

  × Running setup.py install for apex did not run successfully.
  │ exit code: 1
  ╰─> See above for output.
```

从提示中可以看出`Pytorch`中要求`Cuda 11.7`，那机器上的`Cuda`是什么版本呢？,执行`nvcc -V`：



```shell
nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2021 NVIDIA Corporation
Built on Wed_Jul_14_19:41:19_PDT_2021
Cuda compilation tools, release 11.4, V11.4.100
Build cuda_11.4.r11.4/compiler.30188945_0
```

果然，二者不匹配了。那就安装`Cuda 11.7`吧，从英伟达官网就能找到安装脚本：

![](https://2.z.wiki/autoupload/20230606/f9jw.2496X2822-image.png)



```shell
wget https://developer.download.nvidia.com/compute/cuda/11.7.0/local_installers/cuda-repo-rhel7-11-7-local-11.7.0_515.43.04-1.x86_64.rpm
rpm -i cuda-repo-rhel7-11-7-local-11.7.0_515.43.04-1.x86_64.rpm
yum clean all
yum -y install nvidia-driver-latest-dkms cuda
yum -y install cuda-drivers
```

到此，`Cuda 11.7`已安装完成，安装路径：`/usr/local/cuda-11.7`,通过设置`CUDA_HOME`这个环境变量后继续安装依赖：



```shell
export CUDA_HOME=/usr/local/cuda-11.7/
pip install -v --disable-pip-version-check --no-cache-dir --global-option="--cpp_ext" --global-option="--cuda_ext" ./
```

😅+1，还得升级`g++`，搞起！！别的本事没有，搞这些还是有点经验的！

```shell
      raise RuntimeError(
  RuntimeError: The current installed version of g++ (4.8.5) is less than the minimum required version by CUDA 11.7 (6.0.0). Please make sure to use an adequate version of g++ (>=6.0.0, <12.0).
  error: subprocess-exited-with-error
```

#### 升级GCC

```shell
yum install centos-release-scl
sudo yum install devtoolset-8-gcc*
scl enable devtoolset-8 bash
gcc -v

# 注意：以上操作只对本次会话有效，重启会话后还是会变回原来的GCC版本
```


参考文档：[简书](https://www.jianshu.com/p/5bbd5219e79d)

![](https://3.z.wiki/autoupload/20230606/HXSS.1578X1978-image.png)

到此，继续安装`apex`未搞定的步骤即可安装成功。

```shell
pip install -v --disable-pip-version-check --no-cache-dir --global-option="--cpp_ext" --global-option="--cuda_ext" ./
```



### 下载GLM-130B源码

```shell
git clone https://github.com/THUDM/GLM-130B.git
```

安装依赖

```shell
cd GLM-130B
pip install -r requirements.txt
```

![](https://5.z.wiki/autoupload/20230606/G0XY.1396X2072-image.png)

ps:百兆带宽，下载速度真快！！

如果下载过程慢的话也可以尝试切换到国内其他源

```shell
# 豆瓣源
pip install -r requirements.txt -i http://pypi.douban.com/simple/ --trusted-host pypi.douban.com

# 阿里云源
pip install -r requirements.txt -i http://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com
```



### 下载模型

申请下载 `GLM-130B` 的模型`checkpoint`，目前需要申请才能下载，[申请地址](https://models.aminer.cn/glm/zh-CN/download/GLM-130B)

![](https://2.z.wiki/autoupload/20230606/9DVX.1320X1846-image.png)


申请后很快便会收到邮件，按邮件里的流程下载即可

注：模型较大，下载比较费时间。


![](https://3.z.wiki/autoupload/20230606/zOg4.1036X2796-image.png)


```shell
mkdir ~/130b
cd ~/130b
wget https://8.z.wiki/autoupload/20230606/Okx1.urls.txt
aria2c -x 16 -s 16 -j 4 --continue=true -i Okx1.urls.txt
```

下载过程中可以通过`ifstat`来查看网络状况

```shell
watch -n 1 -c -d ifstat
```

![](https://5.z.wiki/autoupload/20230606/01TY.372X1142-image.png)
