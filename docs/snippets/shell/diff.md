# 文本对比


两个文件进行`diff`，先排序、后对比。

```shell
bash -c 'vimdiff <(sort text2) <(sort text1)'
```
