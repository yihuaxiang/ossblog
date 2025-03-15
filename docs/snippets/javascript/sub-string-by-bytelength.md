---
meta:
  - name: description
    content: 按字节长度截取字符串，处理中英文混合字符串按字节长度截取的方法
  - name: keywords
    content: JavaScript,字符串,截取,字节长度,中文,英文,混合字符串
tags: ["JavaScript", "字符串处理", "字节长度"]
---

# 按字节长度截取字符串


按字节长度截取字符串

```JavaScript
function sub_string(str, len){
  var newLength = 0;
  var newStr = "";
  var chineseRegex = /[^\x00-\xff]/g;
  var singleChar = "";
  var strLength = str.replace(chineseRegex,"**").length;
  for(var i = 0;i < strLength;i++) {
      singleChar = str.charAt(i).toString();
      if(singleChar.match(chineseRegex) != null) {
          newLength += 2;
      } else  {
          newLength++;
      }
      if(newLength > len) {
          break;
      }
      newStr += singleChar;
  }
  return newStr;
}
```
