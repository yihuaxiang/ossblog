---
meta:
  - name: description
    content: bc 命令从入门到精通，介绍 bc 基本计算器的使用方法，包括数学计算、小数精度设置等功能
  - name: keywords
    content: bc,basic calculator,基本计算器,数学计算,小数精度,shell计算
tags: ["bc", "calculator", "shell", "计算器"]
---

# 数学计算-bc



## 数学计算

> `bc` 全称 `basic calculator`，支持加减乘除关系运算等多种运算方式

进行基础的数学计算

```shell
echo "1.356 * 1.2" | bc -l
echo '( 32 / 5 )' | bc
echo '( 32 / 5 ) * 9 ' | bc
```

设定小数精度

```shell
echo 'scale=2; ( 32 / 5 )' | bc
echo 'scale=2; ( 32 / 5 ) * 9' | bc

```
