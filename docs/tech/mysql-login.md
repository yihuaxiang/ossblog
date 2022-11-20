# mysql 非交互式密码输入

以往在登陆`mysql`服务的时候都会交互式输入密码，一旦密码复杂的话每次都重复性输入，着实头疼。
下面介绍一种非交互式密码输入的方式

### 配置文件

在`~`即`home`目录下创建`.my.cnf`文件，并写入如下内容：

```
[mysql]
user = user
password = password

[mysqldump]
user = user
password = password
```

### 使用

写入如上文件后只需要登录时执行`mysql -h host -u user`即可登录


### 参考

[tecadmin.net](https://tecadmin.net/mysql-commands-without-password-prompt/#:~:text=First%20commands%20will%20allow%20you%20login%20to%20mysql,any%20shell%20script%20or%20schedule%20crontab%20for%20backup.)
