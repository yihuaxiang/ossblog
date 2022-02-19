#!/bin/bash

curl -H 'Content-Type:text/plain' --data-binary @urls.txt "http://data.zz.baidu.com/urls?site=https://fudongdong.com&token=${1}"
