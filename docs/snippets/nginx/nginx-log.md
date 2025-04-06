---
meta:
  - name: description
    content: nginx 打印请求体内容，介绍如何通过 nginx 配置来记录 HTTP 请求体中的参数
  - name: keywords
    content: nginx,log,请求体,request body,日志配置,access_log
tags: ["nginx", "log", "request body", "配置"]
---

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

