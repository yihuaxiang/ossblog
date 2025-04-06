---
meta:
  - name: description
    content: Maven 配置阿里云镜像教程，提高 Maven 依赖下载速度，包括 settings.xml 和 pom.xml 配置方法
  - name: keywords
    content: Maven,阿里云镜像,settings.xml,pom.xml,仓库配置,依赖下载
tags: ["Maven", "阿里云镜像", "依赖管理"]
---

# maven 设置阿里云镜像

打开 `maven` 的配置文件（ `windows` 机器一般在 `maven` 安装目录的 `conf/settings.xml` ），在`<mirrors></mirrors>`标签中添加 `mirror` 子节点:

```xml
<mirror>
  <id>aliyunmaven</id>
  <mirrorOf>*</mirrorOf>
  <name>阿里云公共仓库</name>
  <url>https://maven.aliyun.com/repository/public</url>
</mirror>
```


修改远程仓库可在`pom.xml`中的`<repositories></repositories>`节点中加入对应的仓库使用地址。

```xml
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

`central`和`public`两个仓库的区别如下：


|   仓库  | 源地址  |
|  ----  | ----  |
| central  | https://repo1.maven.org/maven2/ |
| public  | central仓和jcenter仓的聚合仓 |
