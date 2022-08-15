# iTerm2 配置

给`iTerm2`配置了`Key binding`，主要想把终端打造成类`IDEA`一样的工具，完整配置如下：

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



### 核心功能

#### 快速注释

当点击`Command + /`的时候自动发送`,cc`按键指令，`vim`便会对内容进行快速注释。

![](https://1.z.wiki/autoupload/2022-08-16/e1d296d06b4649af85b561320906ebda.image.png)

#### 全局内容搜索

#### 文件搜索

#### 快速保存

#### 其他

其他都是一些简单快捷键设置，具体可以看上文中的完整配置，另外以上配置直接保存成`JSON`即可通过`iTerms`进行导入。