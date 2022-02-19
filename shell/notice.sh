#!/bin/bash

curl "https://oapi.dingtalk.com/robot/send?access_token=${1}" -H 'Content-Type: application/json' -d '{"msgtype": "text","text": {"content":"ossblog-'${2}'"}}'
