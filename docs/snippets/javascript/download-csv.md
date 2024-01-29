# 前端导出CSV文件


实现代码

```JavaScript
import lodash from 'lodash';

/**
 * 将 JSON 数据导出为 CSV 文件
 * @param jsonArray
 * @param keyMap
 */
export function downloadToCsv(jsonArray: object[], keyMap: object, fileName = '下载') {
  // \uFEFF 是为解决中文乱码问题
  let csvContent = 'data:text/csv;charset=utf-8,\uFEFF';

  if (jsonArray && jsonArray.length) {
    const keys = lodash.uniq(
      lodash.flatten(
        jsonArray.map((rowData) => {
          return Object.keys(rowData);
        }),
      ),
    );
    jsonArray.forEach((rowData: any, index: number) => {
      if (index == 0) {
        // 第一行，保存字段头信息
        const headerRow = keys
          .map((key) => {
            return (keyMap && keyMap[key]) || key;
          })
          .join(',');
        csvContent += `${headerRow}\r\n`;
      }
      const row = keys
        .map((key) => {
          const converter = keyMap['_' + key];
          if (converter) {
            // _ 开头的是转换函数，用于将英文、数字等转换成中文
            return converter(lodash.get(rowData, key, '') + '' ?? '');
          } else {
            console.info('no converter', key);
            return JSON.stringify(lodash.get(rowData, key, '') ?? '');
          }
        })
        .join(',');
      csvContent += `${row}\r\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const a = document.createElement('a');
    a.href = encodedUri;
    a.target = '_blank';
    a.download = `${fileName}.csv`;
    a.click();
  } else {
    console.error('无数据，无法下载');
  }
}

```

使用方法

```JavaScript
    downloadToCsv(dataWithTaskContent, {
      taskName: '任务名称',
      status: '任务状态',
      _status: (s) => { // _status 方法用于将枚举值转换成中文
        return {0: '进行中', 1: '已完成'}[s]
      },
      startDate: '任务开始时间',
      endDate: '任务结束时间',
      gmtCreate: '任务创建时间',
    });
```
