---
meta:
  - name: description
    content: JavaScript cookie 操作，包括设置 cookie 和读取 cookie 的方法实现
  - name: keywords
    content: JavaScript,cookie,setCookie,getCookie,设置cookie,读取cookie
tags: ["JavaScript", "cookie", "前端"]
---

# cookie 操作


设置`cookie`

```JavaScript
function setCookie(name, value, domain, expriesDays, encode = false) {
  const Days = expriesDays || 10
  const exp = new Date()
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
  value = encode ? escape(value) : value
  document.cookie = `${name}=${value};domain=${domain};path=/;expires=${exp.toUTCString()}`
}
```

读取`cookie`

```JavaScript
function getCookie(k) {
  const res = RegExp('(^|; )' + encodeURIComponent(k) + '=([^;]*)').exec(document.cookie)
  return res && res[2]
}
```
