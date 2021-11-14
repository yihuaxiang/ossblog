#!/bin/bash

cd ./docs
find . -name "*.md" ! -path "*node_modules*" | sed 's/\.md/\.html/g' | sed 's/\.\//https:\/\/fudongdong.com\//g'   > ../bdzz/urls.txt
cd ..

