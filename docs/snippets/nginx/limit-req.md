---
meta:
  - name: description
    content: nginx 限流配置详解，包括限流模块的使用方法、参数配置及实际应用场景
  - name: keywords
    content: nginx,limit_req,限流,rate limiting,burst,nodelay
tags: ["nginx", "limit_req", "限流"]
---

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

