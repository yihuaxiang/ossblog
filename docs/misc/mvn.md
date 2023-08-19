# maven 设置阿里云镜像

打开 `maven` 的配置文件（ `windows` 机器一般在 `maven` 安装目录的 `conf/settings.xml` ），在`<mirrors></mirrors>`标签中添加 `mirror` 子节点:

```
<mirror>
  <id>aliyunmaven</id>
  <mirrorOf>*</mirrorOf>
  <name>阿里云公共仓库</name>
  <url>https://maven.aliyun.com/repository/public</url>
</mirror>
```


修改远程仓库可在`pom.xml`中的`<repositories></repositories>`节点中加入对应的仓库使用地址。

```
<repository>
  <id>central</id>
  <url>https://maven.aliyun.com/repository/central</url>
  <releases>
    <enabled>true</enabled>
  </releases>
  <snapshots>
    <enabled>true</enabled>
  </snapshots>
</repository>
```

