---
tags: ["ANSI", "ANSI 转义序列", "ANSI escape code"]
---


# `ANSI`转义序列

### `[36m` 是什么

曾在做云构建的时候，收到的日志中经常有`[36m`、`[2K`、`[1G`类似的字符

> 云构建就是讲本地构建移植到云上，需要在前端实时显示日志

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220408/36a762a83c3b4555b28262ef2105ca32.png?x-oss-process=image/resize,w_800/quality,q_80)

```shell
2022-04-08 21:48:35[36m⠙[39m [0/43] Installing vue-template-compiler@^2.6.5
2022-04-08 21:48:35[2K[1G[36m⠹[39m [0/43] Installing vue-template-compiler@^2.6.5
2022-04-08 21:48:35[2K[1G[36m⠸[39m [0/43] Installing vue-template-compiler@^2.6.5
2022-04-08 21:48:35[2K[1G
2022-04-08 21:48:35[36m⠼[39m [0/43] Installing vue-template-compiler@^2.6.5
2022-04-08 21:48:35[2K[1G[36m⠴[39m [0/43] Installing vue-template-compiler@^2.6.5
2022-04-08 21:48:35[2K[1G[36m⠦[39m [0/43] Installing vue-template-compiler@^2.6.5
2022-04-08 21:48:36[2K[1G[36m⠧[39m [2/43] Installing is-buffer@~1.1.6
2022-04-08 21:48:36[2K[1G[36m⠇[39m [3/43] Installing tiny-emitter@^2.0.0
2022-04-08 21:48:36[2K[1G[36m⠏[39m [4/43] Installing to-array@0.1.4
2022-04-08 21:48:36[2K[1G[36m⠋[39m [4/43] Installing terraformer@~1.0.5
2022-04-08 21:48:36[2K[1G
2022-04-08 21:48:36[36m⠙[39m [4/43] Installing eslint-plugin-vue@^4.7.1
2022-04-08 21:48:36[2K[1G
2022-04-08 21:48:36[36m⠹[39m [4/43] Installing sortablejs@1.10.2
2022-04-08 21:48:36[2K[1G[36m⠸[39m [4/43] Installing source-map@^0.5.7
2022-04-08 21:48:36[2K[1G[36m⠼[39m [4/43] Installing worker-farm@^1.7.0
2022-04-08 21:48:36[2K[1G[36m⠴[39m [4/43] Installing semver@^6.3.0
2022-04-08 21:48:36[2K[1G[36m⠦[39m [4/43] Installing debug@=3.1.0
2022-04-08 21:48:36[2K[1G
```

感觉像是某种特殊字符，想百度下，却又无从下手，实在想不出来该搜索什么关键字

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220408/5b383319d9524e9e97b855f3b9f5decb.png?x-oss-process=image/resize,w_800/quality,q_80)

### 献出我的一血

今天正好逛到`Stack Overflow`，献出我的一血：

[What does "\[0;31m" means?](https://stackoverflow.com/questions/71796687/what-does-031m-means)

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220408/2ffdf2d3a8b74c85b8d45bc6409d4fe4.png?x-oss-process=image/resize,w_800/quality,q_80)

### 探索真相

根据网友的回复，所有线索都指向了 **ANSI转义序列**

**ANSI转义序列**是程序和终端交互的重要手段，**ANSI转义序列**是一种特殊的字符，通过这些字符，程序可以控制终端的行为、样式等（如：控制输出文本的前景色、背景色、控制光标位置等）。

以下通过多个例子来体验**ANSI转义序列**之美🌹

#### 富文本

通过终端打印的文字默认是黑白风格，通过最基本的**ANSI转义序列**可以自定义文本渲染样式，
如：颜色、背景色。

```shell
print "\u001b[31mHelloWorld"
```

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220408/36470f8dd8e74e25b1eebe9e31ec0bfe.png?x-oss-process=image/resize,w_800/quality,q_80)


其中含义如下：

1. 黑色：`\u001b[30m`
2. 红色：`\u001b[31m`
3. 绿色：`\u001b[32m`
4. 黄色：`\u001b[33m`
5. 蓝色：`\u001b[34m`
6. 洋红色：`\u001b[35m`
7. 青色：`\u001b[36m`
8. 白色：`\u001b[37m`
9. 重置：`\u001b[0m`

> 类似语法不仅仅在`shell`中支持，`java`、`JavaScript`、`Python`也都有一定的支持，`js`运行效果如下：
> 
> ![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220408/868adfad725e4891a1ef4f1665e074d0.png?x-oss-process=image/resize,w_800/quality,q_80)


更多例子如下：

```shell
print "\u001b[30m A \u001b[31m B \u001b[32m C \u001b[33m D \u001b[0m"
print "\u001b[34m E \u001b[35m F \u001b[36m G \u001b[37m H \u001b[0m"
```

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220408/4c5e43a7339c4d80a9ad50f018710118.png?x-oss-process=image/resize,w_800/quality,q_80)


除了以上 8 中基础颜色，大多数终端还支持**加亮**、**粗体**等配色或显示效果，并在原来代码后面多了`;1`这个标志。

1. 亮黑色：`\u001b[30;1m`
2. 鲜红色：`\u001b[31;1m`
3. 亮绿色：`\u001b[32;1m`
4. 亮黄色：`\u001b[33;1m`
5. 亮蓝色：`\u001b[34;1m`
6. 亮洋红色：`\u001b[35;1m`
7. 亮青色：`\u001b[36;1m`
8. 亮白：`\u001b[37;1m`
9. 重置：`\u001b[0m`

同理，背景色代码如下：

普通背景色

1. 背景黑色：`\u001b[40m`
2. 背景红色：`\u001b[41m`
3. 背景绿色：`\u001b[42m`
4. 背景黄色：`\u001b[43m`
5. 背景蓝色：`\u001b[44m`
6. 背景洋红色：`\u001b[45m`
7. 背景青色：`\u001b[46m`
8. 背景白色：`\u001b[47m`

加亮版背景色

1. 背景亮黑色：`\u001b[40;1m`
2. 背景亮红色：`\u001b[41;1m`
3. 背景亮绿色：`\u001b[42;1m`
4. 背景亮黄色：`\u001b[43;1m`
5. 背景亮蓝色：`\u001b[44;1m`
6. 背景明亮的洋红色：`\u001b[45;1m`
7. 背景亮青色：`\u001b[46;1m`
8. 背景亮白色：`\u001b[47;1m`


测试例子一如下：
```shell
print "\u001b[40m A \u001b[41m B \u001b[42m C \u001b[43m D \u001b[0m";
print "\u001b[44m A \u001b[45m B \u001b[46m C \u001b[47m D \u001b[0m";
print "\u001b[40;1m A \u001b[41;1m B \u001b[42;1m C \u001b[43;1m D \u001b[0m";
print "\u001b[44;1m A \u001b[45;1m B \u001b[46;1m C \u001b[47;1m D \u001b[0m";
```
![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220408/a66e9aeac6794c28832e2dfac60be5a4.png?x-oss-process=image/resize,w_800/quality,q_80)

测试例子二如下：
```shell
function showcolors256() {
    local row col blockrow blockcol red green blue
    local showcolor=_showcolor256_${1:-bg}
    local white="\033[1;37m"
    local reset="\033[0m"

    echo 16 standard color codes:
    for row in {0..1}; do
        for col in {0..7}; do
            $showcolor $(( row*8 + col )) $row
        done
        echo
    done
    echo

    echo 6·6·6 RGB color codes:
    for blockrow in {0..2}; do
        for red in {0..5}; do
            for blockcol in {0..1}; do
                green=$(( blockrow*2 + blockcol ))
                for blue in {0..5}; do
                    $showcolor $(( red*36 + green*6 + blue + 16 )) $green
                done
                echo -n "  "
            done
            echo
        done
        echo
    done

    echo 24 grayscale color codes:
    for row in {0..1}; do
        for col in {0..11}; do
            $showcolor $(( row*12 + col + 232 )) $row
        done
        echo
    done
    echo
}

function _showcolor256_fg() {
    local code=$( printf %03d $1 )
    echo -ne "\033[38;5;${code}m"
    echo -nE " $code "
    echo -ne "\033[0m"
}

function _showcolor256_bg() {
    if (( $2 % 2 == 0 )); then
        echo -ne "\033[1;37m"
    else
        echo -ne "\033[0;30m"
    fi
    local code=$( printf %03d $1 )
    echo -ne "\033[48;5;${code}m"
    echo -nE " $code "
    echo -ne "\033[0m"
}

showcolors256
```

![](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220413/919d8511629e4d2d999704b1d34b0ee7.png?x-oss-process=image/resize,w_800/quality,q_80)



其他修饰效果

1. 粗体 `\u001b[1m`
2. 下划线 `\u001b[4m`
3. 反转 `\u001b[7m`

#### 光标导航

相比文本修饰转义字符，光标导航相关转义字符更为复杂，
它允许程序控制光标的位置、删除部分内容等等。

##### 移动光标

基本操作

1. 上：`\u001b[{n}A`
2. 下：`\u001b[{n}B`
3. 左：`\u001b[{n}D`
4. 右：`\u001b[{n}C`

进阶操作

1. 后N行 :`\u001b[{n}E`将光标向下移动到`n`行首
2. 前N行 :`\u001b[{n}F`将光标向下移动到`n`行首
3. 设置列 ：`\u001b[{n}G`将光标移动到列`n`
4. 设置位置 ：`\u001b[{n};{m}H`将光标移动到`n`行列`m`
5. 保存位置：`\u001b[{s}`保存当前光标位置
6. 保存位置：`\u001b[{u}`将光标恢复到上次保存的位置

利用光标的上下左右移动，我们可以做一个加载进度效果，代码如下：

###### 初级进度条

```shell
#!/bin/bash

for((i=1;i<100;i++))
do
  printf "\u001b[1000D 进度：${i}";
  sleep 1;
done
```

运行效果如下：

![loading.gif](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220408/46a17eb651684ba49d960f87a4dd7d11.gif?x-oss-process=image/resize,w_800/quality,q_80)

###### 高级进度条

```shell
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

运行效果如下：

![loading.gif](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220408/1ceac5fd91294989b9cc7fdd09dffbf0.gif?x-oss-process=image/resize,w_800/quality,q_80)


通过不断将光标左移 1000 个字符从而实现后打印的字符覆盖前打印的字符。


##### 删除内容

1. 清屏： `\u001b[{n}J` 

> `n=0`从光标清除直到屏幕结束
> 
> `n=1`从光标清除到屏幕开头
> 
> `n=2`清除整个屏幕

2. 清行： `\u001b[{n}K`

> `n=0`从光标清除到行尾
> 
> `n=1`从光标清除到行首
> 
> `n=2`清除整行


### 不忘初心

学习完毕，不忘初心，让我们回到最初的问题上，日志中的这些特殊字符到底什么含义呢？

```shell
2022-04-08 21:48:36[2K[1G[36m⠸[39m [4/43] Installing source-map@^0.5.7
2022-04-08 21:48:36[2K[1G[36m⠼[39m [4/43] Installing worker-farm@^1.7.0
```

#### 答案

`[2K`该字符前其实有一个不可见字符`\u001b`(`Esc`字符)，根据上文中的学习资料，
`\u001b[2K`的含义就是清除整行

`[1G`同理，将光标移动到第一列

`[36m`同理，设置后面的文本样式为青色

如果前端在显示日志的时候能支持这些控制指令的话，那最终效果将和在终端安装依赖类似：安装进度不断在同一行刷新刷新刷新...

![install.gif](https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/images/20220408/1f6b8d5b24e948c29aad2df3035b5e40.gif?x-oss-process=image/resize,w_800/quality,q_80)




<TheEnd />
