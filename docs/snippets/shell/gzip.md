# 查找文件并进行 gzip

查找 js css 文件并进行 gzip


```shell
find . \( -name "*\.js" -o -name "*\.css" \) -exec bash -c 'echo Compressing "{}" && gzip -c --best "{}" > "{}.gz"' \;
```

