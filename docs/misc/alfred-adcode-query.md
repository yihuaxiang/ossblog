# alfred adcode 查询插件

[https://github.com/yihuaxiang/alfred-adcode-query](https://github.com/yihuaxiang/alfred-adcode-query)

![](https://z.wiki/autoupload/2022-05-24/54786b494ce54ea39269ae3860169218.image.png)

`adcode`是用于标识某个城市的六位数字编码，如：`110000`表示北京，`130100`标识石家庄，
`adcode`由国家统一指定，该插件提供了城市级、省级`adcode`查询功能。

### adcode 的规律

![adcode 规律](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220525/47c8f20b84a742a4b0c6b1ed7786d5b6.png?x-oss-process=image/resize,w_800/quality,q_80)

`adcode`是有特定规律的

`adcode`由六位数字组成，其中第一位表示大区，前两位表示特定省份（直辖市算作省份），中间两位表示城市，后两位表示区县。

举例说明：

1. 130100 石家庄

第一位`1`表示华北区，华北包括北京、天津、河北、内蒙古、山西

> 其他大区
> 
> 1. 华北
> 2. 东北
> 3. 华东
> 4. 华南
> 5. 西南
> 6. 西北
> 7. 台湾
> 8. 港澳

前两位`13`表示河北省，河北所有的`adcode`开头都是`13`

>`11` 北京、 `12` 天津、`13` 河北、 `14` 山西、 `15` 内蒙，果然，顺序可不是随便排的

中间两位`01`表示石家庄，城市序号往往和城市排名一致，省会排第一位

最后两位`00`表示非区县，既：石家庄市

2. 130101 石家庄市市辖区

结合第一个例子，唯一的区别是最后两位是`01`表示石家庄市内的第一个区县，既：市辖区

3. 130102 石家庄市长安区
