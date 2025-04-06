---
meta:
  - name: description
    content: shell 并发执行命令的方法，介绍如何使用 xargs 实现并行处理和多线程执行
  - name: keywords
    content: shell,并发,并行,xargs,多线程,parallel
tags: ["shell", "并发", "xargs", "parallel"]
---

# shell 并发执行


并发执行`curl`

```shell
xargs -I % -P 8 curl -X POST  "https://z.wiki"  < <(printf '%s\n' {1..4})
```
