---
meta:
  - name: description
    content: Apache .htaccess 301重定向配置指南，包含单页面和整站跳转的配置方法和示例
  - name: keywords
    content: htaccess,301,重定向,跳转,Apache,redirect
tags: ["htaccess", "301", "redirect", "Apache", "重定向"]
---

# 301跳转


单页面：

```
Redirect 301 /oldpage.html https://www.yoursite.com/newpage.html
Redirect 301 /oldpage2.html https://www.yoursite.com/folder/
```

整站：

```
Redirect 301 / https://newsite.com/
```

