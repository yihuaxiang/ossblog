---
meta:
  - name: description
    content: Java 诊断工具, arthas, 后端开发, 了实时调试和诊断 Java 程序的能力
  - name: keywords
    content: Java 诊断工具, arthas, 后端开发, debug, 排查
---

# Arthas 必知必会



Arthas 是阿里巴巴开源的一个强大的 Java 诊断工具，它为开发者提供了实时调试和诊断 Java 程序的能力，特别是在生产环境下。它允许你在不重启应用的情况下监控和排查问题。下面是 Arthas 的一些常见用法:

插件：

<ImgView title="Arthas 插件" url="https://hv.z.wiki/autoupload/20241117/U6Xl/2188X1656/image.png" />


### Arthas 安装

#### 下载 Arthas

你可以直接使用以下命令下载 Arthas：

```shell
curl -O https://arthas.aliyun.com/arthas-boot.jar
```

#### 启动 Arthas

进入 Java 应用的主目录，执行以下命令启动：

```shell
java -jar arthas-boot.jar
```

#### 连接到 JVM

启动后，会列出当前系统中的所有 JVM 进程，你可以选择要连接的进程 ID。
如：

```shell
[INFO] arthas-boot version: 3.5.6
Found existing java process, please choose one and hit ENTER.
* [1]: 12345 com.example.MyApplication

```

### 常用命令


#### `dashboard` 命令


用于查看应用的实时运行状态，比如线程、内存和 CPU 使用情况：


```shell
dashboard

```

这个命令可以帮助快速定位性能问题，例如高 CPU 使用率或线程死锁。


#### thread 命令

用于查看和分析 Java 线程的情况，支持查找死锁和获取线程堆栈信息：

```shell
thread
```

你可以使用 `thread -n 3` 来查看 CPU 消耗最高的前 3 个线程，或者 `thread -b` 来列出阻塞的线程。

#### `watch` 命令

实时监控指定方法的执行情况，并可以记录返回值、入参、抛出的异常等信息：

```shell
watch com.example.MyClass myMethod returnObj
```

这个命令特别适合监控特定方法的行为。


`watch` 还可以按条件进行监控。
你可以通过指定条件来过滤出满足某些条件的调用并进行监控，
尤其是在处理方法参数的时候 。
`watch` 命令支持表达式，允许你基于方法的输入参数、返回值或者异常来触发监控行为。

**举例一**，如果你有一个方法 `myMethod(String param)`，并且你希望在 param 参数包含某个特定子串（例如 "test"）的时候才进行监控，可以使用如下命令：

```shell
watch com.example.MyClass myMethod '{params[0]}' -x 2 'params[0].contains("test")'
```

**举例二**，仅监控返回值大于某个值的情况： 如果你想监控方法的返回值大于某个值时触发，可以使用 returnObj 进行条件判断：

```shell
watch com.example.MyClass myMethod '{returnObj}' -x 2 'returnObj > 100'

```


**举例三**、监控抛出异常的情况： 如果你只想监控方法抛出异常时的情况，可以结合 throwExp 进行条件判断：

```shell
watch com.example.MyClass myMethod throwExp -e

```

**举例四**：监控特定参数类型的调用： 比如你希望监控某个参数类型为特定类时，可以这样写：

```shell
watch com.example.MyClass myMethod '{params[0]}' -x 2 'params[0] instanceof java.lang.String'

```





#### trace 命令

跟踪方法的调用路径及每个方法调用的耗时，特别适合调优性能问题：

````shell
trace com.example.MyClass myMethod
````
trace 命令会打印出整个方法调用链，帮助你发现哪些方法耗时过长。

#### stack 命令

打印方法的调用栈，帮助你了解某个方法是如何被调用的：

```shell

stack com.example.MyClass myMethod
```

#### jad 命令
用于反编译指定类，生成 Java 源代码，帮助你快速理解某个类的实现：

```shell
jad com.example.MyClass
```

#### ognl 命令

Arthas 提供了 OGNL 表达式执行功能，可以通过它快速调用方法、获取和设置属性：

```shell
ognl '@java.lang.System@out.println("Hello Arthas")'
```




### 参考文档

- [Arthas 简介](https://arthas.aliyun.com/doc/)
- [命令列表](https://arthas.aliyun.com/doc/commands.html)
- [Arthas FAQ](https://arthas.aliyun.com/doc/faq.html)
