---
meta:
  - name: description
    content: 占位图片,前端占位图片,image holder
  - name: keywords
    content: 占位图片生成器，一键式生成我们想要的占位图。
---
# 占位图服务

一个简单的占位符服务，服务地址：[占位符服务](https://z.wiki/placeholder)

### 使用方法

1. 普通占位符图片

```html
<img src="https://z.wiki/placeholder/512x128" />
```

<ImgView title="占位符" url="https://z.wiki/placeholder/512x128" />



```html
<img src="https://z.wiki/placeholder/512x256" />
```

<ImgView title="占位符" url="https://z.wiki/placeholder/512x256" />


2. 图片加边框

```html
<img src="https://z.wiki/placeholder/512x256+border" />
```

<ImgView title="占位符" url="https://z.wiki/placeholder/512x256+border" />


3. 图片加叉号

```html
<img src="https://z.wiki/placeholder/512x256+cross" />
```

<ImgView title="占位符" url="https://z.wiki/placeholder/512x256+cross" />

4. 图片加叉号加边框

```html
<img src="https://z.wiki/placeholder/512x256+border+cross" />
```

<ImgView title="占位符" url="https://z.wiki/placeholder/512x256+border+cross" />

5. 设置个性化文案

```html
<img src="https://z.wiki/placeholder/512x256+border+cross?text=z.wiki" />
```

<ImgView title="占位符" url="https://z.wiki/placeholder/512x256+border+cross?text=z.wiki" />

6. 自定义样式

```html
<img src="https://z.wiki/placeholder/512x128+cross+border?text=1234&color=red&bgColor=rgba(0,255,0,0.3)&borderColor=blue&crossColor=orange" />
```

样式支持的参数如下：

* `color` 中间文字颜色
* `bgColor` 背景色
* `borderColor` 边框颜色
* `crossColor` 叉号线颜色

<ImgView title="占位符" url="https://z.wiki/placeholder/512x128+cross+border?text=1234&color=red&bgColor=rgba(0,255,0,0.3)&borderColor=blue&crossColor=orange" />

