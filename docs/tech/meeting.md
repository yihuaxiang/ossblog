# 抢购脚本

每周都要抢***，作为程序员的我怎么能春人肉抢呢？于是这个脚本应运而生。

![](https://5.z.wiki/autoupload/2022-09-12/be11be625b444277b6c348e12f37a29c.image.png)

```JavaScript
(function() {
    'use strict';
    var clicked = false; // 标记抢订状态，确保只抢订一次
    function doClick() {
        var minutes = new Date().getMinutes();
        if(minutes == 0 && !clicked) { // 时间点分钟数正好为0️⃣的事件进行抢订
            console.info('doClick', new Date(), new Date().getMilliseconds());
            document.querySelector('.next-dialog button.next-btn-primary').click(); // 需要点击的按钮，根据实际需要来修改
            clicked = true;
        } else {
            console.info('not doClick')
        }
    }

    function loop() {
        doClick();
        requestAnimationFrame(loop); // 循环执行抢订函数
    }

    requestAnimationFrame(loop);
})();
```
