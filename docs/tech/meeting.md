---
meta:
  - name: description
    content: 抢购脚本，通过程序自动进行页面点击、订单下载
  - name: keywords
    content: 脚本,js,抢购,自动化,程序,下单
---
# 抢购脚本

每周都要抢 _***_ ，作为程序员的我怎么能纯人肉抢呢？于是这个脚本应运而生。

<ImgView title="脚本" url="https://z.wiki/autoupload/2022-09-12/be11be625b444277b6c348e12f37a29c.image.png" />

### 脚本内容

```JavaScript
(function() {
    'use strict';
    var clicked = false; // 标记抢订状态，确保只抢订一次
    function doClick() {
        var minutes = new Date().getMinutes();
        if(minutes == 0 && !clicked) { // 时间点分钟数正好为0️⃣的时候进行抢订
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

### 使用方法

打开浏览器控制台，切换到`console`面板，复制以上内容并粘贴进去回车执行即可

<ImgView title="脚本" url="https://z.wiki/autoupload/2022-09-12/929cf03e38e843c3bd8b409e3b475afd.image.png" />

自此，生产力极大提升

![](https://z.wiki/autoupload/2022-09-12/12fa5566e24c4ceaaadce8271f55827c.红领巾.gif)

### 免责声明

请勿使用该脚本抢月饼哟🐶🐶🐶

<TheEnd />


