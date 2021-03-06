---
tags: ["IP 归属地查询", "敖武的游乐园", "IP 查询"]
---
# IP 归属地查询

[web 端传送门](https://playground.fudongdong.com/lbs/showIp)

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220409/b0ee56ce038a47889d283820bdda759f.png?x-oss-process=style/z.wiki)

[alfred 插件](https://github.com/yihuaxiang/alfred-workflow-ipip)

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220410/45708155a39e45b989d0f2194e03a2d8.png?x-oss-process=style/z.wiki)

# 背景


经常有获取`IP`地址的需求，之前用过网上随便找的一些`API`，不过不怎么稳定。。。

干脆自己做一个，`API`+前端+小程序+`chrome`插件+`alfred`插件

目标如下：

![](https://z.wiki/autoupload/2022-05-02/a13d3cbd720549618dc20d846e266049.ipip.drawio.svg)

<img width="220" src="https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220409/c42d3008d9ac405aad02c456cc2a7a88.png?x-oss-process=style/z.wiki" />

经过短暂的开发有了阶段性结果（意思是到此为止吧🤣)

### 阶段性成果

前端地址：

[https://playground.fudongdong.com/lbs/showIp](https://playground.fudongdong.com/lbs/showIp)

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220409/038dadb133ee4a1285876a634ee48b40.png?x-oss-process=style/z.wiki)

`alfred` 插件：

[alfred-workflow-ipip](https://github.com/yihuaxiang/alfred-workflow-ipip)

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220410/d68b782087bd45909d9e814bb8393272.png?x-oss-process=style/z.wiki)

`API`接口：

接口地址：
```
https://playground.fudongdong.com/lbs/getIp
```

接口参数：

| 参数  | 类型  | 是否必填        | 备注       |
|-----|-----|-------------|----------|
| ip  | 字符串 | 否（默认取调用方IP） | 仅支持 IPv4 |

请求示例：

```shell
curl -s  "https://playground.fudongdong.com/lbs/getIp?ip=153.37.191.6"  | jq
```

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220409/9c59a855d7a542388c94ccb4c7d035f0.png?x-oss-process=style/z.wiki)
