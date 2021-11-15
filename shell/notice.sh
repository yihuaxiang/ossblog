#!/bin/bash

curl 'https://oapi.dingtalk.com/robot/send?access_token=f93673e87c1b2e8077842fde58b019cea20bd41ec2b7ad3acb7fbceb80984934' -H 'Content-Type: application/json' -d '{"msgtype": "text","text": {"content":"ossblog-'${1}'"}}'
