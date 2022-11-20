<template>
<div class="css-to-jss">
  <div class="wrapper">
    <table style="width: 100%;">
      <tbody>
      <tr>
        <th style="width: 45%;">CSS</th>
        <th style="width: 10%; font-size: 22px;">→</th>
        <th style="width: 45%;">JSS</th>
      </tr>
      </tbody>
    </table>
    <table>
      <tbody>
      <tr>
        <td style="width: 50%;">
          <textarea class="code code--input" placeholder="font-size: 18px;
line-height: 24px;
color: red;" @keydown="handleInputChange"></textarea>
        </td>
        <td style="width: 50%; position: relative;">
          <button class="copy" @click="handleCopy">复制</button>
          <textarea class="code code--output" readonly="">{{jss || `{
  "fontSize": "18px",
  "lineHeight": "24px",
  "color": "red"
}`}}</textarea>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
const lodash = require('lodash');
export default {
  name: "CssToJss",
  data() {
    return {
      jss: null
    }
  },
  methods: {
    handleCopy() {
      navigator.clipboard.writeText(url).then(() => {
        this.$notify({
          type: 'success',
          text: '已复制。'
        })
      });
    },
    handleInputChange: lodash.debounce(function(e) {
      console.info('handleInputChange', e);
      fetch(`https://playground.z.wiki/css-to-jss?style=${encodeURIComponent(e.target.value)}`).then(res => res.json()).then(data => {
        this.jss = JSON.stringify(data, null, 2);
      })
    }, 500)
  }
}
</script>

<style scoped>
.css-to-jss {

}

table {
  margin: 0px;
}
tbody {
  display: table;
  width: 100%;
}

th {
  padding: 15px;
  background: #375eab;
  text-align: center;
  color: #fff;
  font-size: 20px;
  line-height: 17.5px;
  border: 0px;
}
td {
  padding: 0px;
}

.code {
  -o-box-sizing: border-box;
  box-sizing: border-box;
  white-space: pre;
  width: 100%;
  display: block;
  padding: 3%;
  font: 14px/1.5em "Consolas","Menlo","Monaco","Courier New",monospace;
  font-weight: 550;
  outline: none;
  border: none;
  resize: none;
  height: 65vh;
  overflow: scroll;
  -moz-tab-size: 4;
  tab-size: 4;
}
.code--input {
  background: #ecf2f5;
}
.code--output {
  background: #e0ebf5;
}

.copy {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background: #d7d7d7;
  color: #2c3f51;
  border: none;
  padding: 2px 12px;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.copy:hover {
  opacity: 1;
}

</style>
