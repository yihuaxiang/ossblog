# 水印保护

给网站上的照片添加了水印保护，效果如下：

![](https://1.z.wiki/images/20220520/33b6d65f4c6c48ffacea4ecae0eacc52.png)

### 事儿是酱的

我在开发 [图床](https://tuchuang.z.wiki/misc/tuchuang.html) 的时候，想让上传方可以自行添加水印，
想到水印，我突然想到，我的博客上的照片可都没水印啊，这可咋整？

![Thinking_Outline.png](https://2.z.wiki/images/20220520/b35f5032e53f457b88dc0ae9440c8785.png)


### 现状是酱的

思考我博客中的照片，其实都是保存在 [oss](https://oss.console.aliyun.com/) 上，无非是直接、简介访问`oss`。


![](https://z.wiki/autoupload/2022-05-20/d467f33b231548c7bf788b712b2b0ceb.oss-%E6%B0%B4%E5%8D%B0.drawio.svg)

### `OSS`图片处理

`OSS`支持多种照片处理，如：

1. 渐进显示，用以开启先模糊后清晰的呈现方式，仅对格式为 JPG 的图片有效。
2. 自适应方向，会根据图片中 EXIF 旋转信息先旋转后进行缩略。
3. 照片质量，质量参数仅对 JPG 和 WEBP 的图片有效，且对 WEBP 来说，相对质量等价于绝对质量。
4. 缩放。
5. 亮度、对比度、模糊、等处理。
6. 水印，文字水印、图片水印。

![](https://3.z.wiki/images/20220521/d320f219fcbe43b5b757e3b69c568252.png)

通过新建照片样式并在访问的时候通过追加参数``即可访问处理后的照片。

新建照片样式时支持两种模式

1. 基本编辑，提供可视化的编辑能力，但同一种效果无法多次应用
2. 高级编辑，有门槛，但支持同一效果多次应用，例如：我就加了两种水印，一种浅红色、平铺水印，一种 右下角深黑色水印

```
image/auto-orient,1/interlace,1/quality,Q_80/contrast,-8/watermark,text_aHR0cHM6Ly96Lndpa2k,color_fd0303,size_35,rotate_45,fill_1,g_center,t_4,x_100,y_50/watermark,text_aHR0cHM6Ly96Lndpa2k,color_0c0c0c,size_25,g_se,x_20,y_20
```

### 如何访问

如何访问加水印的照片呢

#### 方案一

在前端修改照片`URL`，缺点是某些人可以通过去除参数来实现访问原图，如果原图敏感的话建议开启"原图保护"功能

![](https://0.z.wiki/images/20220521/8ff226ff3ef74941a7c361273cc6c284.png)

#### 方案二

通过`nginx`转发并在后台追加参数，优点：`URL`更美观且安全，缺点：需要转发一层，会有一定的性能损耗

实现方式参考[nginx 反向代理并追加参数](https://snippets.z.wiki/#!./snippets/nginx/proxy/)

```nginx
location /v1/resources {
    resolver 8.8.8.8;
    proxy_pass https://domain.com$uri?key=value
}
```


<TheEnd />
