# curl




`curl`是和网络请求相关使用最频繁的工具，甚至某种程度上可以替代`postman`来进行接口测试。


## 限速

```shell
# 限速 `10k` 进行页面下载
curl -i -L --limit-rate 10k z.wiki 
```
