---
meta:
  - name: description
    content: mysql 非交互式密码输入
  - name: keywords
    content: mysql,密码输入,非交互式,数据库,登录
---
# mysql 非交互式密码输入

以往在登陆`mysql`服务的时候都会交互式输入密码，
一旦密码复杂的话每次都重复性输入，
或需要通过程序老师行定时任务，
交互式密码输入是在让人头大。

![mysql](https://7.z.wiki/autoupload/2022-11-21/c0fc5435dc9942e4afbd8d611fcadc25.38E97C3A-0CDE-467B-9493-FB7B823C98B9.png)

下面介绍一种非交互式密码输入的方式

### 配置文件

在`~`(即`home`)目录下创建`.my.cnf`文件，并写入如下内容：

```
[mysql]
user = user
password = password

[mysqldump]
user = user
password = password
```

>  注：用户名密码结合实际来修改

### 使用

写入如上文件后只需要登录时执行`mysql -h host -u user`即可登录


### 参考

[tecadmin.net](https://tecadmin.net/mysql-commands-without-password-prompt/#:~:text=First%20commands%20will%20allow%20you%20login%20to%20mysql,any%20shell%20script%20or%20schedule%20crontab%20for%20backup.)
