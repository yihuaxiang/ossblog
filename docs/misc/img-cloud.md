---
meta:
  - name: description
    content: 敖武的图床,免费公共图床, 提供图片上传和图片外链服务, 原图保存, 全球CDN加速
  - name: keywords
    content: 敖武的图床,免费公共图床, 提供图片上传和图片外链服务, 原图保存, 全球CDN加速
tags: ["图床", "敖武的图床", "免费图床"]
---
# 敖武的图床

> 传送门：
> 
> 敖武的图床： [敖武的图床](https://playground.z.wiki/img-cloud/index.html)

### 故事起源

经常有很多图片需要上传，平时在公司直接用公司的图床，在`Idea`上传照片的话有一个 [Markdown Image Support](https://plugins.jetbrains.com/plugin/14097-markdown-image-support) 的插件，
可以支持在`markdown`文件中粘贴照片，但是有很多时候不是在`markdown`中上传。

<img src="https://z.wiki/images/20220405/1b67581529b24ee29f1af5ae285d76d1.png" width="100" />

### 操刀上阵

干脆自己开发一个小图床，地址 [敖武的图床](https://playground.z.wiki/img-cloud/index.html) 支持一键粘贴、一键复制。

<img src="https://z.wiki/images/20220405/a8d7ff1dfad142f69a983e06c2cfd1b6.png" width="100" />

支持历史数据查询，匿名使用，租户隔离😘

<ImgView title="珠海旅游" url="https://4.z.wiki/images/20220411/da4d0367e28548a3989cde9fb42ff75d.png" />


### 点滴困惑

不过貌似网速有点慢啊😂

<ImgView title="敖武的图床" url="https://z.wiki/images/20220405/5000de8b59174089bbe452f4d8f85e4e.png" />


`vpn`的问题，关闭`vpn`，上传速度飞起。

<ImgView title="敖武的图床" url="https://z.wiki/images/20220405/6b6963fbfdc247e58d5dca81ba234dec.gif" />


### 展望规划

> 展望 ≈ 随便一说，别当真（手动狗头

计划后续支持以下特性：

1. 多种压缩（无损压缩、有损压缩、原图上传等等）
2. 多种复制方式（`url`、`base64`等等） **注**：已支持
3. 照片实时处理（水印、旋转、实时压缩、模糊等等）
4. 多种上传方式（拖拽上传、`base64`上传等等）
5. 支持水印（使用`oss`+`nginx`实现） **注**：已支持
6. 支持`zip`文件上传 **注**：已支持
7. 多域名支持 **注**：已支持,目前有`10`个二级域名，每次上传都会随机选择一个域名，便于前端快速加载
8. 分页查询，已支持
9. 支持跨域访问，已支持
10. 支持二维码访问，已支持
11. 分享口令，已支持
12. 支持`CDN`加速，已支持
13. 支持 `http 2.0`
14. 支持邮箱登录，上传记录跟着账号走





以上别当真，会做我是小狗（手动狗头
