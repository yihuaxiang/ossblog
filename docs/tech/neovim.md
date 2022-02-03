# neovim 配置体验

### 背景

使用`vim`（`neovim`）也有三四年了，在此记录下常用的一些插件

顺便将相关配置同步到 `github `上，方便后续换电脑的时候进行配置同步

### neovim 简介

截止目前（2022-02-03），`neovim `在 `github `上已经有了 50K 的 `star `，而 `vim `具有 26K`star` 

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220203/933d2b5126eb4e888ffbd54a4b937797.png?x-oss-process=image/resize,w_800/quality,q_80)

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220203/6c435b23da3747e19681934ebdbe562e.png?x-oss-process=image/resize,w_800/quality,q_80)

`Neovim `是 `Vim `的一个雄心勃勃的重构。主要目标是：

1. 重构代码以改善维护
2. 实施新的高级功能
3. 展示一个更好、更强大的插件系统
4. 开放的开发模式，随时接受贡献，接受的标准也很明确。

具有以下特性

1. 现代图形用户界面
2. 从任何语言访问`API`，包括C/C++, C#,` Clojure`,`D`,` Elixir`,` Go`,` Haskell`,` Java`,` JavaScript`/`Node.js`,` Julia`,` Lisp`,`Lua`,`Perl`,` Python`,` Racket`,` Ruby`,`Rust` 
3. 嵌入式、可编写脚本的终端仿真器
4. 异步作业控制
5. 多个编辑器实例之间的共享数据（`shada`）。
6. 支持`XDG`基础目录
7. 与大多数`Vim`插件兼容，包括`Ruby`和`Python`插件

[neovim 官网](https://neovim.io/)

### 安装


`neovim` 支持多种安装方式，如：直接下载、包管理器安装、源码安装等诸多方式

本人所用系统为`CentOS 8`，选择通过`yum`安装

安装命令如下

```shell
yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
yum install -y neovim python3-neovim
```

![iShot2022-02-03 17.39.49.gif](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220203/50a8b21c9aed4349af93e5a52a8cb6b2.gif?x-oss-process=image/resize,w_800/quality,q_80)

