---
meta:
  - name: description
    content: 文件大小与下载速度
  - name: keywords
    content: 文件大小,下载速度,性能优化
---
# 文件大小与下载速度

在`web`开发中，有一个重要的性能优化就是压缩文件、减少体积以此来试下加载速度的提升，然而文件大小和加载速度到底是怎样的关系呢？做个小实验研究下吧

![](https://3.z.wiki/autoupload/2022-09-06/469df116be87444c97e80a55539a8c82.image.png)


### 实验背景

![](https://6.z.wiki/autoupload/2022-09-06/ffe86ab53db34af18da4b55ff412d004.image.png)

* 腾讯云服务器：`4C4G`，`8M`上行带宽，既从该服务器上下载资源最快可达到`8M`每秒
* 本地环境：`MacBook Pro` `300M`带宽

### 实验计划

1. 在服务器上动态生成各种大小的资源，从`1K`到`100K`
2. 本地通过公网去下载资源，每个资源下载`100`次并计算平均下载时间
3. 分析结论，看看文件大小和下载速度到底是怎样的关系


### 生成资源

```shell
#!/bin/bash
for n in {1..100}
do
  echo $n
  $(dd if=/dev/zero of=./$n.html bs=1024 count=$n)
done
```

通过`shell`脚本生成`100`个文件，大小分别从`1K`到`100K`。

![](https://0.z.wiki/autoupload/2022-09-06/4a62c3e3b87446d6b42828ecb453ce33.Pasted\ Graphic.png)

查看文件大小如下：

![](https://6.z.wiki/autoupload/2022-09-06/28f75f18d11a4170b20dcc0211d1000b.Pasted\ Graphic\ 1.png)

从图中可以看出所有文件最小占用`4K`，所有文件大小都是4k的整数倍。这是因为一个文件至少要占用一个分配单元的空间，而默认一个分配单元为`4K`。[关于4K的解释](https://www.zhihu.com/question/347758704/answer/836811084);


### 开启`web`服务

通过 [http-server](https://www.npmjs.com/package/http-server) 启动一个简单的`http`服务器，服务器需要修改防火墙配置，允许通过该端口进行访问。

![](https://6.z.wiki/autoupload/2022-09-06/a61fc39739ba4ddda9427ec5e6accb7c.image.png)

### 平均下载耗时

通过`shell`脚本进行资源下载与耗时计算，每个文件访问`100`次并取平均值。

```shell
#!/bin/bash
for n in {1..100}
do
  total=0;
  for i in {1..100}
  do
    content=$(curl -o /dev/null -s -w '%{time_total}'  http://51shazhu.com:8082/$n.html)
    total=`echo "scale=2;( $total + $content )" | bc -l`
  done
  avg=`echo "scale=2;( $total / 100 )" | bc -l`
  echo size is $n, avg time is $avg
  total=0;
done
```


### 执行结果


```
size is 1, avg time is .04
size is 2, avg time is .05
size is 3, avg time is .05
size is 4, avg time is .05
size is 5, avg time is .05
...
...
...
size is 95, avg time is .13
size is 96, avg time is .16
size is 97, avg time is .19
size is 98, avg time is .23
size is 99, avg time is .25
size is 100, avg time is .21
```


以上为脚本输出结果，针对每一个文件访问`100`次并计算平均下载时间。从日志可看出`100K`的文件明显下载速度更慢了。

### 分析

![](https://2.z.wiki/autoupload/2022-09-05/f9e9064e473b445c9f193f7fbdcc69d1.image.png)

让我们通过图表分析下吧~

![](https://6.z.wiki/autoupload/2022-09-06/6c90b271d40c484294d66e2f8cced37f.image.png)

> 文件从`1K`到`13K`的过程中下载时间几乎没有变化
> 
> 文件从`14K`到`27K`的过程中下载时间几乎没有变化
> 
> 文件从`28K`到`41K`的过程中下载时间几乎没有变化
> 
> 文件从`41K`到`59K`的过程中下载时间几乎没有变化
> 
> 再往后数据有些抖动，上下浮动较大
> 
> 好神奇的现象


1. 文件占用空间都是4k的整数倍，所以过小的体积并无助于加快下载速度
2. 文件一定范围内变大并不会导致下载速度变慢，

### 升华

能否用到数学回归？用一个函数来表达这个曲线、趋势关系，🤔🤔，改天试试


