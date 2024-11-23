---
meta:
  - name: description
    content: 全面介绍 JSONPath 的语法规则与查询技巧，涵盖基本表达式、数组查询、条件过滤等操作。通过丰富的实例讲解，帮助开发者快速掌握 JSON 数据查询与调试的最佳实践。
  - name: keywords
    content: JSONPath 教程,JSONPath 语法,JSON 查询,JSON 数据查询,JSONPath 使用案例,JSONPath 实例,JSON 数据调试
---

# JSONPath 使用总结

### 什么是 JSONPath？
**JSONPath** 是一种用于查询 JSON 数据的表达式语言，类似于 XPath 用于 XML。通过 JSONPath，可以轻松提取 JSON 数据中的特定字段。

### JSONPath 的主要功能
1. **提取单个字段**  
2. **提取数组中的特定元素**  
3. **条件过滤**  
4. **组合查询**  

### 基本语法
| JSONPath 语法      | 描述                                |
|--------------------|-------------------------------------|
| `$`                | 根节点                              |
| `.` 或 `[]`        | 子节点                              |
| `..`               | 递归搜索                            |
| `*`                | 通配符                              |
| `[index]`          | 数组索引                            |
| `[start:end]`      | 数组切片                            |
| `[?(@.key==value)]`| 条件过滤                            |

### 示例 JSON 数据
以下是一个示例 JSON 数据：

```json
{
  "store": {
    "book": [
      { "category": "fiction", "price": 10 },
      { "category": "science", "price": 15 },
      { "category": "math", "price": 20 }
    ],
    "bicycle": {
      "color": "red",
      "price": 100
    }
  }
}
```

### JSONPath 使用示例

#### 1. 提取字段值
##### 代码：
```java
String json = "{...}"; // 示例 JSON 数据
JSONObject jsonObject = JSON.parseObject(json);

// 提取 bicycle 的 color
String color = (String) JSONPath.eval(jsonObject, "$.store.bicycle.color");
System.out.println(color); // 输出：red
```
##### JSONPath 表达式：
`$.store.bicycle.color`

#### 2. 提取数组中的特定元素
##### 代码：
```java
// 提取 book 数组的第一个元素
JSONObject firstBook = (JSONObject) JSONPath.eval(jsonObject, "$.store.book[0]");
System.out.println(firstBook); // 输出：{"category":"fiction","price":10}
```
##### JSONPath 表达式：
`$.store.book[0]`

#### 3. 条件过滤
##### 代码：
```java
// 提取价格高于15的书籍
JSONArray expensiveBooks = (JSONArray) JSONPath.eval(jsonObject, "$.store.book[?(@.price > 15)]");
System.out.println(expensiveBooks); 
// 输出：[{"category":"math","price":20}]
```
##### JSONPath 表达式：
`$.store.book[?(@.price > 15)]`

#### 4. 使用通配符提取所有子节点
##### 代码：
```java
// 提取 store 下的所有值
JSONArray values = (JSONArray) JSONPath.eval(jsonObject, "$.store.*");
System.out.println(values);
// 输出：[[{"category":"fiction","price":10}, ... ], {"color":"red","price":100}]
```
##### JSONPath 表达式：
`$.store.*`

#### 5. 数组切片
##### 代码：
```java
// 提取 book 数组中的前两本书
JSONArray firstTwoBooks = (JSONArray) JSONPath.eval(jsonObject, "$.store.book[0:2]");
System.out.println(firstTwoBooks); 
// 输出：[{"category":"fiction","price":10}, {"category":"science","price":15}]
```
##### JSONPath 表达式：
`$.store.book[0:2]`

### JSONPath 使用场景
1. **数据提取**：从复杂 JSON 中快速提取指定字段值。
2. **数据转换**：将提取的数据作为其他操作的输入。
3. **条件过滤**：筛选符合条件的数据。

### 总结
FastJSON 的 JSONPath 是一种强大的工具，能高效处理复杂 JSON 数据。无论是提取单个字段还是筛选特定数组元素，它都能让开发者事半功倍。


### 在线体验

[JSONPath 在线演示工具](https://z.wiki/jsonpath/index.html)

