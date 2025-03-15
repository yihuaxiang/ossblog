---
meta:
  - name: description
    content: 动态插入 JavaScript 脚本的方法，介绍如何在网页运行时动态加载 JS 文件
  - name: keywords
    content: JavaScript,动态插入,脚本,script,动态加载,异步加载
tags: ["JavaScript", "动态加载", "脚本注入"]
---

# 动态插入 js 脚本


动态插入 js 脚本

```JavaScript
var injectScript = (function () {
  var relative = document.getElementsByTagName('script')[0];

  return function (src, callback) {
    var script = document.createElement('script');
    script.async = 1;
    script.src = src;
    if (callback) script.onload = callback.call(script);
    relative.parentNode.insertBefore(script, relative);
    return script;
  }
})();
```
