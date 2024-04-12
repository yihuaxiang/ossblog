<template>
<div class="blog-comment">

  <notifications position="top center"/>
  <div class="ctn">
    <div class="reply-info" v-show="replyContent">
      <span class="info">
        回复：
      </span>
      <span class="content" style="" v-html="replyContent">
      </span>
      <span class="close" @click="replyContent = null">X</span>
    </div>
    <div class="form" :class="{saving: saving}">
      <textarea
        class="textarea"
        ref="textarea"
        id="commentBox"
        placeholder="请输入您的想法～，支持粘贴图片。"
        v-model="msg"
        @keydown.ctrl.enter="postComment"
        @keydown.meta.enter="postComment"
      >
      </textarea>
      <div class="emojis" v-show="showEmoji">
        <img alt="smile" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/smile.png" @click="handleClickEmoji"/>
        <img alt="lovely" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/lovely.png" @click="handleClickEmoji"/>
        <img alt="happy" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/happy.png" @click="handleClickEmoji"/>
        <img alt="clap" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/clap.png" @click="handleClickEmoji"/>
        <img alt="whee" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/whee.png" @click="handleClickEmoji"/>
        <img alt="haha" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/haha.png" @click="handleClickEmoji"/>
        <img alt="laugh-and-cry" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/laugh-and-cry.png" @click="handleClickEmoji"/>
        <img alt="wink" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/wink.png" @click="handleClickEmoji"/>
        <img alt="greddy" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/greddy.png" @click="handleClickEmoji"/>
        <img alt="awkward" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/awkward.png" @click="handleClickEmoji"/>
        <img alt="sweat" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/sweat.png" @click="handleClickEmoji"/>
        <img alt="pick-nose" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/pick-nose.png" @click="handleClickEmoji"/>
        <img alt="hum" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/hum.png" @click="handleClickEmoji"/>
        <img alt="angry" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/angry.png" @click="handleClickEmoji"/>
        <img alt="grievance" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/grievance.png" @click="handleClickEmoji"/>
        <img alt="poor" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/poor.png" @click="handleClickEmoji"/>
        <img alt="disappoint" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/disappoint.png" @click="handleClickEmoji"/>
        <img alt="sad" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/sad.png" @click="handleClickEmoji"/>
        <img alt="tear" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/tear.png" @click="handleClickEmoji"/>
        <img alt="no-way" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/no-way.png" @click="handleClickEmoji"/>
        <img alt="shy" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/shy.png" @click="handleClickEmoji"/>
        <img alt="dirt" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/dirt.png" @click="handleClickEmoji"/>
        <img alt="love-you" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/love-you.png" @click="handleClickEmoji"/>
        <img alt="kiss" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/kiss.png" @click="handleClickEmoji"/>
        <img alt="amorousness" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/amorousness.png" @click="handleClickEmoji"/>
        <img alt="longing" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/longing.png" @click="handleClickEmoji"/>
        <img alt="desire" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/desire.png" @click="handleClickEmoji"/>
        <img alt="bad-laugh" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/bad-laugh.png" @click="handleClickEmoji"/>
        <img alt="blackness" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/blackness.png" @click="handleClickEmoji"/>
        <img alt="laugh-without-word" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/laugh-without-word.png" @click="handleClickEmoji"/>
        <img alt="titter" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/titter.png" @click="handleClickEmoji"/>
        <img alt="cool" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/cool.png" @click="handleClickEmoji"/>
        <img alt="not-easy" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/not-easy.png" @click="handleClickEmoji"/>
        <img alt="think" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/think.png" @click="handleClickEmoji"/>
        <img alt="question" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/question.png" @click="handleClickEmoji"/>
        <img alt="no-idea" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/no-idea.png" @click="handleClickEmoji"/>
        <img alt="dizzy" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/dizzy.png" @click="handleClickEmoji"/>
        <img alt="bomb" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/bomb.png" @click="handleClickEmoji"/>
        <img alt="bone" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/bone.png" @click="handleClickEmoji"/>
        <img alt="be-quiet" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/be-quiet.png" @click="handleClickEmoji"/>
        <img alt="shut-up" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/shut-up.png" @click="handleClickEmoji"/>
        <img alt="stupid" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/stupid.png" @click="handleClickEmoji"/>
        <img alt="surprise" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/surprise.png" @click="handleClickEmoji"/>
        <img alt="vomit" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/vomit.png" @click="handleClickEmoji"/>
        <img alt="cold" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/cold.png" @click="handleClickEmoji"/>
        <img alt="sick" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/sick.png" @click="handleClickEmoji"/>
        <img alt="bye" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/bye.png" @click="handleClickEmoji"/>
        <img alt="look-down-on" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/look-down-on.png" @click="handleClickEmoji"/>
        <img alt="white-eye" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/white-eye.png" @click="handleClickEmoji"/>
        <img alt="left-hum" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/left-hum.png" @click="handleClickEmoji"/>
        <img alt="right-hum" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/right-hum.png" @click="handleClickEmoji"/>
        <img alt="crazy" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/crazy.png" @click="handleClickEmoji"/>
        <img alt="scold" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/scold.png" @click="handleClickEmoji"/>
        <img alt="hit-on-face" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/hit-on-face.png" @click="handleClickEmoji"/>
        <img alt="wow" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/wow.png" @click="handleClickEmoji"/>
        <img alt="fan" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/fan.png" @click="handleClickEmoji"/>
        <img alt="money" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/money.png" @click="handleClickEmoji"/>
        <img alt="yawn" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/yawn.png" @click="handleClickEmoji"/>
        <img alt="sleepy" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/sleepy.png" @click="handleClickEmoji"/>
        <img alt="sleep" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/sleep.png" @click="handleClickEmoji"/>
        <img alt="watermelon" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/watermelon.png" @click="handleClickEmoji"/>
        <img alt="doge" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/doge.png" @click="handleClickEmoji"/>
        <img alt="dog" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/dog.png" @click="handleClickEmoji"/>
        <img alt="cat" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/cat.png" @click="handleClickEmoji"/>
        <img alt="thumb" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/thumb.png" @click="handleClickEmoji"/>
        <img alt="good" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/good.png" @click="handleClickEmoji"/>
        <img alt="ok" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/ok.png" @click="handleClickEmoji"/>
        <img alt="yeah" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/yeah.png" @click="handleClickEmoji"/>
        <img alt="shack-hand" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/shack-hand.png" @click="handleClickEmoji"/>
        <img alt="bow" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/bow.png" @click="handleClickEmoji"/>
        <img alt="come" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/come.png" @click="handleClickEmoji"/>
        <img alt="punch" class="icon" src="https://z.wiki/autoupload/20240216/etef.emoji.zip/emoji/punch.png" @click="handleClickEmoji"/>
      </div>
      <div class="btns">
        <button class="emoji" @click="showEmoji = !showEmoji">
          <img class="icon" src="https://z.wiki/autoupload/20240216/EFwK.%E8%A1%A8%E6%83%85_%281%29.svg" />
        </button>
        <button class="btn" @click="postComment">提交</button>
      </div>
    </div>
    <br>

    <div id="comment-list" class="vcount" style="display: block;"><span class="vnum">{{list && list.length || 0}}</span> 评论</div>
    <br>

    <div class="vcards">
      <template v-if="loading">
        <div class="loading">加载中...</div>
      </template>
      <template v-else>
        <template v-for="item in pageList">
          <div class="comment-detail" :key="item.id" :id="item.id">
            <div class="avatar">
              <img src="https://z.wiki/autoupload/20240209/jZRq.avatar.svg" width="50" height="50" />
            </div>
            <div class="infos">
              <div class="first-line">
                <span class="name">
                  {{item.nick}}
                </span>
                <span class="ua">
                  {{item.platform || ''}}
                  {{item.browser || ''}}
                  {{item.version || ''}}
                </span>
              </div>
              <div class="second-line">
                <span class="time">{{item.time}}</span>
              </div>
            </div>
            <button class="reply" @click="handleReplyClick(item.comment, item.id)">
              回复
            </button>
          </div>
          <div class="comment-content" v-if="item.replyComment">
            <div class="rpl-d" style="white-space: normal;">
              <span style="color: #ef2f11;">回复</span> <span class="nick">{{item.replyComment.nick}}</span>：<span class="d--" v-html="item.replyComment.comment"></span>
            </div>
            <div class="comment" v-html="item.comment">

            </div>
          </div>
          <div class="comment-content" v-else v-html="item.comment">
          </div>
        </template>
      </template>
      <div class="pages">
        <template v-for="pageIndex in totalPage">
          <span 
            class="page" 
            @click="page = pageIndex - 1"
            :class="{active: page == pageIndex - 1}"
          >
            {{pageIndex}}
          </span>
        </template>
      </div>
    </div>
  </div>
</div>

</template>

<script>
const pageSize = 5;
import fetch from 'cross-fetch';
import axios from "axios";
export default {
  name: "BlogComment",
  data() {
    return {
      loading: true,
      list: [],
      msg: '',
      replyContent: '',
      replyId: null,
      saving: false,
      page: 0,
      showEmoji: false
    }
  },
  mounted() {
    console.info('mounted')
    this.initEvent();
  },
  methods: {
    postFile: (file, onUploadProgress) => {
      const reader = new FileReader(); // 创建读取文件对象
      reader.readAsDataURL(file); // 发起异步请求，读取文件
      reader.onload = function () {  // 文件读取完成后
        // 读取完成后，将结果赋值给img的src
      };
      const formData = new FormData();  // 创建一个formdata对象
      formData.append('file', file);
      formData.append('fileName', file.name);
      formData.append('uid', "from-comment");
      return axios.request({
        method: 'post',
        url: 'https://playground.z.wiki/img/upload',
        data: formData,
        onUploadProgress: (p) => {
          const percent = Math.floor(p.loaded / (p.total || 0) * 100);
          console.info('percent is', percent);
          onUploadProgress && onUploadProgress(percent);
        }
      }).then(res => {
        console.log("upload.then");
        const record = res.data;
        const url = record.url;
        console.info('url is ', url);
        return url;
      }).catch(error => {
        console.warn("upload.catch", error);
      })
    },
    initEvent() {
      console.info('initEvent', this.$refs.textarea);
      const textarea = this.$refs.textarea;

      const handlePaste = async (event) => {
        const items = (event.clipboardData).items || [];
        console.info('items is', items);
        if (items && items[0].kind == 'string') {
          // 粘贴文本，无需处理
        } else if(items.length > 1 && items[0].kind != 'string') {
          // 选择了多个文件
          const files = [...items].map((item) => {
            return item.getAsFile();
          })
          for(const file of files) {
            await new Promise(async (resolve) => {
              if(file) {
                try {
                  const result = await this.postFile(file, (percent) => {
                  }).catch(() => {});
                  this.msg += ` ${result} `
                  console.info('upload result is ', result, textarea);
                  resolve(true);
                } catch(e) {
                  console.error(e);
                  resolve(true);
                }
              }
            })
          }
        } else if(items.length > 0) {
          for(const item of items) {
            console.info('item is ', item, items.length);
            await new Promise(async (resolve) => {
              const file = item && item.getAsFile();
              if(file) {
                try {
                  const result = await this.postFile(file, (percent) => {
                  }).catch(() => {});
                  this.msg += ` ${result} `
                  console.info('upload result is ', result, textarea);
                  resolve(true);
                } catch(e) {
                  console.error(e);
                  resolve(true);
                }
              }
            })
            console.info('upload done', items.length);
          }
        }
      }

      textarea.addEventListener('paste', handlePaste);
    },
    handleClickEmoji(e) {
      console.info(e.target);
      const dom = e.target;
      const alt = dom.alt;
      this.msg = this.msg + ` :${alt}: `
    },
    clearReply() {
      this.replyContent = null;
      this.replyId = null;
    },
    handleReplyClick(comment, id) {
      console.info('handleReplyClick', comment);
      this.replyContent = comment;
      this.replyId = id;

      document.querySelector('#commentBox').focus();
      document.querySelector('#commentBox').scrollIntoView({
        behavior: "smooth",
        block: 'center'
      })
    },
    postComment() {
      if (!this.msg || this.msg.trim() == '') {
        this.$notify({
          type: 'error',
          text: '内容不能为空哟'
        })

        return;
      }

      this.$notify({
        type: 'info',
        text: '提交中'
      })
      this.saving = true;
      if (typeof fetch != undefined) {
        fetch(`https://playground.z.wiki/comment/post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf8',
          },
          body: JSON.stringify({
            comment: this.msg,
            url: this.$route.path,
            replyId: this.replyId,
          })
        }).then(res => res.json()).finally(() => {
          this.clearReply();
          this.$notify({
            type: 'success',
            text: '提交成功'
          })
          this.query();
          this.msg = '';
          this.saving = false;
        })
      }
      console.info('postComment', this.msg);
    },
    query() {
      this.page = 0;
      const path = this.$route.path;

      if (typeof fetch != undefined) {
        try {
          this.loading = true;
          fetch(`https://playground.z.wiki/comment/list?path=${encodeURIComponent(path)}`)
            .then(res => res.json()).then(info => {
              this.list = info;
              this.loading = false;
          })
        } catch(e) {
          console.warn('failed to fetch accumulation', e);
          this.list = [];
          this.loading = false;
        }
      }
    }
  },
  computed: {
    pageList() {
      return (this.list || []).slice(this.page * pageSize, this.page * pageSize + pageSize);
    },
    totalPage() {
      const fullList = this.list || [];
      return Math.ceil(fullList.length / pageSize);
    }
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler: function() {
        this.query();
        this.clearReply();
      }
    }
  }
}
</script>

<style scoped>
.blog-comment {
  .ctn {
    margin: 0 14px;
    padding: 14px 40px 32px;

    .reply-info {
      font-size: 14px;
      color: #b2b2b5;
      padding-bottom: 5px;
      display: flex;

      .info {
        white-space: nowrap;
      }

      .content{
        flex-grow: 1;
      }

      .close {
        padding-left: 10px;
        padding-right: 10px;
        cursor: pointer;
      }
    }
  }
  .vcount {
    padding: 5px;
    font-weight: 600;
    font-size: 1.25em;
  }
  .vcards {
    padding-left: 20px;

    .avatar > img {
      border-radius: 50%;
      overflow: hidden;
    }

    .comment-detail {
      display: flex;
      white-space: nowrap;

      .infos {
        overflow: hidden;
        padding-left: 12px;
        padding-top: 6px;
        flex-shrink: 1;
        .first-line {
          display: flex;
        }
        .name {
          font-size: .875em;
          font-weight: 500;
          margin-right: 0.875em;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
        }
        .ua {
          color: #929298;
          display: inline-block;
          padding: 0.2em 0.5em;
          font-size: .75em;
          border-radius: 0.2em;
          margin-right: 0.3em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .time {
          font-size: .75em;
          margin-right: 0.875em;
          color: #929298;
        }
      }
    }
  }
  .comment-content {
    padding-left: 62px;
    font-size: 14px;
    color: #b2b2b5;
    border-bottom: 1px dashed #f5f5f5;
    padding-bottom: 0.5em;
    margin-bottom: 12px;
    white-space: break-spaces;

    overflow: hidden;
    text-overflow: ellipsis;
  }

  .form {
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    margin-bottom: 10px;
    overflow: hidden;
    position: relative;
    padding: 10px;
    border-color: #b2b2b5;
    min-height: 50px;

    position: relative;

    .textarea {
      border: none;
      resize: none;
      outline: none;
      left: 0px;
      top: 0px;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      color: #b2b2b5;
      padding: 12px;
      padding-left: 0px;
      padding-top: 0px;
      width: 100%;
      display: block;

    }

    .emojis {
      img {
        width: 27px;
        height: 27px;
      }
    }
    .btns {
      background: white;
      position: absolute;
      bottom: 12px;
      right: 12px;
      display: flex;
      align-items: center;

      .emoji {
        border: none;
        cursor: pointer;
        background-color: rgba(0,0,0,0);
        line-height: 0px;
        padding: 0px;

        .icon {
          width: 24px;
          height: 24px;
        }
      }
      .btn {
        margin-left: 5px;
        color: #b2b2b5;
        border-color: #b2b2b5;
        transition-duration: .4s;
        text-align: center;
        color: #555;
        border: 1px solid #ededed;
        border-radius: 0.3em;
        display: inline-block;
        background: transparent;
        height: 24px;
        margin-bottom: 0;
        font-weight: 400;
        vertical-align: middle;
        z-index: 2;
        cursor: pointer;

        &:active {
          border-color: #333;
        }
      }
    }

    &.saving {
      &::after {
        content: '提交中';
        position: absolute;
        z-index: 3;
        left: 0px;
        top: 0px;
        height: 100%;
        width: 100%;
        background: #c3c3c39c;
        text-align: center;
        line-height: 60px;
      }
    }
  }

  .reply {
    color: #b2b2b5;
    border-color: #b2b2b5;
    transition-duration: .4s;
    text-align: center;
    color: #555;
    border: 1px solid #ededed;
    border-radius: 0.3em;
    display: inline-block;
    background: transparent;
    margin-bottom: 0;
    font-weight: 400;
    vertical-align: middle;
    bottom: 12px;
    right: 12px;
    z-index: 2;
    cursor: pointer;
    margin-top: 10px;
    height: 24px;
    display: block;

    margin-left: auto;
  }

  .pages {
    display: flex;
    padding-left: 55px;

    .page {
       display: inline-block;
       cursor: pointer;
       padding-left: 5px;
       padding-right: 5px;
       padding-bottom: 2px;
       padding-top: 2px;
       color: #555;
       border: 1px solid #ededed;
       border-radius: 4px;
       margin-left: 5px;
       margin-right: 5px;
       font-size: 14px;

       &.active {
         border-color: #ccc;
       }
    }
  }
}
</style>
<style>
@media screen and (max-width: 500px) {
  .blog-comment{
    padding-left: 0px;

    .ctn {
      padding-left: 10px !important;
      padding-right: 10px !important;
      margin-left: 7px !important;
      margin-right: 7px !important;
    }
  }
}
@media screen and (min-width: 500px) and (max-width: 720px) {
  .blog-comment{
    padding-left: 261px;
  }
}
@media screen and (min-width: 721px) and (max-width: 960px) {
  .blog-comment{
    padding-left: 261px;
  }
}
@media screen and (min-width: 960px) and (max-width: 9999px) {
  .blog-comment{
    padding-left: 319px;
  }
}
</style>
<style>
#valine-vuepress-comment {
  display: none !important;
}
</style>


