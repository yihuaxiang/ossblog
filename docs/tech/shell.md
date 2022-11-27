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

[点此下载以上脚本](https://0.z.wiki/autoupload/20221127/GSD8.fun.sh)


执行结果如下：

```shell
在函数中打印内容
在函数中打印内容
在函数中打印内容
在函数中打印内容
在函数中打印内容
循环结束
```
