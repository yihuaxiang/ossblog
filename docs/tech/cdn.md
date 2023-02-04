# CDN 加速

图床上传的照片支持`CDN`加速域名，本地跑脚本测了下，速度提升`70%`以上，真赞，后续有空整站都进行`CDN`加速。

![CDN 加速](https://9.z.wiki/autoupload/20230205/1IZR.400X1180-image.png)


### 非CDN测速

测试脚本:

```shell
for n in {1..5}
do
  total=0;
  for i in {1..20}
  do
    content=$(curl -o /dev/null -s -w '%{time_total}'  https://1.z.wiki/autoupload/20230205/kipU.1154X1742-image.png)
    total=`echo "scale=2;( $total + $content )" | bc -l`
  done
  avg=`echo "scale=2;( $total / 20 )" | bc -l`
  echo 非CDN域名，下载时间： $avg 秒
  total=0;
done
```

测试结果：

```
非CDN域名，下载时间： .25 秒
非CDN域名，下载时间： .44 秒
非CDN域名，下载时间： .60 秒
非CDN域名，下载时间： .54 秒
非CDN域名，下载时间： .41 秒
```


### CDN测速

测试脚本:

```shell
#!/bin/bash
for n in {1..5}
do
  total=0;
  for i in {1..20}
  do
    content=$(curl -o /dev/null -s -w '%{time_total}'  https://1.cdn.z.wiki/autoupload/20230205/kipU.1154X1742-image.png)
    total=`echo "scale=2;( $total + $content )" | bc -l`
  done
  avg=`echo "scale=2;( $total / 20 )" | bc -l`
  echo CDN域名，下载时间： $avg 秒
  total=0;
done
```

测试结果：

```
CDN域名，下载时间： .11 秒
CDN域名，下载时间： .10 秒
CDN域名，下载时间： .10 秒
CDN域名，下载时间： .10 秒
CDN域名，下载时间： .11 秒
```



