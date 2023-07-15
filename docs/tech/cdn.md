# CDN 加速

图床上传的照片支持`CDN`加速域名，本地跑脚本测了下，速度提升`70%`以上，真赞，后续有空整站都进行`CDN`加速。

<ImgView title="CDN 加速" url="https://z.wiki/autoupload/20230205/1IZR.400X1180-image.png" />

### 测试函数

首先使用`shell`编写函数用来测试下载资源所需要的时间。

```shell
# 参数1：URL
# 参数2：循环次数
function download_time_avg() {
  local url="$1"
  local count="$2"
  local total_time=0

  for ((i=0; i<count; i++)); do
    local start_time=$(date +%s.%N)
    curl -o /dev/null -s "$url"
    local end_time=$(date +%s.%N)
    local elapsed_time=$(echo "scale=6; $end_time - $start_time" | bc)
    total_time=$(echo "scale=6; $total_time + $elapsed_time" | bc)
  done

  local avg_time=$(echo "scale=6; $total_time / $count" | bc)
  echo $avg_time
}
```

这个函数使用了`curl`命令下载指定的`URL`，并计算了下载所需的时间。循环指定的次数，累加每次下载所需的时间，最后计算平均时间，并返回结果。可以使用`bc`命令实现浮点数计算。


### 非CDN测速

测试脚本:

```shell
for n in {1..5}
do
  avg=`download_time_avg https://z.wiki/autoupload/20230205/kipU.1154X1742-image.png 20`
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
  avg=`download_time_avg https://1.cdn.z.wiki/autoupload/20230205/kipU.1154X1742-image.png 20`
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
