---
meta:
  - name: description
    content: 介绍 Nginx try_files 指令的用法，以及如何部署单页应用，如何设置状态码。
  - name: keywords
    content: nginx try_files spa部署 单页应用部署
---
# try_files 指令

突然发现 try_files 指令非常适合但也应用的部署。

try_files 是 Nginx 配置中的一个重要指令，用于按顺序检查文件的存在性，并根据找到的第一个匹配进行处理。如果所有的文件都不存在，它可以设置一个默认的处理程序，例如重定向到某个脚本或返回404错误。


```
try_files file ... uri;

# 或

try_files file ... =code;

```



其中 file ... 是一系列文件路径，Nginx 会按顺序尝试这些路径。uri 是当所有文件都不存在时需要进行的内部重定向的 URI（这可能会触发另一轮 location 匹配）。而 =code 是指直接返回的 HTTP 状态码。

举例来说，假设你想设置一个简单的静态站点，同时还能处理一些特殊的路由。你可能会在 Nginx 配置中使用 try_files 指令如下：


```
server {
    listen 80;
    server_name example.com;
    root /var/www/example.com;

    location / {
        # 首先尝试作为文件提供请求的 URI
        # 然后尝试作为目录提供，最后传递给 index.php 处理
        try_files $uri $uri/ /index.php;
    }
}
```


在这个例子中，对于每个请求，Nginx 将：

检查请求的 URI 是否对应文件系统中的一个真实文件；
如果不是文件，检查是否是一个目录；
如果都不是，将请求重定向到 /index.php（同时保留 query string）。
如果想直接返回一个状态码而不进行内部路由转发，可以像这样：


```
location / {
    try_files $uri $uri/ =404;
}
```

在这种情况下，如果文件或目录不存在，则直接返回 HTTP 404 错误。

try_files 是实现“前端控制器模式”（front controller pattern）的理想选择，比如当你在使用某些 PHP 框架（如 Laravel、Symfony）或其他需要进行 URL 重写的单页面应用（SPA）时。通过使用 try_files，你可以确保所有的 HTTP 请求都指向同一个入口文件（通常是 index.php），除非请求的是一个真实存在的文件（像 CSS 或 JavaScript 文件）或目录。

