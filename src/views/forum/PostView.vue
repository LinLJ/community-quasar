<template>
  <div>
    <div class="row q-pt-xs">
      <div class="col-12 col-md-8 q-px-xs q-py-lg">
        <div class="q-pa-md">
          <div>
            <router-link
              :to="{
                name: 'forumView',
                params: { id: post.contentInfo.forumId },
              }"
              class="forumitem-contain q-pb-sm text-h6"
              ><q-icon :name="evaUndo"></q-icon> 返回{{
                post.forumName
              }}</router-link
            >
          </div>
          <div class="q-pa-sm column title-box show-border">
            <div class="text-center text-h5 q-pt-xl">
              {{ post.contentInfo.title }}
              <span v-if="isAuthor" class="q-px-xs">
                <q-icon
                  @click="handleEdit(post.contentInfo.id)"
                  class="show-border q-pa-sm text-h6"
                  :name="evaEditOutline"
                ></q-icon>
              </span>
              <span v-if="isAuthor" class="q-px-xs">
                <q-icon
                  @click="handleDeletePost(post.contentInfo.id)"
                  class="show-border q-pa-sm text-h6"
                  :name="evaTrash2Outline"
                ></q-icon>
              </span>
              <span v-if="!post.isFaved" class="q-px-xs">
                <q-icon
                  @click="handleCollect(post.contentInfo.id)"
                  class="show-border q-pa-sm text-h6"
                  :name="evaStarOutline"
                ></q-icon>
              </span>
              <span v-if="post.isFaved" class="q-px-xs">
                <q-icon
                  @click="handleCollect(post.contentInfo.id)"
                  class="show-border q-pa-sm text-h6"
                  :name="evaStar"
                ></q-icon>
              </span>
            </div>
            <div class="text-center">
              {{ post.contentInfo.updateTime }}
              {{ post.contentInfo.userName }}
              访问量：{{ post.visitCount }}
            </div>
            <q-separator class="q-mt-md q-mb-md" inset />

            <md-editor-view
              :md-content="post.contentInfo.content"
            ></md-editor-view>
            <q-separator class="q-mb-md" inset />
            <div>
              <tdf-chip
                v-for="(item, index) in post.contentInfo.tags"
                :key="index"
                :content="item.tagMix"
              ></tdf-chip>
            </div>
            <p class="text-h6 q-pl-sm">回帖</p>

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
                label="回帖"
              />
            </div>
            <div class="left-area q-pl-md">
              <div
                v-for="(item, index) in comments"
                :key="index"
                class="comment-item"
              >
                <a
                  @click="gotoPersonView(item.userId)"
                  class="comment-author"
                  >{{ item.userName }}</a
                >
                <span class="comment-time">{{ item.createTime }}</span>

                <md-editor-view :md-content="item.content" />

                <div
                  v-for="reply in item.replyList"
                  :key="reply.id"
                  class="reply-item"
                >
                  <span class="reply-meta">
                    {{ reply.userName }}
                    <span class="time"> {{ reply.createTime }} </span>
                  </span>
                  <md-editor-view :md-content="reply.content" class="content" />
                </div>

                <q-btn @click="handleAddReply(index)" size="small">回复</q-btn>
                <q-btn
                  v-if="userInfo.userId === item.userId"
                  @click="handleDeleteComment(item.id)"
                  :icon="evaTrash2Outline"
                  size="small"
                />

                <div v-if="item.replyShow">
                  <q-form
                    :ref="'replyForm' + index"
                    :model="comment"
                    label-width="0px"
                  >
                    <div prop="content" size="medium">
                      <tdf-md-editor
                        :config="config"
                        init-md-content=""
                        :ref="'editorReply' + index"
                      />
                    </div>
                  </q-form>
                  <q-btn
                    :loading="replyLoading"
                    @click="addReply(item, index)"
                    size="small"
                    type="primary"
                    >评论</q-btn
                  >
                </div>
              </div>
              <!-- <div
                v-for="(item, index) in comments"
                :key="index"
                class="comment-item"
              >
                <a
                  @click="gotoPersonView(item.userId)"
                  class="comment-author"
                  >{{ item.userName }}</a
                >
                <span class="comment-time">{{ item.createTime }}</span>

                <md-editor-view :md-content="item.content" />

                <div
                  v-for="reply in item.replyList"
                  :key="reply.id"
                  class="reply-item"
                >
                  <span class="reply-meta">
                    {{ reply.userName }}
                    <span class="time"> {{ reply.createTime }} </span>
                  </span>
                  <md-editor-view :md-content="reply.content" class="content" />
                </div>

                <q-btn @click="handleAddReply(index)" size="small">回复</q-btn>
                <q-btn
                  v-if="userInfo.userId === item.userId"
                  @click="handleDeleteComment(item.id)"
                  icon="el-icon-delete"
                  size="small"
                />

                <div v-if="item.replyShow">
                  <q-form
                    :ref="'replyForm' + index"
                    :model="comment"
                    :rules="rules"
                    label-width="0px"
                  >
                    <tdf-md-editor
                      :config="config"
                      init-md-content=""
                      :ref="'editorReply' + index"
                    />
                  </q-form>
                  <q-btn
                    :loading="replyLoading"
                    @click="addReply(item, index)"
                    size="small"
                    type="primary"
                    >评论</q-btn
                  >
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div v-if="!$q.screen.lt.md" class="col-md-4 q-px-xs q-py-lg">
        <tdf-box class="text-h6" showBorder content="最新评论文章">
          <tdf-list rounded :list="lastReplyPost" type="post"></tdf-list>
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
  evaUndo,
} from '@quasar/extras/eva-icons'

import { matThumbUp } from '@quasar/extras/material-icons'
// import { Notify } from 'quasar'

import { collect } from '@/api/blog'
import {
  getPost,
  getPostComment,
  addPostComment,
  getLastReplyPost,
  delReply,
  delPost,
  isCurrentPostAuthor,
} from '@/api/forum'
import { getPersonalInfo } from '@/api/personal'
import { mapGetters } from 'vuex'
import { login } from '@/utils/oauthLogin'

export default {
  data() {
    return {
      post: {
        isLogin: undefined,
        visitCount: undefined,
        isFaved: undefined,
        contentInfo: {
          id: undefined,
          title: undefined,
          forumId: undefined,
          userId: undefined,
          userName: undefined,
          content: undefined,
          createTime: undefined,
          updateTime: undefined,
          lastReplyTime: undefined,
          validFlag: undefined,
          allowReview: undefined,
          stickOrder: undefined,
          deleteFlag: undefined,
          avatar: undefined,
          replyCount: undefined,
          readCount: undefined,
          token: undefined,
        },
      },
      config: this.$_global('EDITOR_COMMENT_CONFIG'),
      comment: {
        citeReplyId: undefined,
        content: undefined,
        createTime: undefined,
        deleteFlag: undefined,
        id: undefined,
        postId: undefined,
        token: undefined,
        updateTime: undefined,
        userId: undefined,
        userName: undefined,
      },
      comments: [],
      lastReplyPost: [],
      isAuthor: false,
      userInfo: {},
      replyLoading: false,
      commentLoading: false,
      addCommentLoading: false,
      postDelLoading: false,
      qrUrl: document.location.href,
      delDialog: false,
      confirmDialogType: 'post',
      confirmDelId: '',
      rules: {
        content: [
          {
            required: true,
            message: '内容不能为空',
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
    ...mapGetters(['isLogin']),
  },
  created() {
    this.evaHeartOutline = evaHeartOutline
    this.evaHeart = evaHeart
    this.evaStarOutline = evaStarOutline
    this.evaStar = evaStar
    this.evaTrash2Outline = evaTrash2Outline
    this.evaEditOutline = evaEditOutline
    this.evaUndo = evaUndo
    this.matThumbUp = matThumbUp
    this.getPost() // 当前帖子
    this.getPostComment() // 帖子评论
    this.getLastReplyPost() // 右侧文章
    this.$on('isLogin', () => {
      if (!this.isLogin) {
        login(this.$route.fullPath)
      }
    })
    if (this.isLogin) {
      // 登陆回来 获取相关信息
      this.isCurrentPostAuthor() // 是否为帖子作者
      this.getPersonalInfo() // 个人信息
    }
    this.comment.postId = this.$route.params.id
  },
  methods: {
    gotoAllForum() {
      this.$router.push({
        name: 'forumList',
        component: () => import('@/views/forum/ForumList'),
      })
    },
    isCurrentPostAuthor() {
      isCurrentPostAuthor(this.$route.params.id)
        .then((response) => {
          this.isAuthor = response.data
        })
        .catch(() => {})
    },
    getPersonalInfo() {
      getPersonalInfo()
        .then((response) => {
          this.comment.userId = response.data.userId
          this.comment.userName = response.data.userName
          this.userInfo = response.data
        })
        .catch(() => {})
    },
    getLastReplyPost() {
      getLastReplyPost()
        .then((response) => {
          this.lastReplyPost = response.data
        })
        .catch(() => {})
    },
    getPost() {
      getPost(this.$route.params.id)
        .then((response) => {
          this.post = response.data
          document.title = '帖子-' + this.post.contentInfo.title
        })
        .catch(() => {})
    },
    getPostComment() {
      this.commentLoading = true
      getPostComment(this.$route.params.id)
        .then((response) => {
          for (let i = 0, len = response.data.content.length; i < len; i++) {
            response.data.content[i].replyShow = false
          }
          this.comments = response.data.content
          console.log('comments', response)
        })
        .catch(() => {})
        .finally(() => {
          this.commentLoading = false
        })
    },
    handleEdit(id) {
      let routeUrl = this.$router.resolve({
        name: 'ForumPostEdit',
        params: { id },
      })
      window.open(routeUrl.href, '_blank')
    },
    cancelButtonClass() {
      this.postDelLoading = false
    },
    handleDeletePost(id) {
      this.confirmDelId = id
      this.delDialog = true
      this.confirmDialogType = 'post'
    },
    handleCollect(id) {
      this.postDelLoading = true

      const obj = {
        category: 'post',
        id,
        state: Number(!this.post.isFaved),
      }
      collect(obj)
        .then(() => {
          obj.state
            ? this.$q.notify('收藏成功')
            : this.$q.notify('取消收藏成功')
          this.getPost()
        })
        .catch(() => {})
    },
    addComment() {
      this.comment.content = this.$refs.editor.getValue()
      if (this.comment.content.length < 5) {
        this.$q.notify('回帖字数不能少于5')
        return
      }
      this.$emit('isLogin')
      this.addCommentLoading = true
      addPostComment(this.comment)
        .then(() => {
          this.$refs.editor.setValue('')
          this.getPostComment()
          this.$q.notify('回帖成功')
        })
        .catch(() => {})
        .finally(() => {
          this.addCommentLoading = false
        })
    },
    handleAddReply(index) {
      this.comments[index].replyShow = !this.comments[index].replyShow
    },
    addReply(item, index) {
      const editorRef = `editorReply${index}`
      this.comment.content = this.$refs[editorRef][0].getValue()
      const formRef = `replyForm${index}`
      console.info(
        this.$refs[formRef][0].$attrs.model.content,
        'his.$refs[formRef][0]'
      )
      if (this.$refs[formRef][0].$attrs.model.content.length < 5) {
        this.$q.notify('回复字数不能少于5')
        return
      }
      this.$emit('isLogin')
      this.replyLoading = true
      this.comment.citeReplyId = item.id
      addPostComment(this.comment)
        .then(() => {
          this.getPostComment()
        })
        .catch(() => {})
        .finally(() => {
          this.replyLoading = false
          this.comment.citeReplyId = undefined // 回帖和回复公用一个对象,防止回复之后再回帖时请求参数会带citeReplyId
        })
      // this.$refs[formRef][0].validate((valid) => {
      //   if (valid) {
      //     this.$emit('isLogin')
      //     this.replyLoading = true
      //     this.comment.citeReplyId = item.id
      //     addPostComment(this.comment)
      //       .then(() => {
      //         this.getPostComment()
      //       })
      //       .catch(() => {})
      //       .finally(() => {
      //         this.replyLoading = false
      //         this.comment.citeReplyId = undefined // 回帖和回复公用一个对象,防止回复之后再回帖时请求参数会带citeReplyId
      //       })
      //   }
      // })
    },
    handleDeleteComment(id) {
      this.confirmDelId = id
      this.delDialog = true
      this.confirmDialogType = 'comment'
    },
    confirmDel() {
      if (this.confirmDelId) {
        if (this.confirmDialogType === 'comment') {
          delReply(this.confirmDelId ).then(() => {
            this.$q.notify('删除评论成功')
            // this.$_message.success('删除评论成功')
            this.getPostComment()
          })
        } else if (this.confirmDialogType === 'post') {
          this.postDelLoading = true
          delPost(this.confirmDelId).then(() => {
            this.$q.notify('删除成功')

            this.$router.push({
              name: 'forumView',
              params: {
                id: this.post.contentInfo.forumId,
              },
            })
            this.postDelLoading = false
          })
          // this.cancelButtonClass()
        }
      }
    },

    gotoPersonView(id) {
      this.$router.push({
        name: 'space',
        params: {
          id,
        },
      })
    },
  },
}
</script>

<style lang="scss">
.title-box {
  background: white;
}
.show-border {
  border: 0.5px solid rgba(86, 61, 124, 0.2);
  border-radius: 4px;
}
.icon-box {
  width: 40px;
  height: 40px;
}
.icon-center {
  margin: auto;
}
</style>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
.mobile {
  width: 100% !important;
}
.left-area {
  float: left;
  .forum-return {
    font-size: $frontSizeBLg;
    color: $gotoAllForumColor;
    &:hover {
      color: $frontPostColor;
    }
  }
  .header {
    text-align: center;
    .title {
      font-size: $fontSizeSuperLg;
      color: $mainColor;
    }
    .meta {
      font-size: $fontSizeBase;
      color: $subColor;
      margin-top: 10px;
      .meta-item {
        display: inline-block;
        & + .meta-item {
          margin-left: 10px;
        }
      }
    }
  }
  .tdc-header {
    font-size: $fontSizeLg;
    margin-bottom: 15px;
    border-bottom: 1px solid #eaeaea;
    padding: 10px 0;
  }
  .comment-button {
    position: relative;
    text-align: end;
  }
  .comment-total {
    display: inline-block;
    height: 36px;
    line-height: 36px;
  }
  .comment-item {
    & + .comment-item {
      margin-top: 20px;
    }
    .comment-author {
      font-size: $fontSizeBase;
      &:hover {
        color: $brandColor;
      }
    }
    .comment-time {
      font-size: $fontSizeSm;
      margin-left: 5px;
      color: $subColor;
    }
    .delete {
      cursor: pointer;
    }
    .reply-item {
      padding-left: 10px;
      margin: 10px;
      border: 1px dashed $borderColor;
      color: $subColor;
      .reply-meta {
        padding-left: 10px;
        position: relative;
        top: -13px;
        background: $mainBgColor;
      }
      .content {
        color: $subColor;
      }
    }
  }
}
</style>
