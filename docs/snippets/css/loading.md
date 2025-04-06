---
meta:
  - name: description
    content: CSS加载动画效果实现，提供简洁易用的loading动画样式代码和使用方法
  - name: keywords
    content: CSS,loading,加载动画,动画效果,前端样式,spinZoom
tags: ["CSS", "loading", "加载动画", "前端样式"]
---

# 加载中动画


引入如下代码，通过给目标元素加上`loading`这个类，自动变成加载中动画，使用方便、性能好。

```css
a[class*=-btn].loading, 
label[class*=-btn].loading {
    position: relative;
}
a[class*=-btn].loading::first-line, 
label[class*=-btn].loading::first-line {
    color: transparent;
}
a[class*=-btn].loading::before, 
label[class*=-btn].loading::before {
    width: 4px; height: 4px;
    margin: auto;
    content: '';
    -webkit-animation: spinZoom 1s steps(8) infinite;
    animation: spinZoom 1s steps(8) infinite;
    border-radius: 100%;
    box-shadow: 0 -10px 0 1px currentColor, 10px 0 currentColor, 0 10px currentColor, -10px 0 currentColor, -7px -7px 0 .5px currentColor, 7px -7px 0 1.5px currentColor, 7px 7px currentColor, -7px 7px currentColor;
    /* center */
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
}
/* loading动画 */
@-webkit-keyframes spinZoom {
    0% {
        -webkit-transform: scale(.75) rotate(0);
    }
    100% {
        -webkit-transform: scale(.75) rotate(360deg);
    }
}
@keyframes spinZoom {
    0% {
        transform: scale(.75) rotate(0);
    }
    100% {
        transform: scale(.75) rotate(360deg);
    }
}
```
