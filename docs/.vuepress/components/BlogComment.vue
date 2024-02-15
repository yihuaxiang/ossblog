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
          style="display: block;width: 100%;border: none; resize: none; outline: none; position: absolute; left: 0px; top: 0px; height: 100%; width: 100%; box-sizing: border-box; color: #b2b2b5; padding: 12px; width: 100%; display: block;"
        id="commentBox"
        placeholder="请输入您的想法～"
        v-model="msg"
        @keydown.ctrl.enter="postComment"
        @keydown.meta.enter="postComment"
      >

      </textarea>
      <button class="btn" @click="postComment">提交</button>
    </div>
    <br>

    <div class="vcount" style="display: block;"><span class="vnum">{{list && list.length || 0}}</span> 评论</div>
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
            <button class="reply" @click="handleReplyClick(item.comment)">
              回复
            </button>
          </div>
          <div class="comment-content" v-html="item.comment">
          </div>
        </template>
      </template>
      <div class="pages">
        <template v-for="pageIndex in totalPage">
          <span class="page" @click="page = pageIndex - 1">{{pageIndex}}</span>
        </template>
      </div>
    </div>
  </div>
</div>

</template>

<script>
const pageSize = 5;
import fetch from 'cross-fetch';
export default {
  name: "BlogComment",
  data() {
    return {
      loading: true,
      list: [],
      msg: '',
      replyContent: '',
      saving: false,
      page: 0,
    }
  },
  mounted() {
  },
  methods: {
    handleReplyClick(comment) {
      console.info('handleReplyClick', comment);
      this.replyContent = comment;

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

      let msg = '';
      if (this.replyContent) {
        msg = `回复:\"${this.replyContent}\"\n\n------------\n\n${this.msg}`
      } else {
        msg = this.msg;
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
            comment: msg,
            url: this.$route.path
          })
        }).then(res => res.json()).finally(() => {
          this.replyContent = null;
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
        this.replyContent = null;
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
      border: none; resize: none; outline: none; position: absolute; left: 0px; top: 0px; height: 100%; width: 100%; box-sizing: border-box; color: #b2b2b5; padding: 12px; width: 100%; display: block;
    }

    .btn {
      position: absolute;
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
      bottom: 12px;
      right: 12px;
      z-index: 2;
      cursor: pointer;

      &:active {
        border-color: #333;
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

