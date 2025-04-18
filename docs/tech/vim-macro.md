---
meta:
  - name: description
    content: vim macro 从入门到精通，介绍 vim 宏的定义、录制、执行和进阶使用
  - name: keywords
    content: vim,macro,宏,录制,执行,进阶
tags: ["vim", "macro", "宏"]
---

# vim macro 从入门到精通

<ImgView title="vim" url="https://5.z.wiki/autoupload/20230712/7VXh.225X224-image.png" />

### 什么是`Vim`宏

#### 宏的定义和作用

<TextTitle text="定义" title="宏的定义和作用" />

对于文本编辑器来说，“宏”是一个由用户定义的命令序列，可以在编辑器中多次执行这个序列。

`Vim`宏是一种可以录制、回放和重复执行一系列操作的功能。
宏的目的是为了减少在编辑大批量文本时的手动操作，提高编辑效率。
`Vim`宏可以用于处理大量文本，例如代码缩进、文本替换、注释添加等。

### 如何录制`Vim`宏

<TextTitle text="录制" title="如何录制" />

#### 开始和停止录制宏

`Vim`宏的录制需要使用`q<letter><commands>q`等一系列命令。

开始录制宏时，需要按下`q<letter>`命令来启动录制，表示开始录制一个名为`<letter>`的宏，`<letter>`可以是任意英文字母。
接着执行一系列操作，例如在文本中进行的查找、替换、删除等操作。
完成录制后，需要按下`q`命令来停止录制。


#### 如何执行录制好的宏

录制完成后，可以通过`@<letter>`命令来重复执行这个宏，其中`<letter>`是宏的名称，可以是任意英文字母。

#### 读取和修改宏


通过命令`:reg <letter>`查看名称为`<letter>`的宏（即寄存器`<letter>`中保存的内容）。

通过命令`:let @<letter>="<Ctrl-R><Ctrl-r><letter>"`命令可以对寄存器的内容进行二次修改。


### `Vim`宏的进阶使用

<TextTitle text="进阶" title="进阶" />

#### 强制执行宏

`Vim`宏的执行可能因为某些原因而遇到错误，例如替换时找不到匹配项等。
虽然这些错误会中断宏的执行，但可以通过强制执行宏来忽略这些错误，让宏继续执行。
使用`q<letter>!`命令可以强制执行宏，即使它遇到错误也不会中断执行。

#### 如何在`Vim`中设置宏的快捷键

`Vim`宏可以通过映射来自定义快捷键，并将其与宏关联起来。
使用`:nnoremap`命令可以创建一个新的映射，让快捷键与宏关联。
```
nnoremap ,<letter1> @<letter2>
```

> 注：配置中的`<letter1> <letter1>`需要根据实际需要替换。
在使用映射时，只需要按下对应的快捷键，即可自动执行宏。

### 实例应用

<TextTitle text="实战" title="实战" />

#### 通过宏快速添加后缀

<VideoPlayer src="https://fudongdong-statics.oss-cn-beijing.aliyuncs.com/autoupload/20230712/a09D.我的影片_13.mp4" />

