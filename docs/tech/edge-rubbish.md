---
meta:
  - name: description
    content: Edge浏览器的垃圾功能及解决方法，介绍如何关闭Edge内置JSON查看器等不友好功能
  - name: keywords
    content: Edge,浏览器,JSON查看器,垃圾功能,edge://flags,浏览器设置
tags: ["Edge", "浏览器", "JSON查看器", "功能优化"]
---

# Edge 的垃圾功能

Edge 从 112 版本开始内置 JSON 查看器，这个查看器的体验实在无法恭维

1. 默认无法折叠（需要每次手动开启折叠）
2. 完全阻止其他 JSON 查看插件的使用
3. 不具备区块高亮

[edge JSON 折叠](https://learn.microsoft.com/zh-cn/microsoft-edge/devtools-guide-chromium/whats-new/2023/04/devtools-112#the-json-viewer-in-microsoft-edge-supports-code-folding)


<ImgView title="Edge JSON 折叠" url="https://6.z.wiki/autoupload/20240122/LELD.2072X1502-Pasted_Graphic.png" />


不过，可以打开 Edge 的
实验页面 `edge://flags/`
可以关闭内置的 JSON 查看器：

<ImgView title="Edge 的垃圾功能" url="https://5.z.wiki/autoupload/20240229/Usax.1184X2610-image.png" />

