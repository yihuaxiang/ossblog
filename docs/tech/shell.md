# shell 函数指北

### 创建函数

在`shell`中有两种创建函数的方法。

一：关键字`function`

```shell
function name {
  commands
}
```

如上示例，`name`为函数唯一名称，在`shell`脚本中每个函数名必须唯一，`commands`为构成函数的多条`shell`命令。


二：无关键子

```shell.md
name() {
  commands
}
```

在函数名后面直接调价括号，大括号内味函数包含的`shell`命令。


### 使用函数

在`shell`中使用函数只需要调用函数名即可（注：无需在函数名后面加括号）

示例如下：

```shell
#!/bin/bash

function funName1() {
  echo "在函数中打印内容"
}

count=1
while [ $count -le 5 ] 
do
  funName1
  count=$[ $count + 1 ]
done

echo 循环结束
```

> [点此下载以上脚本](https://0.z.wiki/autoupload/20221127/GSD8.fun.sh)


执行结果如下：

```shell
在函数中打印内容
在函数中打印内容
在函数中打印内容
在函数中打印内容
在函数中打印内容
循环结束
```


注意事项：

1. 函数必须在调用之前进行定义，否则会报错`xxx: command  not found`
2. 函数名必须唯一，否则后定义的函数会覆盖先定义的函数，并且不会有任何提示


### 返回值

函数执行结束后都会返回一个状态码（返回码、退出码），有三种不同的方式来为函数生成状态码。

#### 一：默认退出状态码

默认情况下，函数退出码就是函数中最后一条命令返回的退出码，在函数执行后可以通过`$?`来获取函数的退出码。

```shell
#!/bin/bash

fun1() {
  echo "显示一个不存在的文件"
  ls -l file-non-exist
}

echo 开始调用函数
fun1
echo 退出码为：$?
```

> [点此下载以上脚本](https://0.z.wiki/autoupload/20221127/GSD8.fun.sh)

执行结果如下：

```shell
显示一个不存在的文件
开始调用函数
退出码为：1

```

函数退出码为`1`，因为函数中最后一条命令没有运行成功，默认状态码仅考虑最后一条命令的运行状态而不考虑其他代码的运行状态，故而有了其他两种状态码返回方法

> 在`shell`中`0`为运行成功的状态码，其他均为异常状态码




#### 二：return 关键字

通过`return`退出函数是可以指定特定的状态码

```shell
#!/bin/bash

fun1() {
  if [ -f /file-non-exit ] 
  then
    return 2 # 函数返回状态吗
  fi

  echo find file /file-non-exit
}

echo 开始调用函数
fun1
echo 状态吗是: $?
```

> [点此下载以上脚本](https://1.z.wiki/autoupload/20221127/qWdP.fun.sh)

运行结果如下：

```shell
开始调用函数
状态吗是: 2
```

> 注：函数状态吗在`0~255`之间，超出该范围将导致报错。


#### 三：echo

正常的命令输出结果可以保存到`shell`变量中，对函数也可以采用同样的方案：在函数中进行`echo`输出，调用的地方将输出结果保存起来

```shell
#!/bin/bash

fun1() {
  read -p "请输出任意信息" input
  echo input
}

result=$(fun1)
echo return value is $result
```

> [点此下载以上脚本](https://0.z.wiki/autoupload/20221127/Vvye.fun.sh)

通过该方案可以返回小数、字符串类型的返回值。


### 在函数中使用变量

#### 参数变量

在`shell`中调用函数同时需要传参的时候，函数和参数必须在用一行，如：`fun arg1 arg2`，同时函数内部可以通过`$1`、`$2`等变量获取对应的参数

```shell
#!/bin/bash

fun() {
  echo '$1 is' $1
  echo '$2 is' $2
}

fun arg1 arg2
```

> [点此下载以上脚本](https://5.z.wiki/autoupload/20221127/DkTI.fun.sh)


#### 全局变量

默认情况下，在`shell`脚本中定义的都是全局变量，在脚本任意地方均可读取，包括函数内部。

#### 局部变量

局部变量使用`local`来定义，这样在函数内部定义的变量就不会影响全局

### 函数库

如果相同函数在不同`shell`脚本中都用到了，这时候可以将通用的函数放到单独的文件中，既函数库，例如：`myFuncs.sh`


```shell
#!/bin/bash

functioin add {
  echo $[ $1 + $2 ]
}

function multem {
  echo $[ $1 * $2 ]
}

function divem {
  echo $[ $1 / $2 ]
}

```


在使用的脚本中通过`source /path-to-myFunc.sh` 或 `. /path-to-myFunc.sh` 加载函数库，加载后即可使用`add`、`multem`、`divem`三个函数。

### shtool

如同其他编程语言都有各种第三方库一样，`shell`也有自己的第三方库，如非常流行的`shtool`，该函数库就提供了很多便捷的函数。

#### 安装：


下载地址：[shtool fpt](ftp://ftp.gnu.org/gnu/shtool/shtool-2.0.8.tar.gz)
下载后执行以下脚本即可安装：

```shell
tar -zxvf shtool-2.0.8.tar.gz
./configure
make
```

安装后`shtool`提供的函数便可以再任意地方使用

> brew 用户可以通过`brew install shtool`来快速安装

| 函数         | 功能描述     |
|--------------|-----------|
|  Arx | 创建归档文件|
| Echo | 显示字符串，提供了一些扩展功能|
| install | 安装脚本或文件 |
| mdate | 显示文件或目录的修改时间 |
| mkln | 根据相对路径创建链接 |
| move| 移动文件，支持文件替换 |
| Prop | 显示一个带有动画的进度条 |
| version | 创建版本信息文件 |



