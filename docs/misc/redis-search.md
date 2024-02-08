# 搜索升级

### 第一版搜索

vuepress 内置基于标题的[搜索](https://v1.vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%86%85%E7%BD%AE%E6%90%9C%E7%B4%A2)，该搜索会基于标题文字匹配进行搜索，无法搜索到内容，更无法全文检索。

### 第二版搜索

后来我将 vuepress 内置的搜索替换成 [algolia](https://z.wiki/misc/algolia.html) 

<ImgView title="搜索升级" url="https://2.z.wiki/autoupload/20240208/2u0S.804X1112-image.png" />

但一直有两大难题压着我。

1. 索引不能实时更新

[algolia](https://www.algolia.com/) 每周进行一个索引更新

<ImgView title="搜索升级" url="https://5.z.wiki/autoupload/20240208/Hm4U.936X1388-image.png" />

2. 接口反应慢，第一次输入的时候迟迟没有结果

### 第三版搜索

这次从“进口”转“自研”，基于 `redis-search` 开发了自己的搜索服务：[敖武的搜索-敖索](https://playground.z.wiki/search/page)

<ImgView title="搜索升级" url="https://1.z.wiki/autoupload/20240208/XLaC.2666X4034-image.png" />

