---
meta:
  - name: description
    content: iTerms 配置,终端配置,快捷键
  - name: keywords
    content: iTerms 配置,终端配置,快捷键
tags: ["iTerms", "终端", "神器", "效率", "程序员"]
---

# iTerm2 配置

为了更高效的利用终端，以及适当的时候___炫___一把，我给`iTerm2`配置了`Key binding`，最终想把终端打造成类`IDEA`一样的工具，完整配置在文章最后。

### 核心功能

#### 快速注释

当点击`Command + /`的时候自动发送`,cc`按键指令，`vim`便会对内容进行快速注释。

![](https://1.z.wiki/autoupload/2022-08-16/e1d296d06b4649af85b561320906ebda.image.png)

#### 全局内容搜索

当点击`Command + Shift + F`的时候自动发送`:Ag\n`按键指令，`vim`便会通过`Ag`插件进行弹框并搜索指定内容。

![](https://3.z.wiki/autoupload/2022-08-16/9f8fc6aadb1647e5b403f56d83be806c.image.png)

效果如下：

![](https://9.z.wiki/autoupload/2022-08-16/7ba175e0686e4b7fa9cc4b98fee04631.findcntent.gif)

#### 文件搜索

当点击`Command + P`的时候自动发送`:Files\n`按键指令，`vim`根据文件名进行搜索。

![](https://5.z.wiki/autoupload/2022-08-16/ff50fb4486b64bf58f84bc49ea66acf2.image.png)


效果如下：

![](https://6.z.wiki/autoupload/2022-08-16/ba80163df6a74a268160b922e5d971a2.files.gif)

#### 快速保存

当点击`Command + S`的时候自动发送`:w\n`按键指令，`vim`对当前编辑的文件进行保存。

![](https://7.z.wiki/autoupload/2022-08-16/4e92304b1acc4a61939d611c95625545.image.png)

#### 其他

其他都是一些简单快捷键设置，具体可以看下文中的完整配置，另外以上配置直接保存成`JSON`即可通过`iTerms`进行导入。

### 完整配置


```json
{
  "Key Mappings": {
    "0xf702-0x380000-0x7b": {
      "Label": "",
      "Text": ",wh",
      "Action": 12
    },
    "0x62-0x100000": {
      "Text": "gd",
      "Action": 38
    },
    "0xf702-0x300000": {
      "Text": "",
      "Action": 2
    },
    "0xf703-0x320000": {
      "Text": "",
      "Action": 34
    },
    "0xf702-0x320000": {
      "Text": "",
      "Action": 33
    },
    "0xf703-0x300000": {
      "Text": "",
      "Action": 0
    },
    "0xf72b-0x100000": {
      "Text": "",
      "Action": 4
    },
    "0xf72c-0x100000": {
      "Text": "",
      "Action": 9
    },
    "0xf704-0x100000-0x7a": {
      "Label": "",
      "Text": ":NERDTreeFind\\n",
      "Action": 12
    },
    "0xf700-0x300000": {
      "Text": "",
      "Action": 7
    },
    "0xf72d-0x100000": {
      "Text": "",
      "Action": 8
    },
    "0x9-0x40000": {
      "Text": "",
      "Action": 32
    },
    "0xf701-0x300000": {
      "Text": "",
      "Action": 6
    },
    "0x4e-0x120000-0x2d": {
      "Label": "",
      "Text": ",ww",
      "Action": 12
    },
    "0x2d-0x100000-0x1b": {
      "Label": "",
      "Text": ":vertical resize -10\\n",
      "Action": 12
    },
    "0x3b-0x40000": {
      "Text": ":call AceJumpWord(\"\")\\n",
      "Action": 38
    },
    "0x73-0x100000": {
      "Text": ":w\\n",
      "Action": 38
    },
    "0x2f-0x100000-0x2c": {
      "Label": "",
      "Text": ",cc",
      "Action": 12
    },
    "0x3d-0x100000-0x18": {
      "Label": "",
      "Text": ":vertical resize +10\\n",
      "Action": 12
    },
    "0x19-0x60000": {
      "Text": "",
      "Action": 39
    },
    "0xf729-0x100000": {
      "Text": "",
      "Action": 5
    },
    "0x46-0x120000": {
      "Text": ":Ag\\n",
      "Action": 38
    },
    "0xd-0x80000": {
      "Text": ",fix",
      "Action": 38
    },
    "0xf72c-0x20000": {
      "Text": "",
      "Action": 9
    },
    "0x70-0x100000": {
      "Text": ":Files\\n",
      "Action": 38
    },
    "0xf72d-0x20000": {
      "Text": "",
      "Action": 8
    },
    "0x50-0x120000-0x23": {
      "Label": "",
      "Text": ",wh",
      "Action": 12
    },
    "0xf703-0x380000-0x7c": {
      "Label": "",
      "Text": ",ww",
      "Action": 12
    }
  },
  "Touch Bar Items": {}
}
```