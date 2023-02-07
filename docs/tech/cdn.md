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



### Siege 压测

使用[Siege](https://z.wiki/misc/cmd-recommend.html#siege)模式`10`个用户`10`次访问，结果如下：

```
# CDN 域名测试结果
Transactions:		        1600 hits
Availability:		      100.00 %
Elapsed time:		      110.14 secs
Data transferred:	       32.32 MB
Response time:		        0.38 secs
Transaction rate:	       14.53 trans/sec
Throughput:		        0.29 MB/sec
Concurrency:		        5.52
Successful transactions:        1600
Failed transactions:	           0
Longest transaction:	       55.06
Shortest transaction:	        0.01
```

```
# 非 CDN 域名测试结果
Transactions:		        1600 hits
Availability:		      100.00 %
Elapsed time:		      209.74 secs
Data transferred:	       81.43 MB
Response time:		        1.14 secs
Transaction rate:	        7.63 trans/sec
Throughput:		        0.39 MB/sec
Concurrency:		        8.70
Successful transactions:        1600
Failed transactions:	           0
Longest transaction:	      113.36
Shortest transaction:	        0.00
```

总共`1600`个请求，`CDN`加速域名耗时`110`秒，比飞加速域名快了将近`100`秒，同时数据传输量也减少`60%`。
