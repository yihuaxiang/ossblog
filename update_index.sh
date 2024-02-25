#!/bin/bash


cd docs

echo "" > change_index

# 找到当前目录及所有子目录下的 .md 文件
find . -name '*.md' -print0 | while IFS= read -r -d $'\0' file; do
    # 提取文件的一级标题，假设标题以 # 开头
    title=$(sed -n '/^# /{s/^# //;p;q;}' "$file")

    # 读取文件内容，使用一个工具如 cat 或者 sed 来获取文件完整内容
    # 根据需要清洗文件内容，使其适合作为 HSET 的值
    # 注意: 如果内容包含特殊字符（如引号），你需要适当地转义它们
    content=$(cat "$file" | sed ':a;N;$!ba;s/\n/\\n/g' | sed 's/"/\\"/g' | sed -E 's/^#+//' | sed 's/[[:space:]]\{1,\}/ /g')

    # 生成文件路径（移除'./'前缀并替换空格为'-'）
    file_path=$(echo "$file" | sed 's/^.\///' | sed 's/ /-/g' | sed 's/\.md//' | sed 's/README/index/')
    curl "https://playground.z.wiki/comment/list?path=/${file_path}.html" -o tmp.file
    comments=$(cat tmp.file | jq . | grep comment | awk -F '"comment"' '{print $2}')
    comments=$(echo "$comments" | sed ':a;N;$!ba;s/\n/\\n/g' | sed 's/"/\\"/g' | sed 's/\\\\"/\\"/g' | sed 's/[[:space:]]\{1,\}/ /g')
    content="${content}${comments}"
    

    echo $content
    # 输出 HSET 命令
    echo "HSET blogs:https://z.wiki/${file_path}.html title \"$title\" content \"$content\"" >> change_index
    echo ${file_path}
done


redis-cli -p 6378 < change_index


echo update index for playground.z.wiki

curl https://playground.z.wiki/link/getLinksForSearch > change_playground_index
redis-cli -p 6378 < change_playground_index
