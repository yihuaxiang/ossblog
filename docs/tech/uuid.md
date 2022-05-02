---
tags: ["UUID", "UUID-v4", "UUID-v1", "UUID-v5"]
---

# UUID版本指南

![](https://z.wiki/autoupload/2022-05-02/6da7a9010ba747ba9fdf0678e55b1643.uuid.drawio.svg)

这篇文章将介绍`UUID`从`V1`到`V5`的差异以及该如何选择正确的版本。

### UUID 是什么

通用唯一识别码（全称：`Universally Unique Identifier`，简称：`UUID`）是用来在系统中唯一标识某条信息的`128`位标识码。

根据标准（[RFC 4122](https://www.ietf.org/rfc/rfc4122.txt)）,`UUID`的生成不依赖外部服务，
且具有唯一性（注：重复概率几乎为零）。

`UUID`有`16`进制的`32`个数字组成，故理论上总量为`16<sup>32</sup>`,即使每纳秒生成一万亿个，也好耗尽壹佰亿年才能强所有`UUID`用完。


### UUID 的结构

![](https://z.wiki/autoupload/2022-05-02/6da7a9010ba747ba9fdf0678e55b1643.uuid.drawio.svg)

`UUID`包含`32`个`16`进制数字，分为`5`段，`5`段长度分别为`8`、`4`、`4`、`4`、`12`，中间使用连字符连接。

例如：`xxxxxxxx-xxxx-Mxxx-xxxx-xxxxxxxxxxxx`

其中`M`表示 `UUID`的版本,从 [uuid生成](https://devtool.tech/uuid) 可以看出，`M`位置的值和版本是一致的。

各段含义如下：

| 名称                                       | 长度 （字节） | 长度（16进制数字码长） | 说明                                    |
|------------------------------------------|---------|--------------|---------------------------------------|
| time\_low                                | 4       | 8            | 整数：低位 32 bits 时间                      |
| time\_mid                                | 2       | 4            | 整数：中间位 16 bits 时间                     |
| time\_hi\_and\_version                   | 2       | 4            | 最高有效位中的 4 bits“版本”，后面是高 12 bits 的时间   |
| clock\_seq\_hi\_and\_res clock\_seq\_low | 2       | 4            | 最高有效位为 1-3 bits“变体”，后跟13-15 bits 时钟序列 |
| node                                     | 6       | 12           | 48 bits 节点 ID                         |



### V1

`UUID-V1` 是通过使用主机 `MAC` 地址和当前日期和时间的组合生成的。除此之外，它还引入了另一个随机组件，以确保其唯一性。
但是如果使用同一台机器、同时时间生成`UUID`，会有很小的几率重复。

![](https://z.wiki/autoupload/2022-05-02/5e3cd31cab884203a2b317f8e92ad146.uuid-v1.drawio.svg)

`UUID-v1`存在的问题是：

1. 存在重复几率
2. 根据`ID`能推算出创建时的相对时间
3. 根据`ID`能推算出创建的机器唯一标识


### V2

`UUID-v2`和`V1`很类似，是根据标识符（通常是组或用户`ID`）、时间和节点`ID`生成，不过区别在于`V2`将`V1`中的部分时间信息换成了主机名，
故应用具有局限性（有隐私风险），未大规模使用。

### V3

`UUID-v3` 通过散列（`MD5`）名字空间（`namespace`）标识符和名称生成。和`V1`、`V2`不同，`V3`不依赖与机器信息和时间信息，
但是`V3`要求输入命名空间+名称，命名空间本身也是一个`UUID`，用来标识应用环境，名称通常是用户账号、用户名之类的内容，通过命名空间+名称+三列算法算出`UUID`。

![](https://z.wiki/autoupload/2022-05-02/e0763e1ca4db43ac90b868a76076e37b.uuid-v3.drawio.svg)

### V4

`UUID-v4` 组成 `UUID v4` 的位是随机生成的，没有固有逻辑（除了第三段首个数字，该数字标识版本号），不包含命名空间、设备信息、时间信息。
故，`UUID-v4`最容易理解、应用也最为广泛。

![](https://z.wiki/autoupload/2022-05-02/fefb73e8621d455aa20930dcbb7c3a4b.uuid-v4.drawio.svg)

`java` 生成 `UUID-V4`
```java
  String uuid = UUID.randomUUID();
```
`js` 生成 `UUID-v4` 参考[https://www.npmjs.com/package/uuidv4](https://www.npmjs.com/package/uuidv4)

### V5

`UUID-v5` 和`V3`类似，区别在于散列算法，使用了`sha1`散列算法。

![](https://z.wiki/autoupload/2022-05-02/eb11afcbca884332aa8196f92a563c72.uuid-v5.drawio.svg)

> 注：相同的命名空间、名称，将映射到同一`UUID`，且推荐使用`V5`而非`V3`

### 如何选择

`V4`是随机`ID`，其他都不是，故：正常情况下直接选择`UUID-V4`就可以了，如果需要根据`ID`给出创建时间、机器信息等内容的话，
选择`V1`比较合适，如果还有特殊情况，需要根据已有信息衍生出新的`ID`，可以使用`V5`。

