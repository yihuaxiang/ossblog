#!/bin/bash

curl -H 'Content-Type:text/plain' --data-binary @weizeling_urls.txt "http://data.zz.baidu.com/urls?site=https://weizeling.com&token=${1}"
