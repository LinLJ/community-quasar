<template>
  <div>
    <div class="row q-pt-xs">
      <div class="col-8 q-px-xs q-py-lg">
        <div class="q-pa-md">
          <div>
            <router-link
              :to="{
                name: 'forumView',
                params: { id: post.contentInfo.forumId },
              }"
              class="forumitem-contain"
              >返回{{ post.forumName }}</router-link
            >
          </div>
          <div class="q-pa-sm column title-box show-border">
            <div class="text-center text-h5 q-pt-xl">
              {{ post.contentInfo.title }}
              <span v-if="isAuthor" class="q-px-xs">
                <q-icon
                  class="show-border q-pa-sm text-h6"
                  :name="evaEditOutline"
                ></q-icon>
              </span>
              <span v-if="isAuthor" class="q-px-xs">
                <q-icon
                  class="show-border q-pa-sm text-h6"
                  :name="evaTrash2Outline"
                ></q-icon>
              </span>
              <span v-if="false" class="q-px-xs">
                <q-icon
                  class="show-border q-pa-sm text-h6"
                  :name="evaHeartOutline"
                ></q-icon>
              </span>
              <span v-if="false" class="q-px-xs">
                <q-icon
                  class="show-border q-pa-sm text-h6"
                  :name="evaHeart"
                ></q-icon>
              </span>
              <span v-if="!post.isFaved" class="q-px-xs">
                <q-icon
                  class="show-border q-pa-sm text-h6"
                  :name="evaStarOutline"
                ></q-icon>
              </span>
              <span v-if="post.isFaved" class="q-px-xs">
                <q-icon
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

            <!-- <div
              @click="handleThumbUp"
              v-loading="thumbLoading"
              class="text-center"
            >
              <q-icon :name="matThumbUp"></q-icon>
              {{ post.thumbUpNumber }}
            </div>
            <p class="text-h6 q-pl-sm">标签</p> -->

            <q-separator class="q-mb-md" inset />
            <div>
              <tdf-chip
                v-for="(item, index) in post.contentInfo.tags"
                :key="index"
                :content="item.tagMix"
              ></tdf-chip>
            </div>
            <p class="text-h6 q-pl-sm">评论</p>

            <q-separator class="q-mb-md" inset />
            <div class="q-px-sm">
              <tdf-md-editor
                :config="config"
                :init-md-content="comment.content"
              ></tdf-md-editor>
            </div>
            <div class="q-pr-sm">
              <q-btn class="float-right" color="primary" label="评论" />
            </div>
            <div class="q-pl-sm">共{{ comment.commentCount }}条评论</div>
            <div>
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

                <q-btn @click="handleAddReply(index)" size="small"
                  >回复</q-btn
                >
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
              </div>
              <!-- <tdf-scroll-load
                :on-touch-bottom="getBlogComment"
                :is-loaded-all="comment.isLast"
                class="width-auto"
              >
                <div
                  v-for="(item, index) in comments"
                  :key="index"
                  :body="item"
                >
                  <div class="q-pl-sm q-py-md">
                    {{ item.userName }}
                    {{ item.createTime }}
                    <md-editor-view :md-content="item.content" />
                  </div>
                </div>
              </tdf-scroll-load> -->
            </div>
          </div>
        </div>
      </div>
      <div class="col-4 q-px-xs q-py-lg">
        <tdf-box class="text-h6" showBorder content="最新评论文章">
          <tdf-list rounded :list="lastReplyPost"></tdf-list>
        </tdf-box>
      </div>
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
      this.$_confirm(`是否删除?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.postDelLoading = true
          delPost(id)
            .then(() => {
              this.$_message.success('删除成功')
              this.$router.push({
                name: 'forumView',
                params: {
                  id: this.post.contentInfo.forumId,
                },
              })
              this.postDelLoading = false
            })
            .catch(() => {})
        })
        .catch(() => {})
      this.cancelButtonClass()
    },
    handleCollect(id) {
      this.postDelLoading = true
      debugger
      const obj = {
        category: 'post',
        id,
        state: Number(!this.post.isFaved),
      }
      collect(obj)
        .then(() => {
          this.$_message.success(obj.state ? '收藏成功' : '取消收藏成功')
          this.getPost()
        })
        .catch(() => {})
    },
    addComment() {
      this.comment.content = this.$refs.editor.getValue()
      this.$refs.commentForm.validate((valid) => {
        if (valid) {
          this.$emit('isLogin')
          this.addCommentLoading = true
          addPostComment(this.comment)
            .then(() => {
              this.$refs.editor.setValue('')
              this.getPostComment()
            })
            .catch(() => {})
            .finally(() => {
              this.addCommentLoading = false
            })
        }
      })
    },
    handleAddReply(index) {
      this.comments[index].replyShow = !this.comments[index].replyShow
    },
    addReply(item, index) {
      const editorRef = `editorReply${index}`
      this.comment.content = this.$refs[editorRef][0].getValue()
      const formRef = `replyForm${index}`
      this.$refs[formRef][0].validate((valid) => {
        if (valid) {
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
        }
      })
    },
    handleDeleteComment(id) {
      delReply(id)
        .then(() => {
          this.getPostComment()
        })
        .catch(() => {})
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
