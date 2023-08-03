---
meta:
  - name: description
    content: docker 技术 详解
  - name: keywords
    content: docker 技术 详解
---

# docker 技术

前文[docker](https://z.wiki/tech/docker.html#docker)中简单介绍过`docker`的用法，这里来深入了解讲述下`docker`的技术内幕


<ImgView width="100" title="docker" url="https://z.wiki/autoupload/20230501/VkEH.2160X3840-image.png" />

#### 容器生态系统

一谈到容器，大家往往有一个错误理解，`docker`就是容器、容器就是`docker`。
然而非也非也，`docker`确实几乎已经成了容器的代名词了，不过`docker`其实只是容器的一种（当然了，最重要的那一种）。
是`docker`将容器技术发扬光大的。

容器生态系统大致来看的话有三部分：


容器核心技术、容器平台技术、容器支持技术。

![image.png](https://5.z.wiki/autoupload/20230803/8EJ6.664X1334-image.png)



#### 容器核心技术

容器核心技术指的是让`Container`在宿主机上运行所必须得技术，主要包括如下技术：

1. 容器规范
2. 容器运行时（`runtime`）
3. 容器管理工具
4. 容器定义工具
5. 容器`Registry`
6. 容器 `OS`




#### 容器平台技术








#### 容器支持技术


