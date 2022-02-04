# ripgrep 是个好东西

[项目地址](https://github.com/BurntSushi/ripgrep)


### 背景

工作中最害怕的事情之一就是：上游服务变更，作为下游，可能多个服务都要调整，每当如此都要通过IDE打开每个每个项目，根据关键词查找代码，看看项目中是否有使用到上游服务。
也许是习惯了，又或许是麻木了，我看周边每个同时都如此做着重复的事情。

不想这样，我大抵是厌倦了，横竖不想这么麻烦，打开谷歌搜了下"shell 文本查找"，歪歪扭扭的每页都写满了`grep`

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220204/86d986c9244442048c80c9bc46395f65.png?x-oss-process=image/resize,w_800/quality,q_80)



### 解决方案

`grep` 是 `Linux`系统内置的一款强大的文本搜索工具，支持使用正则表达式递归对目录中的文件内容进行匹配。

用法如下：
```shell
grep -F -r "KEY_WORD" --exclude-dir=node_modules *  -B 3 -A 3
```

含义讲解：

> `-F`：需要匹配字符串为固定字符串（非正则表达式）
> 
> `-r`：进行递归匹配
> 
> `--exclude-dir=node_modules`: 进行文件匹配的时候排查`node_modules`目录
> 
> `*`： 对任意文件名进行内容匹配
> 
>  `-B 3 -A 3':对匹配到的内容，打印前3行+后3行

相比，逐个项目查找，利用`grep`已经极大提升了效率

我作为一个程序员，找到`grep`这个命令来进行内容匹配，这也是很合理的。

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220204/3f713382c9d44784baea3f0252419ab9.png?x-oss-process=image/resize,w_800/quality,q_80)


### 更好的方案
