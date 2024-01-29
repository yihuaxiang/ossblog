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
