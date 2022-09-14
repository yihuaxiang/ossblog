<template>
<div class="last-post">
  <h2>最近更新</h2>

  <ul>
    <template v-for="(article, index) in topArticles">
      <li :key="article.path + index">
        <div style="margin-right: 20px; display: flex; justify-content: space-between;">
          <a :href="article.path" @click.prevent="pushRoute(article.path)">{{article.title}}</a>
          <div style="display: flex; align-items: center; font-size: 12px; color: rgba(0, 0, 0, 0.54); font-weight: 200;">

            <span>{{getDate(article.createTime)}}</span>
          </div>
        </div>
      </li>
    </template>

  </ul>


</div>
</template>

<script>
/*
** 时间戳显示为多少分钟前，多少天前的处理
** eg.
** console.log(dateDiff(1411111111111));  // 2014年09月19日
** console.log(dateDiff(1481111111111));  // 9月前
** console.log(dateDiff(1499911111111));  // 2月前
** console.log(dateDiff(1503211111111));  // 3周前
** console.log(dateDiff(1505283100802));  // 1分钟前
*/
var dateDiff = function (timestamp) {
  // 补全为13位
  var arrTimestamp = (timestamp + '').split('');
  for (var start = 0; start < 13; start++) {
    if (!arrTimestamp[start]) {
      arrTimestamp[start] = '0';
    }
  }
  timestamp = arrTimestamp.join('') * 1;

  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - timestamp;

  // 如果本地时间反而小于变量时间
  if (diffValue < 0) {
    return '不久前';
  }

  // 计算差异时间的量级
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;

  // 数值补0方法
  var zero = function (value) {
    if (value < 10) {
      return '0' + value;
    }
    return value;
  };

  // 使用
  if (weekC >= 1) {
    return (function () {
      var date = new Date(timestamp);
      return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
    })();
  } else if (dayC >= 1) {
    return parseInt(dayC) + "天前";
  } else if (hourC >= 1) {
    return parseInt(hourC) + "小时前";
  } else if (minC >= 1) {
    return parseInt(minC) + "分钟前";
  }
  return '刚刚';
};

const lodash = require('lodash');

export default {
  name: "LastPost",
  props: {
    number: {
      type: Number,
      required: false,
      default: 10
    },
    prefix: {
      type: String,
      required: false,
      default: undefined
    }
  },
  filters: {
    timeDiff(timestamp) {
      return dateDiff(timestamp);
    }
  },
  methods: {
    getDate(datetime) {
      const idx = datetime.indexOf(' ');
      return datetime.slice(0, idx);
    },
    pushRoute(path) {
      console.info('pushRoute', path);
      this.$router.push({
        path
      });
    }
  },
  mounted() {
  },
  computed: {
    topArticles() {
      let pages = this.$site.pages;
      return lodash.sortBy(pages.filter(p => p.path.endsWith('.html')).filter(p => {
        if(!this.prefix) {
          return true;
        } else {
          return p.path.startsWith(this.prefix);
        }
      }), 'lastUpdatedTimestamp').reverse().slice(0, this.number);
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">

</style>
