# nginx 重定向 redirect



单页面重定向
```nginx
server {
    location = /oldpage.html {
        return 301 http://example.org/newpage.html;
    }
}
```


整站重定向
```nginx
server {
    server_name old-site.com
    return 301 $scheme://new-site.com$request_uri;
}
```


子路径重定向
```nginx
location /old-site {
    rewrite ^/old-site/(.*) http://example.org/new-site/$1 permanent;
}
```


