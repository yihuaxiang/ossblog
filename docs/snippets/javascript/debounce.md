# 防抖函数

防抖函数是一种优化技术，用来限制某个函数在一定时间内被调用的频率。当事件被触发后，它会等待一段时间，如果在这段时间内再次被触发，那么它会重新开始等待。

下面是一个使用`JavaScript`实现的简单防抖函数：


```javascript
function debounce(func, wait) {
  let timeout;

  return function() {
    const context = this;
    const args = arguments;
    
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}
```
