# docker 动态修改端口映射

### Docker 端口映射动态修改方法

在 `Docker` 中，通常使用 `docker run -p` 命令将容器内部端口映射到宿主机的指定端口上。
但有些情况下需要临时映射端口，例如 `Docker` 运行 `MySQL` 容器时，默认端口是不开放的。
那么有什么办法可以让正在运行的容器暴露指定的端口呢？

一种方法是通过修改 `Docker` 的配置文件来实现。
需要修改的文件包括 `config.v2.json` 和 `hostconfig.json`，
默认路径是 `/var/lib/docker/containers/<container_name>`。具体操作步骤如下：


1. 首先使用 `systemctl stop docker` 命令关闭 `Docker` 服务。
2. 然后修改 `config.v2.json` 文件中的 `ExposedPorts` 配置信息，例如添加内部端口 `8080/tcp` 的映射：

```
"Config": {
  "ExposedPorts": {
    "8080/tcp": {}
  },
  ...
},
```

3. 接着修改 `hostconfig.json` 文件中的 `PortBindings` 配置信息，例如添加内部端口 `8080/tcp` 和外部端口 `8080` 的映射：

```
"PortBindings": {
  "8080/tcp": [
    {
      "HostIp": "",
      "HostPort": "8080"
    }
  ]
}

```

4. 完成以上配置后使用 `systemctl restart docker` 命令重启 `Docker` 服务。最后重启指定容器即可访问对应的端口。


需要注意的是，修改 `Docker` 配置文件的操作风险较高，
需要谨慎操作并备份文件。此外，修改 `Docker` 配置文件是一次性的操作，需要重启 `Docker` 服务或容器后才能生效。
因此，除非特别需要，一般不建议使用这种方法来暴露容器的端口。可以通过使用 `docker run -p` 命令来指定需要暴露的端口，
避免不必要的风险。
