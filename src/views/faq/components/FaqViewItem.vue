<template>
  <div class="faq-view-item-container">
    <div class="left-warpper">
      <div class="thumb">
        <q-btn
          @click="handleThumbUp(faq.id, 'question')"
          size="mini"
          icon="el-icon-arrow-up"
          type="text"
        />
        <span>{{ faq.ticketCount }}</span>
        <q-btn
          @click="handleThumbDown(faq.id, 'question')"
          size="mini"
          icon="el-icon-arrow-down"
          type="text"
        />
      </div>
      <span
        v-if="place === 'comment'"
        v-loading="adoptLoading"
        @click="handleAdopt(faq.id, faq.answerFlag)"
        class="adopt"
      >
        <svg-icon
          :icon-class="
            faq.answerFlag === '1' || faq.answerFlag === 1
              ? 'tdc-adopted'
              : 'tdc-not-adopted'
          "
          class-name="icon-btn"
        />
      </span>
    </div>
    <div class="right-warpper">
      <md-editor-view :md-content="faq.content" />
      <div :class="{ 'only-author': place === 'text' }" class="footer">
        <div v-if="place === 'comment'">
          <q-btn
            @click="handleReply"
            size="mini"
            icon="el-icon-chat-dot-round"
            type="text"
            >回复</q-btn
          >
          <q-btn
            v-if="faq.author"
            @click="handleEdit"
            size="mini"
            icon="el-icon-edit"
            type="text"
            >编辑</q-btn
          >
          <q-btn
            v-if="faq.author"
            @click="handleDelComment"
            size="mini"
            icon="el-icon-delete"
            type="text"
            >删除</q-btn
          >
        </div>
        <router-link
          :to="{ name: 'space', params: { id: faq.userId } }"
          class="author-info"
        >
          <img :src="faq.userAvatarUrl" alt="头像" width="30px" />
          <div class="meta">
            <p>{{ faq.userName }}</p>
            <p>{{ faq.updateTime }}</p>
          </div>
        </router-link>
      </div>
      <div v-if="commentShow">
        <div v-for="(item, index) in replys" :key="index" class="reply-item">
          <div class="editor-view">
            <md-editor-view :md-content="item.content" ref="editorView" />
          </div>
          <div class="icons-operate">
            <div @click="handleReplyTo(item.id, item.userName)">
              <svg-icon icon-class="tdc-reply" class-name="icon-btn" />
            </div>
            <div @click="handleDeleteReply(item.id)">
              <svg-icon icon-class="tdc-delete" class-name="icon-btn" />
            </div>
          </div>
        </div>
        <div class="reply-warpper">
          <q-form
            ref="replyForm"
            :model="reply"
            :rules="rules"
            label-width="0px"
          >
            <q-form-item prop="content" size="medium">
              <tdf-md-editor
                :config="config"
                :init-md-content="reply.content"
                ref="editor"
              />
            </q-form-item>
          </q-form>
          <q-btn
            :loading="addLoading"
            @click="addReply"
            size="mini"
            icon="el-icon-s-comment"
            type="primary"
            >回复</q-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  adopt,
  thumbup,
  getReply,
  addReply,
  delReply,
  delAnswer,
} from '@/api/faq'

export default {
  name: 'FaqViewItem',

  props: {
    faq: {
      type: Object,
      required: true,
    },
    place: {
      type: String,
      required: true,
      validator: function (value) {
        return ['text', 'comment'].indexOf(value) !== -1
      },
      default: 'comment',
    },
    questionAuthor: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      commentShow: false,
      config: {
        width: '100%',
        height: '70',
        unwatch: true,
        autoFocus: false,
        toolbarIcons: [],
        toolbar: false,
        placeholder:
          '使用评论询问更多信息或提出修改意见，请不要再评论里回答问题',
      },
      replys: [],
      reply: {
        answerId: undefined,
        baseUrl: undefined,
        baseUrlState: undefined,
        citeReplyId: undefined,
        content: undefined,
        createTime: undefined,
        deleteFlag: undefined,
        id: undefined,
        postId: undefined,
        updateTime: undefined,
        userId: undefined,
        userName: undefined,
        userUrl: undefined,
        userUrlState: undefined,
      },
      adoptLoading: false,
      replyLoading: false,
      addLoading: false,

      replyText: '回复',
      replyColon: ':',
    }
  },
  methods: {
    handleThumbUp(id) {
      thumbup({ id, state: '1' }).then((response) => {
        if (response.data) {
          this.$emit('refresh-content')
        } else {
          this.$q.notify('只能点赞一次')
        }
      })
    },
    handleThumbDown(id) {
      thumbup({ id, state: '0' }).then((response) => {
        if (response.data) {
          this.$emit('refresh-content')
        } else {
          this.$q.notify('做人留一线，日后好相见，只能点踩一次哦')
        }
      })
    },
    handleAdopt(answerId, state) {
      if (this.questionAuthor) {
        this.adoptLoading = true
        adopt({ answerId, state: Number(!state) })
          .then(() => {
            this.$emit('refresh-content')
          })
          .catch(() => {})
          .finally(() => {
            this.adoptLoading = false
          })
      }
    },
    handleReply() {
      this.commentShow = !this.commentShow
      if (this.commentShow && !this.replyLoading) {
        this.getReply()
      }
    },
    getReply() {
      this.replyLoading = true
      getReply({ id: this.faq.id })
        .then((response) => {
          this.replys = response.data.replyList
          this.replys.forEach((item) => {
            item.content = `${item.userName}: ${item.content}`
          })
        })
        .finally(() => {
          this.replyLoading = false
        })
    },
    dealWithReply(content) {
      // renturn ‘回复谁谁谁:’
      const isReply = content.indexOf(this.replyText)
      if (isReply === -1) {
        return ['', content]
      } else {
        const colonIndex = content.indexOf(this.replyColon)
        const headText = content.slice(0, colonIndex + 1)
        content = content.slice(colonIndex + 1, content.length)
        return [headText, content]
      }
    },
    addReply() {
      this.reply.content = this.$refs.editor.getValue()
      let [replyHead, content] = this.dealWithReply(this.reply.content) // 为了下面的校验，去掉添加上的‘回复谁谁谁：’
      this.reply.content = content
      this.reply.content = replyHead + this.reply.content // 校验过了再加回来
      this.addLoading = true
      this.reply.answerId = this.faq.id
      addReply(this.reply)
        .then(() => {
          this.getReply()
          this.$refs.editor.setValue('')
        })
        .catch(() => {})
        .finally(() => {
          this.addLoading = false
        })
      // this.$refs.replyForm.validate(valid => {
      //   if (valid) {
      //     this.reply.content = replyHead + this.reply.content // 校验过了再加回来
      //     this.addLoading = true
      //     this.reply.answerId = this.faq.id
      //     addReply(this.reply).then(() => {
      //       this.getReply()
      //       this.$refs.editor.setValue('')
      //     }).catch(() =>{
      //     }).finally(() => {
      //       this.addLoading = false
      //     })
      //   }
      // })
    },
    handleEdit() {
      this.$router.push({
        name: 'AnswerEdit',
        params: {
          questionId: this.faq.questionId,
          answerId: this.faq.id,
        },
      })
    },
    handleDelComment() {
      this.$_confirm(`是否删除回答?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          delAnswer(this.faq.id)
            .then(() => {
              this.$q.notify('删除回答成功')
              this.$emit('refresh-content')
            })
            .catch(() => {
              this.$q.notify('删除回答失败')
            })
        })
        .catch(() => {})
    },
    handleReplyTo(id, name) {
      this.reply.citeReplyId = id
      let input = this.$refs.editor.getValue()
      this.$refs.editor.setValue(`${this.replyText}${name}:${input}`)
    },
    handleDeleteReply(id) {
      this.$_confirm(`是否删除评论?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          delReply(id)
            .then(() => {
              this.$q.notify('删除评论成功')
              this.getReply()
            })
            .catch(() => {
              this.$q.notify('删除评论失败')
            })
        })
        .catch(() => {})
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../../../styles/variables.scss';
.faq-view-item-container {
  min-height: 176px; // left-warpper高176
  .left-warpper {
    padding-top: 20px;
    float: left;
    width: 50px;
    text-align: center;
    .thumb {
      border: 1px solid $borderColor;
      border-radius: 10px;
    }
    .adopt {
      font-size: 50px;
    }
  }
  .right-warpper {
    margin-left: 70px; // 70 = 左侧50 ＋ 间距20
    .footer {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      .author-info {
        display: flex;
        align-items: center;
        img {
          height: 40px;
          width: 40px;
        }
        .meta {
          padding-left: 10px;
          p {
            margin-bottom: 5px;
          }
        }
      }
    }
    .only-author {
      justify-content: flex-end;
    }
    .reply-item {
      display: flex;
      padding-right: 20px;
      .editor-view {
        width: calc(100% - 30px);
      }
      .icons-operate {
        width: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
    .reply-warpper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 20px;
      .editormd {
        margin: 0;
      }
      .q-btn {
        margin-left: 20px;
      }
      .q-form {
        flex-grow: 2;
        .q-form-item {
          margin-bottom: 0px;
        }
      }
    }
  }
  .icon-btn {
    cursor: pointer;
  }
}
</style>
