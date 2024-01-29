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
