---
meta:
  - name: description
    content: iTerms 配置,终端配置,快捷键
  - name: keywords
    content: iTerms 配置,终端配置,快捷键
tags: ["iTerms", "终端", "神器", "效率", "程序员"]
---

# iTerm2 配置

为了更高效的利用终端，以及适当的时候 __炫__ 一把，我给`iTerm2`配置了`Key binding`，最终想把终端打造成类`IDEA`一样的工具，完整配置在文章最后。

### 核心功能

#### 快速注释

当点击`Command + /`的时候自动发送`,cc`按键指令，`vim`便会对内容进行快速注释。

<ImgView title="终端" url="https://z.wiki/autoupload/2022-08-16/e1d296d06b4649af85b561320906ebda.image.png" />


#### 全局内容搜索

当点击`Command + Shift + F`的时候自动发送`:Ag\n`按键指令，`vim`便会通过`Ag`插件进行弹框并搜索指定内容。

<ImgView title="iTerm2 全局搜索功能" url="https://z.wiki/autoupload/2022-08-16/9f8fc6aadb1647e5b403f56d83be806c.image.png" />


效果如下：

<ImgView title="iTerm2 全局搜索功能" url="https://z.wiki/autoupload/2022-08-16/7ba175e0686e4b7fa9cc4b98fee04631.findcntent.gif" />


#### 文件搜索

当点击`Command + P`的时候自动发送`:Files\n`按键指令，`vim`根据文件名进行搜索。

<ImgView title="iTerm2 文件搜索" url="https://z.wiki/autoupload/2022-08-16/ff50fb4486b64bf58f84bc49ea66acf2.image.png" />



效果如下：

<ImgView title="iTerm2 文件搜索" url="https://z.wiki/autoupload/2022-08-16/ba80163df6a74a268160b922e5d971a2.files.gif" />


#### 最近文件

点击`Command + E`时自动发送`:History`按键指令，打开最近使用过的文件

<ImgView title="终端" url="https://z.wiki/autoupload/2022-09-09/77d891f0c5fb48809790cbc77c12461c.image.png" />


#### 快速保存

当点击`Command + S`的时候自动发送`:w\n`按键指令，`vim`对当前编辑的文件进行保存。

<ImgView title="iTerm2 快速保存" url="https://z.wiki/autoupload/2022-08-16/4e92304b1acc4a61939d611c95625545.image.png" />


#### 其他

其他都是一些简单快捷键设置，具体可以看下文中的完整配置，另外文章最后的配置直接解压成`.itermkeymap`文件即可通过`iTerms`进行导入。

### 完整配置


1. [v1.0 下载链接：iterm2.itermkeymap.zip](https://z.wiki/autoupload/2022-08-16/502be620666044f095913fdb8b6c604c.iterm2.itermkeymap.zip)
2. [v1.1 下载链接：iterm2.itermkeymap.zip](https://z.wiki/autoupload/2022-09-16/c0d3827a9d084595ba6333db02c2f3fc.iterm2.itermkeymap.zip)

导入方式：

<ImgView title="iTerm2 导入配置" url="https://z.wiki/autoupload/2022-08-16/b23a6f9e70254855977843979d554ae7.image.png" />

