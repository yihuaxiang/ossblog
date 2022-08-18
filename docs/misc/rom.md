---
meta:
  - name: description
    content: ROM是什么与ROM发展历史介绍
  - name: keywords
    content: ROM,手机存储,存储器
tags: ["ROM", "RAM", "闪存", "存储", "手机"]
---


# 匪夷所思的 ROM

### 故事背景

今天我来逛手机，准备让手上的老同志下岗了

![](https://1.z.wiki/autoupload/2022-07-29/3c93654c54f34d16a71690420889925c.image.png)

逛手机必看配置参数，无意中瞄到了`ROM`

![](https://2.z.wiki/autoupload/2022-07-29/61e91aface624488a04d634a7e841515.image.png)

这是一个曾经让我困惑好久的名词。

![](https://3.z.wiki/autoupload/2022-07-29/04ed6113de894f899cd42f1ea7fa07ea.Thinking_Outline.svg)


### ROM 是什么

![](https://4.z.wiki/autoupload/2022-07-29/8795ecefd3ba4220811a280648acb525.image.png)

`ROM`的全称是：`Read Only Memory`，既：只读存储，其特点是一旦在其体内存储了资料就无法再被改写或删除，但其存储过的内容也不会因为电源关闭而丢失。

与之对应的是`RAM`，`RAM`的全称是：`Random Access Memory，既：随机储存器，它可以随时读写，而且速度很快，通常作为操作系统或其他正在运行中的程序的临时资料存储介质。

结合手机，`ROM`就是手机的存储内存，`RAM`就是手机的运行内存。


### 我的困惑


`ROM`表示只读存储，难道说我的手机是“只读存储”？？只能读不能写？？

![](https://0.z.wiki/autoupload/2022-07-29/4bb2611934554989a6da55533736ec0b.image.png)




### ROM 历史

要解释这个问题还得从`ROM`的发展历史说起

![](https://1.z.wiki/autoupload/2022-07-29/bdfc4fc680ad4db68939be0ac98edeec.image.png)

#### 最古老的`ROM`：掩码`ROM`（`mask ROM`）

`Mask ROM` 由字线（地址输入）和位线（数据输出）网格组成，通过晶体管开关选择性地连接在一起，并且可以表示具有规则物理布局和可预测传播延迟的任意查找表。

在掩模 `ROM` 中，数据在电路中进行物理编码，因此只能在制造过程中进行编程。这导致了许多严重的缺点：

1. 成本高，需要批量定制、购买才能降低成本。
2. 周期长，只能在制作过程中进行编程。


#### 可编程只读存储器（`PROM`）


`PROM` 于 `1956` 年发明，使用方能够通过高压脉冲修改内部结构，从而可以对内容进行修改，尽管能修改，但也只能修改一次。

#### 可擦除可编程只读存储器（`EPROM`）


英特尔在`1971`年发明了可擦除可编程只读存储器(`EPROM`)。 `EPROM`可以通过强紫外线反复恢复到未编程状态下，至此，我们终于有了可反复修改的`ROM`。


#### 电可擦除可编程只读存储器（`EEPROM`）


历史车轮永不停止，终于，`EEPROM`于 `1972` 被发明，现在手机中用的存储内存（闪存）在分类上均属于`EEPROM`，闪存又可细分为`NOR`与`NAND`两种类型，详细介绍的话又得新开一篇。



### 真相大白

![](https://2.z.wiki/autoupload/2022-07-29/1299d788039b4a198823936250b3fd3d.image.png)

手机中的存储内存其实是`ROM`的一个分支，这个分支具备反复写入的能力，已经不仅仅是“只读存储”了，但是依然属于`ROM`的一种。


<ImgPlayer :imgs="[
'https://3.z.wiki/autoupload/2022-07-29/a8df299e18a24f658898ba4b9c819379.image.png',
'https://4.z.wiki/autoupload/2022-07-29/da24b02dd9ae4cb3af980e744691c8a7.image.png',
'https://0.z.wiki/autoupload/2022-07-29/a7dce58ddd78419e96769b152eeee8a1.image.png',
'https://1.z.wiki/autoupload/2022-07-29/d559362e45b844c0bcd915e275b99a7b.image.png',
'https://2.z.wiki/autoupload/2022-07-29/1434f68465c84f928f81440e918a4b83.image.png',
]" />

<TheEnd />
