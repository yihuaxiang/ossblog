---
meta:
  - name: description
    content: shell 进度条实现方法，包括初级和高级进度条的代码示例和运行效果展示
  - name: keywords
    content: shell,进度条,bash,terminal,console,ANSI,转义序列
tags: ["shell", "bash", "进度条", "terminal"]
---

# shell 进度条


在`shell`中输出进度条

## 初级进度条

```
#!/bin/bash

for((i=1;i<100;i++))
do
  printf "\u001b[1000D 进度：${i}";
  sleep 1;
done
```

运行效果：

![](https://4.z.wiki/images/20220408/46a17eb651684ba49d960f87a4dd7d11.gif)

## 高级进度条

```
#!/bin/bash
i=0
str=""
arry=("\\" "|" "/" "-")
while [ $i -le 100 ]
do
    let index=i%4
    printf "\u001b[1000D[%-100s] %d %c" "$str" "$i" "${arry[$index]}"
    sleep 0.1
    let i=i+1
    str+="#"
done
echo ""
```

运行效果：

![](https://1.z.wiki/images/20220408/1ceac5fd91294989b9cc7fdd09dffbf0.gif)

> 更信息内容可查看 [ANSI转义序列](https://z.wiki/tech/my-first-post-in-stackoverflow.html);
