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


