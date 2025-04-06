---
meta:
  - name: description
    content: JavaScript sleep 函数实现，介绍如何在 JavaScript 中实现延时等待功能
  - name: keywords
    content: JavaScript,sleep,延时,等待,Promise,setTimeout
tags: ["JavaScript", "sleep", "Promise", "setTimeout"]
---

# sleep


sleep 方法：

```js
function sleep(milliseconds): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(milliseconds);
    }, milliseconds);
  });
}
```

使用方法：

```js
async function bizMethod() {
    // ... do something
    await sleep(1000) // sleep 1秒
    // ... do something else
}
```


