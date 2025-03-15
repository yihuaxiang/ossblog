---
meta:
  - name: description
    content: CSV 转 JSON 的 JavaScript 实现，提供简单高效的 CSV 数据转换为 JSON 格式的方法
  - name: keywords
    content: JavaScript,CSV,JSON,转换,数据处理,前端开发
tags: ["JavaScript", "CSV", "JSON", "数据处理"]
---

# csv 转 json


实现代码

```JavaScript
const CSVToJSON = (data, delimiter = ',') => {
  const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
  return data
    .slice(data.indexOf('\n') + 1)
    .split('\n')
    .map(v => {
      const values = v.split(delimiter);
      return titles.reduce(
        (obj, title, index) => ((obj[title] = values[index]), obj),
        {}
      );
    });
};
```

效果

```JavaScript
CSVToJSON('col1,col2\na,b\nc,d');
// [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}];
CSVToJSON('col1;col2\na;b\nc;d', ';');
// [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}];
```
