# 逆地理


根据坐标获取道路名称：

```shell
curl -s "https://restapi.amap.com/v3/geocode/regeo?output=json&location=116.310003,39.991957&key=xxx&radius=1000&extensions=all" | jq . | grep "name" | head -1 | awk -F ":" '{print $2}' | sed 's/"//g' | sed 's/,//g' 
```

注1：`Mac` 系统安装`GNU`版的`curl`

注2：`xxx`需替换，请自动去 [高德地图 LBS](https://lbs.amap.com/) 注册
