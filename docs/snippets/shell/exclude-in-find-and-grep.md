---
meta:
  - name: description
    content: 介绍如何在 find 和 grep 命令中排除指定目录，提高搜索效率和准确性
  - name: keywords
    content: find,grep,exclude,排除目录,node_modules,搜索,查找
tags: ["shell", "find", "grep", "exclude", "排除目录"]
---

# find、grep 排除指定目录


通过`find`、`grep`查找文件、内容的时候排查指定目录（如`node_modules`）

## grep
```shell
grep -i --exclude-dir=node_modules -r "content" *
```

> 通过`grep`查找内容速度过慢时，推荐使用，参考文档 [rgrep](https://z.wiki/tech/ripgrep.html)

## find
```shell
find . -name "package.json" ! -path "*node_modules*"
```

