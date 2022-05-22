# html 字符实体 - 空格

进入看到`html`字符实体中的空格部分，原以为`nbsp`只是空格符的等价映射，今天才恍然大悟。

### 定义

[https://www.w3.org/TR/html401/sgml/entities.html](https://www.w3.org/TR/html401/sgml/entities.html)

```text
<!ENTITY nbsp   CDATA "&#160;" -- no-break space = non-breaking space,
                                  U+00A0 ISOnum -->
```

从`w3`的定义上看，`nbsp`是"非折行空格符"，一段文字在宽度不足的情况下会按空白符进行折行，
其中普通空格就是折行符的一个，而`nbsp`是非折行空格符，意味着`nbsp`前后的单词紧密连接在一起不会中间折行。

### 应用

在书名、系统名称等单词直接使用`nbsp`这个字符实体，可以保证书名、系统名称不会中间折断，此外`html`中相连的多个普通空格字符会在解析式解析成一个空白字符，
但是`nbsp`字符实体不会进行合并。

### 其他

`nbsp` 全是成`non-breaking space`，那是不是还有其他空白字符实体呢？还真有，继续看`w3`的文档。

```text
...
<!ENTITY ensp    CDATA "&#8194;" -- en space, U+2002 ISOpub -->
<!ENTITY emsp    CDATA "&#8195;" -- em space, U+2003 ISOpub -->
<!ENTITY thinsp  CDATA "&#8201;" -- thin space, U+2009 ISOpub -->
...
```

同样叫空白字符还有`ensp`、`emsp`、`thinsp`等。

1. `ensp`：`en space`,`en`是排版领域的一个单位，长度为字体的一般，如：字体为`12px`，那`1en`表示`6px`，故`ensp`为长度为字体一半的宽度的空格符，在中文中等同于半角的空格符。
2. `emsp`： `em space`，`em`也是排版领域的一个单位，与前者的区别是`1em`表示字体大小，如：字体为`12px`，则`1em`同为`12px`，`emsp`即为字体相同长度的空格符，在中文中等同于全角的空格符。
3. `thinsp`： `thin space`，顾名思义，就是比较瘦的空格符，宽度为`ensp`的一半。

