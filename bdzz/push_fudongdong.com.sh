#!/bin/bash

curl -H 'Content-Type:text/plain' --data-binary @fudongdong_urls.txt "http://data.zz.baidu.com/urls?site=https://z.wiki&token=${1}"
