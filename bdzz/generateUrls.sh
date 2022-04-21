#!/bin/bash

cd ./docs
find . -name "*.md" ! -path "*node_modules*" | sed 's/\.md/\.html/g' | sed 's/\.\//https:\/\/z.wiki\//g'   > ../bdzz/fudongdong_urls.txt
find . -name "*.md" ! -path "*node_modules*" | sed 's/\.md/\.html/g' | sed 's/\.\//https:\/\/weizeling.com\//g'   > ../bdzz/weizeling_urls.txt
cd ..
