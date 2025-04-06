---
meta:
  - name: description
    content: curl 命令详解，网络请求工具的使用方法，包括限速、接口测试等功能
  - name: keywords
    content: curl,网络请求,接口测试,限速,HTTP
tags: ["curl", "网络请求", "HTTP", "命令行工具"]
---

# curl




`curl`是和网络请求相关使用最频繁的工具，甚至某种程度上可以替代`postman`来进行接口测试。


## 限速

```shell
# 限速 `10k` 进行页面下载
curl -i -L --limit-rate 10k z.wiki 
```
