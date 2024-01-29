# nginx 打印请求体（body）内容



通过`nginx`打印请求体中的参数
```nginx
http {

   log_format postdata $request_body;

   server {     
      location / {
         access_log  /var/log/nginx/postdata.log  postdata;
         proxy_paass http://localhost:8080;
      }
   }
}

```

