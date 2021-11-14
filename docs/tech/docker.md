# docker

## 创建应用
1. 从[start.spring.io](https://start.spring.io)初始化一个`web`应用
2. 运行`package`生命周期，打包成`jar`

## 通过`docker`发布应用

1. 找到`OpenJDK`的镜像，地址：[https://hub.docker.com/_/openjdk](https://hub.docker.com/_/openjdk)

```shell
docker pull openjdk
```

2. 查看本地镜像
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



3. 使用 Dockerfile 定制镜像

在一个空目录下，新建一个名为 Dockerfile 文件，并在文件内添加以下内容：

```shell
# 定制的镜像都是基于 FROM 的镜像，这里的 openjdk 就是定制需要的基础镜像。后续的操作都是基于 openjdk
FROM openjdk 

# 将打包好的应用复制到镜像中
COPY ./springproject/target/springproject-0.0.1-SNAPSHOT.jar /root

# 运行程序，监听 8080 端口
CMD java -jar /root/springproject-0.0.1-SNAPSHOT.jar

```

5. 构建镜像

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

6. 本地运行与测试

```shell
docker  run -d -p 8080:8080 fddweb
```
运行后访问`http://localhost:8080`即可

7. 发布

7.1 登陆
```shell
docker login
```

根据提示输入用户名密码，第一次需要去官网进行注册

7.2 打标

```shell
docker tag fddweb fudocker/fddweb:latest
```

7.3 上传
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

8. 使用应用镜像

拉取镜像
```shell
docker push fudocker/fddweb:tagname
```

使用镜像
```shell
docker run -d -p 8811:8080 fudocker/fddweb:latest
```
运行后访问[http:localhost:8811](http://localhost:8811)即可


## 参考文档
1. [https://www.runoob.com/docker/docker-dockerfile.html](https://www.runoob.com/docker/docker-dockerfile.html)
2. [https://docs.docker.com/get-started/](https://docs.docker.com/get-started/)
