---
meta:
  - name: description
    content: vim 括号跳转技巧，介绍如何在匹配的括号之间快速跳转，以及如何使用 mark 功能快速返回
  - name: keywords
    content: vim,括号跳转,mark,百分号,跳转技巧
tags: ["vim", "跳转", "mark"]
---

# 在匹配括号之间跳转

vim 提供了大量快速移动的命令，例如：`%` 可以在闭合括号之间快速移动，该括号包括小括号、中括号、大括号。

经常有需求需要修改括号类型，如将小括号改成中括号

```
this is a test content (Yes 。。。。。。。。)
```

如需要将上述中的小括号改成中括号，在改之前可以从左括号直接跳转到右括号，但是一旦左边改了就没办法跳转到右边了，尴尬了。


```
this is a test content [Yes 。。。。。。。。)
```

这时候最好的办法是：修改前进行一次跳转，修改一边后点击`''`就可以回到原来的位置了，原来每次`%`跳转，vim 都会将跳转前的位置 `mark` 为`'`，
于是就能通过`''`快速回去了，
通过查看 mark 内容能看到各个 mark 的位置。


<ImgView title="在匹配括号之间跳转" url="https://9.z.wiki/autoupload/20240228/eOf2.1766X2540-image.png" />

vim 的官方文档解释如下：

```
''  ``			To the position before the latest jump, or where the
			last "m'" or "m`" command was given.  Not set when the
			|:keepjumps| command modifier was used.
			Also see |restore-position|.
```



新技能 get。

