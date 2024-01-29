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

