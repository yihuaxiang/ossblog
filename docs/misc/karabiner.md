# 神器的 karabiner

### 背景

我最喜欢 IDEA 的一个原因就是`Command+E`可以切换最近的问题

同样的特性一直想在`Google chrome`中拥有

作为实践，曾开发过一个[标签选择器](https://chrome.google.com/webstore/detail/%E6%A0%87%E7%AD%BE%E9%80%89%E6%8B%A9%E5%99%A8/klhihaelmoenimgekhdaenjgloipcacf) ，效果还是不错的，通过`Command+E`就能切换任意标签，还支持拼音搜索👏👏

自卖自夸一下😂

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220124/2d22e40dd1f94fcabc623a7a17b79274.png?x-oss-process=image/resize,w_800/quality,q_80)


最近发现`Google chrome`支持了原生的"标签选择"功能

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220124/9ee6318c08fe407d9dd9a35e9e7e1da8.png?x-oss-process=image/resize,w_800/quality,q_80)


针不戳、针不戳

不过美中不足的是
1. 不支持拼音搜索
2. 快捷键好别扭，`Command+Shift+A`，一个手按下去太别扭，两个手按下去有感觉成本太高



第一个方案不好解决，😞

那就解决第二个问题吧

### 思路

`MacOS` 系统中修改快捷键有两种方式

1. 系统设置 - 键盘
通过添加各种"App 快捷键"来设定

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220124/555859898b0947e4a8bfee99984a2945.png?x-oss-process=image/resize,w_800/quality,q_80)

如图：我为`keynote`的多种图形设置了快捷键，然而这种方案有一个硬性要求：要求改功能在软件菜单栏中有对应的按钮

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220124/7aeb4d916298435b96e5ebd4baf47280.png?x-oss-process=image/resize,w_800/quality,q_80)


犯难了，找了半天，没找到`Google chrome`中和"标签选择"相关的按钮

放弃该方案

2. karabiner (第三方修改键盘映射的软件)

karabiner 简介： 

> Karabiner for mac是一款帮助用户修改键盘镜像映射的工具，Karabiner for mac这款软件可以重新映射的键没有任何的任何限制，是用户使用起来操作更加的方便便捷。这款软件可以修改Mac系统上的一切输入法设置，可以改成自己顺手的快捷键。

上手开干~

karabiner 中我常用的功能分三种，如下

#### 简单映射（Simple modifications）

将键盘上的某个键位映射为任意指定的其他键位

如下图：一般我习惯使用左侧的`Command`键，右侧基本用不到，所以干脆映射成了`Option`键，通过`Option+数字`来切换程序坞中的应用

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220124/8d1c7916e08540798798422447f825f6.png?x-oss-process=image/resize,w_800/quality,q_80)



#### 功能键映射（Function keys）

将键盘上的功能键（Fn）映射为任意指定的其他键位

如下图：将 F1、F2、F3 等功能键映射为各种功能

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220124/cdf8070f0a4041d492370a1e76a42f1f.png?x-oss-process=image/resize,w_800/quality,q_80)

#### 复杂映射（Complex modifications）

其他复杂情况需要使用该功能

例如：笔记本上的上下左右键位置太偏远，不易使用，于是我将`Ctrol+hjkl`分别映射成了上下左右等按键（类 vim 风格），这种需求比较插件，添加改映射规则的话直接从网上找到对应脚本安装即可

点击下图红框即可打开配置市场，搜索合适的脚本

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220124/d1e3a96ef3214a5ebf4ffbc99fafa165.png?x-oss-process=image/resize,w_800/quality,q_80)

[Karabiner-Elements complex_modifications rules](https://ke-complex-modifications.pqrs.org/)

然而，具体到我的这个需求，就比较小众化了，得自定义规则

##### 自定义规则

进入 [Karabiner-Elements complex_modifications rules](https://ke-complex-modifications.pqrs.org/) 后如果找不到合适的规则配置，那就得自定义规则了。

任意选一个规则，点击"Edit JSON"，打开配置的网站

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220124/260e7e8f4df14819acc94dc6e607b65a.png?x-oss-process=image/resize,w_800/quality,q_80)

也可以点此直接进入：[Karabiner Complex Modification](https://genesy.github.io/karabiner-complex-rules-generator/#eyJ0aXRsZSI6IiIsInJ1bGVzIjpbXX0=)

界面全英文的，但是还是比较易懂的

##### 开始配置规则

首先明确我的目的
1. 如果当前应用为`Google chrome`
2. 当按下`Command+E`的时候
3. 触发`Command+Shift+A`，打开"标签选择"功能

配置如下：

1. 触发条件

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220124/c62af2f1745b4715bd1c870e41df3a90.png?x-oss-process=image/resize,w_800/quality,q_80)

2. 模拟触发目标

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220124/8cd27fa984bc4b959a4dfd7e310d337d.png?x-oss-process=image/resize,w_800/quality,q_80)

3. 条件，仅限谷歌浏览器，避免对其他软件造成干扰

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220124/32b80281c85143e997618cf555e5f223.png?x-oss-process=image/resize,w_800/quality,q_80)

上图中`com.google.Chrome`为谷歌浏览器的标识，那如何知道谷歌浏览器的标识的呢？

下载`Karabiner-EventViewer`，该程序会显示激活程序的标识，也可以用来调试、排查问题

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220124/41db4dcde8b24416b4db916ec0b1a4dd.png?x-oss-process=image/resize,w_800/quality,q_80)



最终结果[Command+E  标签选择](https://genesy.github.io/karabiner-complex-rules-generator/#eyJ0aXRsZSI6IltjaHJvbWVdIC0gMiIsInJ1bGVzIjpbeyJkZXNjcmlwdGlvbiI6ImNoYW5nZSBDb21tYW5kK0UgdG8gQ29tbWFuZCtTaGlmdCtBIiwibWFuaXB1bGF0b3JzIjpbeyJ0eXBlIjoiYmFzaWMiLCJmcm9tIjp7Im1vZGlmaWVycyI6eyJtYW5kYXRvcnkiOlsibGVmdF9ndWkiXX0sImtleV9jb2RlIjoiZSJ9LCJjb25kaXRpb25zIjpbeyJ0eXBlIjoiZnJvbnRtb3N0X2FwcGxpY2F0aW9uX2lmIiwiYnVuZGxlX2lkZW50aWZpZXJzIjpbImNvbS5nb29nbGUuQ2hyb21lIl19XSwidG8iOlt7InJlcGVhdCI6dHJ1ZSwia2V5X2NvZGUiOiJhIiwibW9kaWZpZXJzIjpbImxlZnRfZ3VpIiwibGVmdF9zaGlmdCJdfV19XX1dfQ==)

### 链接

1. [karabiner](https://karabiner-elements.pqrs.org/)
2. [Command+E rule](https://genesy.github.io/karabiner-complex-rules-generator/#eyJ0aXRsZSI6IltjaHJvbWVdIC0gMiIsInJ1bGVzIjpbeyJkZXNjcmlwdGlvbiI6ImNoYW5nZSBDb21tYW5kK0UgdG8gQ29tbWFuZCtTaGlmdCtBIiwibWFuaXB1bGF0b3JzIjpbeyJ0eXBlIjoiYmFzaWMiLCJmcm9tIjp7Im1vZGlmaWVycyI6eyJtYW5kYXRvcnkiOlsibGVmdF9ndWkiXX0sImtleV9jb2RlIjoiZSJ9LCJjb25kaXRpb25zIjpbeyJ0eXBlIjoiZnJvbnRtb3N0X2FwcGxpY2F0aW9uX2lmIiwiYnVuZGxlX2lkZW50aWZpZXJzIjpbImNvbS5nb29nbGUuQ2hyb21lIl19XSwidG8iOlt7InJlcGVhdCI6dHJ1ZSwia2V5X2NvZGUiOiJhIiwibW9kaWZpZXJzIjpbImxlZnRfZ3VpIiwibGVmdF9zaGlmdCJdfV19XX1dfQ==)
