---
meta:
  - name: description
    content: JavaScript 将 HTML 字符串转换为 DOM 元素的方法，介绍如何使用 template 元素实现 HTML 到 DOM 的转换
  - name: keywords
    content: JavaScript,HTML,DOM,字符串转DOM,template,createElement,innerHTML
tags: ["JavaScript", "HTML", "DOM", "Web开发"]
---

# html 字符串转 dom


html 字符串转 dom：

```js
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // 避免返回空文本 node 节点
    template.innerHTML = html;
    return template.content.firstChild;
}
```
