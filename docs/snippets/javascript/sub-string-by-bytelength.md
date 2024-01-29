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
