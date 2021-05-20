<template>
  <div>
    <div class="row q-pt-xs">
      <div class="col-12 col-md-8 q-px-xs q-py-lg">
        <div class="">
          <div class="q-pa-md column title-box show-border left-area">
            <div v-loading="faqLoading" class="header">
              <span class="title">
                {{ faq.contentInfo.title }}
                <span v-if="isAuthor" class="q-px-xs">
                  <q-icon
                    @click="handleEdit(faq.contentInfo.id)"
                    class="show-border q-pa-sm text-h6"
                    :name="evaEditOutline"
                  ></q-icon>
                </span>
                <span v-if="isAuthor" class="q-px-xs">
                  <q-icon
                    @click="handleDel(faq.contentInfo.id)"
                    class="show-border q-pa-sm text-h6"
                    :name="evaTrash2Outline"
                  ></q-icon>
                </span>
                <span v-if="!faq.isFaved" class="q-px-xs">
                  <q-icon
                    @click="handleCollect(faq.contentInfo.id)"
                    class="show-border q-pa-sm text-h6"
                    :name="evaStarOutline"
                  ></q-icon>
                </span>
                <span v-if="faq.isFaved" class="q-px-xs">
                  <q-icon
                    @click="handleCollect(faq.contentInfo.id)"
                    class="show-border q-pa-sm text-h6"
                    :name="evaStar"
                  ></q-icon>
                </span>
              </span>
              <div class="meta">
                <div v-if="faq.contentInfo.tags.length !== 0" class="meta-item">
                  <tdc-tag
                    class="blog-tags"
                    v-model="faq.contentInfo.tags"
                    just-for-show
                  />
                </div>
                <div class="meta-item">
                  <svg-icon icon-class="tdc-clock" />
                  <span> {{ faq.contentInfo.updateTime }} </span>
                </div>
                <div class="meta-item">
                  <svg-icon icon-class="user" />
                  <router-link
                    :to="{
                      name: 'space',
                      params: { id: faq.contentInfo.userId },
                    }"
                    >{{ faq.contentInfo.userName }}
                  </router-link>
                </div>
                <div class="meta-item">
                  <span>访问量: {{ faq.visitCount }}</span>
                </div>
              </div>
            </div>

            <q-separator class="q-mt-md q-mb-md" inset />

            <faq-view-item
              :faq="faq.contentInfo"
              place="text"
              @refresh-content="getQuestion($route.params.id)"
            />

            <span class="comment-num">共{{ comment.answerCount }}条回答</span>
            <div
              v-for="(item, index) in comment.contentInfo"
              :key="index"
              class="comment-item"
            >
              <faq-view-item
                :faq="item"
                :question-author="isAuthor"
                place="comment"
                @refresh-content="refreshComment"
              />
            </div>

            <q-separator class="q-mb-md" inset />

            <p class="text-h6 q-pl-sm">添加答案</p>

            <q-separator class="q-mb-md" inset />
            <div class="q-px-sm">
              <tdf-md-editor
              ref="editor"
                :config="config"
                :init-md-content="comment.content"
              ></tdf-md-editor>
            </div>
            <div class="q-pr-sm">
              <q-btn
                @click="addComment"
                class="float-right"
                color="primary"
                label="回答"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="!$q.screen.lt.md" class="col-md-4 q-px-xs q-py-lg">
        <tdf-box class="text-h6" showBorder content="最新发布问题">
          <tdf-list rounded :list="lastestArtical" type="question"></tdf-list>
        </tdf-box>
      </div>
      <q-dialog v-model="delDialog">
        <q-card style="width: 300px">
          <q-card-section>
            <div class="text-h6">确认删除？</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              label="确认"
              @click="confirmDel"
              color="primary"
              v-close-popup
            />
            <q-btn flat label="取消" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import {
  evaHeartOutline,
  evaHeart,
  evaStarOutline,
  evaStar,
  evaTrash2Outline,
  evaEditOutline,
  evaArrowIosUpwardOutline,
  evaArrowIosDownwardOutline,
} from '@quasar/extras/eva-icons'
import FaqViewItem from './components/FaqViewItem'
import { collect } from '@/api/blog'
import {
  getQuestion,
  addAnswer,
  delQuestion,
  getAnswers,
  isAuthor,
  getNewQues,
  follow,
} from '@/api/faq'
import { getPersonalInfo } from '@/api/personal'
import { login } from '@/utils/oauthLogin'
import { mapGetters } from 'vuex'

export default {
  components: {
    FaqViewItem,
  },
  data() {
    return {
      confirmDialogType: 'question',
      confirmDelId: '',
      delDialog: false,
      faq: {
        isThumbedUp: undefined,
        isLogin: undefined,
        isFaved: undefined,
        visitCount: undefined,
        thumbUpNumber: undefined,
        contentInfo: {
          baseUrl: undefined,
          baseUrlState: undefined,
          userUrl: undefined,
          userUrlState: undefined,
          id: undefined,
          categoryId: undefined,
          content: undefined,
          createTime: undefined,
          deleteFlag: undefined,
          stickOrder: undefined,
          title: undefined,
          subTitle: undefined,
          updateTime: undefined,
          userId: undefined,
          userName: undefined,
          validFlag: undefined,
          originalFlag: undefined,
          tags: [],
          token: undefined,
          titleSearch: undefined,
          replyCount: undefined,
          readCount: undefined,
          ticketCount: undefined,
          takeAnswer: undefined,
          lastTime: undefined,
        },
      },
      config: this.$_global('EDITOR_COMMENT_CONFIG'),
      commentPage: 1,
      comment: {
        answerCount: undefined,
        contentInfo: [],
        islast: false,
      },
      lastestArtical: [],
      replyComment: {
        answerFlag: undefined,
        author: undefined,
        baseUrl: undefined,
        baseUrlState: undefined,
        categoryId: undefined,
        content: undefined,
        createTime: undefined,
        deleteFlag: undefined,
        id: undefined,
        originalFlag: undefined,
        questionId: undefined,
        readCount: undefined,
        replyCount: undefined,
        stickOrder: undefined,
        subTitle: undefined,
        tags: undefined,
        ticketCount: undefined,
        title: undefined,
        titleSearch: undefined,
        token: undefined,
        updateTime: undefined,
        userId: undefined,
        userName: undefined,
        userUrl: undefined,
        userUrlState: undefined,
        validFlag: undefined,
      },
      addLoading: false,
      commentLoading: false,
      faqLoading: false,
      isAuthor: false,
      lastReplyLoading: false,
      questionDelLoading: false,
      rules: {
        content: [
          {
            required: true,
            message: '回答不能为空',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  computed: {
    isDesktop() {
      return this.$store.getters.device === 'desktop'
    },
    heartColor() {
      return this.faq.isView ? 'followed' : ''
    },
    ...mapGetters(['isLogin']),
  },

  created() {
    this.evaHeartOutline = evaHeartOutline
    this.evaHeart = evaHeart
    this.evaStarOutline = evaStarOutline
    this.evaStar = evaStar
    this.evaTrash2Outline = evaTrash2Outline
    this.evaEditOutline = evaEditOutline
    this.evaArrowIosUpwardOutline = evaArrowIosUpwardOutline
    this.evaArrowIosDownwardOutline = evaArrowIosDownwardOutline
    this.getQuestion(this.$route.params.id)
    this.getNewQues()
    this.getAnswer(this.$route.params.id)
    this.$on('isLogin', () => {
      // 用于需要登陆的操作，如评论
      if (!this.isLogin) {
        login(this.$route.fullPath)
      }
    })
    if (this.isLogin) {
      // 登陆回来 获取相关信息
      this.isCurrentPostAuthor(this.$route.params.id) // 是否为问答作者
      this.getPersonalInfo() // 个人信息
    }
  },
  methods: {
    isCurrentPostAuthor(id) {
      isAuthor(id)
        .then((response) => {
          this.isAuthor = response.data
        })
        .catch(() => {})
    },
    getQuestion(id) {
      this.faqLoading = true
      getQuestion(id)
        .then((response) => {
          this.faq = response.data
          this.faq.contentInfo.userAvatarUrl = this.faq.avatar
          this.faq.contentInfo.tags = this.faq.contentInfo.tags
            .replace(/，/gi, ',')
            .split(',')
          if (
            this.faq.contentInfo.tags.length === 1 &&
            this.faq.contentInfo.tags[0] === ''
          ) {
            this.faq.contentInfo.tags = []
          }
          document.title = '问答-' + this.faq.contentInfo.title
        })
        .catch(() => {})
        .finally(() => {
          this.faqLoading = false
        })
    },
    getAnswer(id) {
      this.commentLoading = true
      getAnswers({ id, page: this.commentPage })
        .then((response) => {
          this.comment.contentInfo.push(...response.data.contentInfo)
          this.comment.islast =
            this.comment.contentInfo.length === response.data.answerCount
          this.comment.answerCount = response.data.answerCount
        })
        .finally(() => {
          this.commentLoading = false
        })
    },
    loadMoreComment() {
      this.commentPage++
      this.getAnswer(this.$route.params.id)
    },
    refreshComment() {
      this.commentPage = 1
      this.comment.contentInfo = []
      this.getAnswer(this.$route.params.id)
    },
    getNewQues() {
      this.lastReplyLoading = true
      getNewQues()
        .then((response) => {
          this.lastestArtical = response.data
          console.log(this.lastestArtical,"this.lastestArtical")
        })
        .finally(() => {
          this.lastReplyLoading = false
        })
    },
    getPersonalInfo() {
      getPersonalInfo()
        .then((response) => {
          this.replyComment.userId = response.data.userId
          this.replyComment.userName = response.data.userName
          this.userInfo = response.data
        })
        .catch(() => {})
    },
    handleEdit(id) {
      let routeUrl = this.$router.resolve({
        name: 'FaqEdit',
        params: { id },
      })
      window.open(routeUrl.href, '_blank')
    },
    cancelButtonClass() {
      this.questionDelLoading = false
    },
    handleDel(id) {
      this.confirmDelId = id
      this.delDialog = true
      this.confirmDialogType = 'question'
    },
    confirmDel() {
      if (this.confirmDelId) {
        if (this.confirmDialogType === 'question') {
          this.blogDelLoading = true
          delQuestion(this.confirmDelId).then(() => {
            this.$q.notify('删除成功')
            this.$router.push({
              name: 'faqList',
            })
            this.blogDelLoading = false
          })
          // this.cancelButtonClass()
        }
      }
    },
    // handleDel(id) {
    //   this.$_confirm(`是否删除?`, '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning',
    //   })
    //     .then(() => {
    //       this.questionDelLoading = true
    //       delQuestion(id)
    //         .then(() => {
    //           this.$_message.success('删除成功')
    //           this.$router.push({
    //             name: 'faqList',
    //           })
    //           this.questionDelLoading = false
    //         })
    //         .catch(() => {
    //           this.$_message.error('删除失败')
    //         })
    //     })
    //     .catch(() => {})
    //   this.cancelButtonClass()
    // },

    handleFollow(id, title) {
      const obj = {
        category: 'question',
        id,
        title,
        state: Number(!this.faq.isView),
      }
      follow(obj).then(() => {
        this.$_message.success(obj.state ? '关注成功' : '取消关注成功')
        this.getQuestion(id)
      })
    },
    handleCollect(id, title) {
      const obj = {
        category: 'question',
        id,
        state: Number(!this.faq.isFaved),
        title,
      }
      collect(obj).then(() => {
        obj.state ? this.$q.notify('收藏成功') : this.$q.notify('取消收藏成功')
        this.getQuestion(id)
      })
    },
    addComment() {
      this.replyComment.content = this.$refs.editor.getValue()
      if (this.replyComment.content.length < 5) {
        this.$q.notify('回答字数不能少于5个')
        return
      }
      this.$emit('isLogin')
      this.addLoading = true
      this.replyComment.questionId = this.$route.params.id
      addAnswer(this.replyComment)
        .then(() => {
          this.refreshComment()
          this.$refs.editor.setValue('')
          this.$q.notify('回答成功')
        })
        .catch(() => {})
        .finally(() => {
          this.addLoading = false
        })
      // this.$refs.commentForm.validate((valid) => {
      //   if (valid) {
      //     this.$emit('isLogin')
      //     this.addLoading = true
      //     this.replyComment.questionId = this.$route.params.id
      //     addAnswer(this.replyComment)
      //       .then(() => {
      //         this.refreshComment()
      //         this.$refs.editor.setValue('')
      //       })
      //       .catch(() => {})
      //       .finally(() => {
      //         this.addLoading = false
      //       })
      //   }
      // })
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../../styles/variables.scss';
.mobile {
  width: 100% !important;
}
.left-area {
  .header {
    .title {
      font-size: $fontSizeSuperLg;
      color: $mainColor;
      .followed {
        color: $dangerColor;
      }
    }
    .meta {
      font-size: $fontSizeBase;
      color: $subColor;
      margin-top: 10px;
      .meta-item {
        display: inline-block;
        & + .meta-item {
          margin-left: 30px;
        }
        router-link {
          color: #337ab7;
          padding-left: 2px;
        }
      }
    }
  }
  .content {
    margin-bottom: 20px;
  }
  .tdc-header {
    font-size: $fontSizeLg;
    margin-bottom: 15px;
    border-bottom: 1px solid #eaeaea;
    padding: 10px 0;
  }
  .comment-button {
    background-color: $brandColor;
    border-color: $brandColor;
    float: right;
  }
  .comment-num {
    display: inline-block;
    height: 36px;
    line-height: 36px;
    font-size: $fontSizeLg;
  }
  .comment-warpper {
    .comment-item {
      margin-bottom: 20px;
    }
    .footer {
      text-align: center;
    }
  }
}
.right-area {
  float: right;
  width: calc(30% - 20px);
}
</style>
