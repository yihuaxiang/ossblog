# nginx 限流


### nginx 限流



```
http {
  limit_req_zone $binary_remote_addr zone=one:10m rate=5r/s;
  ...
  server {
    ...
    location / {
      ...
      limit_req zone=one burst=5 nodelay;
    }
  }
}
```

