---
meta:
  - name: description
    content: 从零到一介绍 docker 的使用
  - name: keywords
    content: docker 容器 微服务 程序员 开发 后端技术
tags: ["docker", "发布", "镜像"]
---

# docker

<ImgView title="docker" url="https://3.z.wiki/autoupload/20230501/VkEH.2160X3840-image.png" />

### 介绍与基础概念

<TextTitle text="概念" title="介绍与基础概念" />

`Docker`是一种容器化技术，它可以轻松地打包、部署和运行应用程序或服务。
`Docker`的核心组件包括`Docker Engine`、`Docker Hub`和`Docker CLI`。
`Docker Engine`是一个运行在主机上的后台服务，用于管理容器、镜像和网络等`Docker`组件。
`Docker Hub`是一个在线的镜像仓库，用户可以在其中存储、分享和拉取`Docker`镜像。
`Docker CLI`是一个命令行工具，它提供了一系列用于管理`Docker`的命令。

在`Docker`中，容器是一种轻量级、可移植、可自包含的软件单元，它可以在任何地方运行。
`Docker`容器是基于镜像创建的，镜像是一个只读的模板，它包含了应用程序或服务运行所需的所有组件和配置。
`Docker`镜像是由`Dockerfile`定义的，`Dockerfile`是一个包含了一系列指令的文件，它描述了如何构建`Docker`镜像。
`Docker`网络是一个附加的组件，它允许容器之间互相通信，以及容器和主机之间的通信。

### 常用命令

<TextTitle text="命令" title="常用命令" />

`docker run`：该命令用于在 `Docker` 容器中运行一个新的镜像。语法如下：

```shell
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

其中 `OPTIONS` 可以指定容器的各种选项，如 `-p` 表示指定端口映射，`-v` 表示挂载数据卷等。

举例说明：

```shell
docker run -itd -v $(pwd):/var/opt/home  -p 80:3000 node:18
```

该命令将宿主机的`80`端口映射到容器的`3000`端口，将当前目录挂在到容器的`/var/opt/home`目录。

`docker ps`：该命令用于列出当前正在运行的容器。语法如下：

```shell
docker ps [OPTIONS]
```

其中 `OPTIONS` 可以指定各种筛选条件，如 `-a` 表示列出所有容器，包括已停止的容器。

docker images：该命令用于列出当前系统中所有的镜像。语法如下：

```shell
docker images [OPTIONS] [REPOSITORY[:TAG]]
```

其中`OPTIONS`可以指定各种筛选条件，如 `-a` 表示列出所有镜像，包括中间层镜像。

`docker build`：该命令用于根据 `Dockerfile` 构建一个新的镜像。语法如下：

```shell
docker build [OPTIONS] PATH
```

其中 `OPTIONS` 可以指定各种选项，如 `-t` 表示指定新镜像的名称和标签。

`docker stop`：该命令用于停止运行中的容器。语法如下：

```shell
docker stop [OPTIONS] CONTAINER [CONTAINER...]
```

其中 `OPTIONS` 可以指定停止容器的选项，如 `-t` 表示指定等待容器停止的时间。

`docker rm`：该命令用于删除一个或多个容器。语法如下：

```shell
docker rm [OPTIONS] CONTAINER [CONTAINER...]
```

其中 `OPTIONS` 可以指定删除容器的选项，如 -f 表示强制删除容器。

`docker rmi`：该命令用于删除一个或多个镜像。语法如下：

```shell
docker rmi [OPTIONS] IMAGE [IMAGE...]
```

其中 `OPTIONS` 可以指定删除镜像的选项，如 `-f` 表示强制删除镜像。

`docker exec`：该命令用于在运行中的容器中执行命令。语法如下：

```shell
docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
```

其中 `OPTIONS` 可以指定执行命令的选项，如 `-it` 表示在交互模式下执行命令。

举例说明：

```shell
docker exec -it jolly_fermat bash
```

以上命令以交互模式下执行容器`jolly_fermat`里面的`bash`程序。


### 创建应用

<TextTitle text="创建" title="创建应用" />

1. 从[start.spring.io](https://start.spring.io)初始化一个`web`应用
2. 运行`package`生命周期，打包成`jar`

<ImgView title="docker" url="https://3.z.wiki/images/20211115/1c75893dcf694b7e94bcba31ef6c9ace.png" />


### 通过`docker`发布应用

<TextTitle text="发布" title="发布应用" />

#### 找到`OpenJDK`的镜像

地址：[https://hub.docker.com/_/openjdk](https://hub.docker.com/_/openjdk)

```shell
docker pull openjdk
```

#### 查看本地镜像
```shell
docker images
```

运行接入如下：能看到`OpenJDK`镜像即可

```shell
REPOSITORY                  TAG       IMAGE ID       CREATED       SIZE
openjdk                     latest    deaa5a1a5f98   10 days ago   471MB
httpd                       latest    1132a4fc88fa   3 weeks ago   143MB
php                         latest    dae5324f443c   3 weeks ago   476MB
mysql                       latest    ecac195d15af   3 weeks ago   516MB
ubuntu                      latest    ba6acccedd29   4 weeks ago   72.8MB
nginx                       latest    87a94228f133   4 weeks ago   133MB
```



#### 定制镜像

在一个空目录下，新建一个名为 Dockerfile 文件，并在文件内添加以下内容：

```shell
# 定制的镜像都是基于 FROM 的镜像，这里的 openjdk 就是定制需要的基础镜像。后续的操作都是基于 openjdk
FROM openjdk 

# 将打包好的应用复制到镜像中
COPY ./springproject/target/springproject-0.0.1-SNAPSHOT.jar /root

# 运行程序，监听 8080 端口
CMD java -jar /root/springproject-0.0.1-SNAPSHOT.jar

```

#### 构建镜像

```shell
docker build -t fddweb:latest .
```

注：命令中的`.`是上下文路径，是指 docker 在构建镜像，有时候想要使用到本机的文件（比如复制），docker build 命令得知这个路径后，会将路径下的所有内容打包。

构建结果如下：

```shell
[+] Building 0.2s (7/7) FINISHED
 => [internal] load build definition from Dockerfile                                                                                                                                                     0.0s
 => => transferring dockerfile: 179B                                                                                                                                                                     0.0s
 => [internal] load .dockerignore                                                                                                                                                                        0.0s
 => => transferring context: 2B                                                                                                                                                                          0.0s
 => [internal] load metadata for docker.io/library/openjdk:latest                                                                                                                                        0.0s
 => [internal] load build context                                                                                                                                                                        0.0s
 => => transferring context: 150B                                                                                                                                                                        0.0s
 => [1/2] FROM docker.io/library/openjdk                                                                                                                                                                 0.0s
 => CACHED [2/2] COPY ./springproject/target/springproject-0.0.1-SNAPSHOT.jar /root                                                                                                                      0.0s
 => exporting to image                                                                                                                                                                                   0.1s
 => => exporting layers                                                                                                                                                                                  0.1s
 => => writing image sha256:36dbcd1aa38da48e8f6e4bb20346a3320f5f93946c7a812366c4aba151acaaa2                                                                                                             0.0s
 => => naming to docker.io/library/fddweb:latest                                                                                                                                                         0.0s

Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them
```

查看本地镜像，镜像列表中多了一条

```shell
fddweb                      latest    36dbcd1aa38d   2 minutes ago   488MB
```

#### 本地运行与测试

```shell
docker  run -d -p 8080:8080 fddweb
```
运行后访问[http://localhost:8080](http://localhost:8080)即可

#### 发布

1. 登陆
```shell
docker login
```

根据提示输入用户名密码，第一次需要去官网进行注册

2. 打标

```shell
docker tag fddweb fudocker/fddweb:latest
```

3. 上传
```shell
docker push fudocker/fddweb:latest
```

运行结果：
```shell
The push refers to repository [docker.io/fudocker/fddweb]
04540b06bf06: Pushed
bf43d511e1ed: Mounted from library/openjdk
86ab8b6eae75: Mounted from library/openjdk
8178e842e73e: Mounted from library/openjdk
latest: digest: sha256:8ad87d86d41e7953f7c2542719b0d82f30f832b0eeb9fd7e8cb2012bc7ed5073 size: 1166
```

### 使用应用镜像

<TextTitle text="镜像" title="使用应用镜像" />

拉取镜像
```shell
docker push fudocker/fddweb:tagname
```

使用镜像
```shell
docker run -d -p 8811:8080 fudocker/fddweb:latest
```
运行后访问[http:localhost:8811](http://localhost:8811)即可

### docker-compose

`docker-compose`是用于定义和运行多容器 `Docker` 应用程序的工具。
通过 `docker compose`，您可以使用 `YML` 文件来配置应用程序需要的所有服务。
然后，使用`docker-compose up`或`docker-compose up -d`命令，就可以从 `YML` 文件配置中创建并启动所有服务。


#### docker-compose 安装 

```shell
# 下载 docker-compose 可执行文件，具体版本号 [github](https://github.com/docker/compose/releases) 获取
sudo curl -L "https://github.com/docker/compose/releases/download/v2.2.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 添加可执行权限
sudo chmod +x /usr/local/bin/docker-compose

# 软连接到 /usr/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

# 检查是否安装成功
docker-compose version
```

[docker-compose 安装文档](https://docs.docker.com/compose/install/)

安装后在有`docker-compose.yml`文件的目录中执行`docker-compose up -d`即可运行程序。

#### docker-compose.yml

`docker-compose.yml`的写法可以参考官网文档：[docs.docker.com](https://docs.docker.com/compose/compose-file/03-compose-file/)。



#### 参考文档
1. [runoob](https://www.runoob.com/docker/docker-dockerfile.html)
2. [docker.com](https://docs.docker.com/get-started/)
