---
meta:
  - name: description
    content: 文本对比工具和技巧，介绍如何使用 diff、vimdiff 等工具进行文本内容比较和差异分析
  - name: keywords
    content: diff,vimdiff,文本对比,差异分析,shell,排序对比
tags: ["diff", "vimdiff", "shell", "文本对比"]
---

# 文本对比


两个文件进行`diff`，先排序、后对比。

```shell
bash -c 'vimdiff <(sort text2) <(sort text1)'
```
