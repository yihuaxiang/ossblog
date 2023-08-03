---
meta:
  - name: description
    content: docker 技术 详解
  - name: keywords
    content: docker 技术 详解
---

# docker 技术

前文[docker](https://z.wiki/tech/docker.html#docker)中简单介绍过`docker`的用法，这里来深入了解讲述下`docker`的技术内幕


<ImgView width="200px" title="docker" url="https://z.wiki/autoupload/20230501/VkEH.2160X3840-image.png" />

### 容器生态系统

一谈到容器，大家往往有一个错误理解，`docker`就是容器、容器就是`docker`。
然而非也非也，`docker`确实几乎已经成了容器的代名词了，不过`docker`其实只是容器的一种（当然了，最重要的那一种）。
是`docker`将容器技术发扬光大的。

容器生态系统大致来看的话有三部分：


容器核心技术、容器平台技术、容器支持技术。

<ImgView title="docker" url="https://5.z.wiki/autoupload/20230803/8EJ6.664X1334-image.png" />


### 容器核心技术

容器核心技术指的是让`Container`在宿主机上运行所必须得技术，主要包括如下技术：

1. 容器规范
2. 容器运行时（`runtime`）
3. 容器管理工具
4. 容器定义工具
5. 容器`Registry`
6. 容器 `OS`

#### 容器规范

前面说了，容器≠`docker`，还有很多其他容器，比如：`CoreOS`的`rkt`，为了统一容器标准、
保证容器的健康可持续发展，由`Docker`、`CoreOS`、`Google`等诸多公司成立了`OCI`组织，
其目的是指定开放的容器规范。


> `OCI` 全称 `Open Container Initiative`
>
> `OCI` 官网：[OCI](https://opencontainers.org/)

目前`OCI`已经发布了两个规范：`runtime spec`与`image format spec`，基于这两个规范，不同容器开发商
开发的容器能够在不同的`runtime`上进行运行与部署，保证了容器的可移植性、兼容性。




#### 容器运行时（`runtime`）

`runtime`是`Container`运行所需要的全部资源，`runtime`就是`Container`运行的环境。

举个栗子：

<ImgView title="docker" url="https://6.z.wiki/autoupload/20230803/xBo8.188X185-image.png" />


如果把`java`程序开做`Container`的话，`JVM`就是该`java`程序的`runtime`。

目前主要的容器`runtime`有：`lxc`、`runc`、`rkt`三种。

> `lxc`是老牌的容器`runtime`，`runc`是`docker`自行研发的符合`OCI`规范的容器`runtime`,
> `rkt`是`CoreOS`开发的`runtime`。



#### 容器管理工具


#### 容器定义工具


#### 容器`Registry`


#### 容器 `OS`




### 容器平台技术








### 容器支持技术


