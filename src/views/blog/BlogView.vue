<template>
  <div>
    <div class="row q-pt-xs">
      <div class="col-12 col-md-8 q-px-xs q-py-lg">
        <div class="q-pa-md">
          <div class="q-pa-sm column title-box show-border">
            <div class="text-center text-h5 q-pt-xl">
              {{ blog.contentInfo.title }}
              <span v-if="isAuthor" class="q-px-xs">
                <q-icon
                  @click="handleEdit(blog.contentInfo.id)"
                  class="show-border q-pa-sm text-h6"
                  :name="evaEditOutline"
                ></q-icon>
              </span>
              <span v-if="isAuthor" class="q-px-xs">
                <q-icon
                  @click="handleDel(blog.contentInfo.id)"
                  class="show-border q-pa-sm text-h6"
                  :name="evaTrash2Outline"
                ></q-icon>
              </span>
              <!-- <span v-if="false" class="q-px-xs">
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
              </span> -->
              <span v-if="!blog.isFaved" class="q-px-xs">
                <q-icon
                  @click="handleCollect(blog.contentInfo.id)"
                  class="show-border q-pa-sm text-h6"
                  :name="evaStarOutline"
                ></q-icon>
              </span>
              <span v-if="blog.isFaved" class="q-px-xs">
                <q-icon
                  @click="handleCollect(blog.contentInfo.id)"
                  class="show-border q-pa-sm text-h6"
                  :name="evaStar"
                ></q-icon>
              </span>
            </div>
            <div class="text-center">
              {{ blog.contentInfo.updateTime }}
              {{ blog.contentInfo.userName }}
              访问量：{{ blog.visitCount }}
            </div>
            <q-separator class="q-mt-md q-mb-md" inset />

            <md-editor-view
              :md-content="blog.contentInfo.content"
            ></md-editor-view>

            <div
              @click="handleThumbUp"
              v-loading="thumbLoading"
              class="text-center"
            >
              <q-icon :name="matThumbUp"></q-icon>
              {{ blog.thumbUpNumber }}
            </div>
            <p class="text-h6 q-pl-sm">标签</p>

            <q-separator class="q-mb-md" inset />
            <div>
              <tdf-chip
                v-for="(item, index) in blog.contentInfo.tags"
                :key="index"
                :content="item.tagMix"
              ></tdf-chip>
            </div>
            <p class="text-h6 q-pl-sm">评论</p>

            <q-separator class="q-mb-md" inset />
            <div class="q-px-sm">
              <q-form ref="commentForm">
                <tdf-md-editor
                  :config="config"
                  :init-md-content="replyComment.content"
                  ref="editor"
                ></tdf-md-editor>
              </q-form>
            </div>
            <div class="q-pr-sm">
              <q-btn
                @click="handleAddComment"
                class="float-right"
                color="primary"
                label="评论"
              />
            </div>
            <div class="q-pl-sm">共{{ comment.commentCount }}条评论</div>
            <div>
              <tdf-scroll-load
                :on-touch-bottom="getBlogComment"
                :is-loaded-all="comment.isLast"
                class="width-auto"
              >
                <div
                  v-for="(item, index) in comment.commentList"
                  :key="index"
                  :body="item"
                >
                  <div class="q-pl-sm q-py-md">
                    {{ item.userName }}
                    {{ item.updateTime }}
                    <md-editor-view :md-content="item.content" />
                    <span
                      v-if="userInfo.userId === item.userId"
                      class="q-px-xs"
                    >
                      <q-icon
                        @click="handleDeleteComment(item.id)"
                        class="show-border q-pa-sm text-h6"
                        :name="evaTrash2Outline"
                      ></q-icon>
                    </span>
                  </div>
                </div>
              </tdf-scroll-load>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!$q.screen.lt.md" class="col-md-4 q-px-xs q-py-lg">
        <tdf-box class="text-h6" showBorder content="最新发布文章">
          <tdf-list rounded :list="lastestArtical" type="blog"></tdf-list>
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
  getBlog,
  getBlogComment,
  getLastReply,
  addComment,
  isAuthor,
  delBlog,
  collect,
  thumbup,
  delComment,
} from '@/api/blog'
import { getPersonalInfo } from '@/api/personal'

import {
  evaHeartOutline,
  evaHeart,
  evaStarOutline,
  evaStar,
  evaTrash2Outline,
  evaEditOutline,
} from '@quasar/extras/eva-icons'
import { matThumbUp } from '@quasar/extras/material-icons'
import { login } from '@/utils/oauthLogin'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      confirmDialogType: 'blog',
      confirmDelId: '',
      delDialog: false,
      userInfo: {},
      lastestArtical: [],
      lastReplyLoading: false,
      blogLoading: false,
      isAuthor: false,
      thumbLoading: false,
      config: this.$_global('EDITOR_COMMENT_CONFIG'),
      commentQuery: {
        id: undefined,
        page: 1,
      },
      comment: {
        isLast: false,
        commentCount: undefined,
        commentList: [],
      },
      blog: {
        isLogin: undefined,
        visitCount: undefined,
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
        },
      },
      replyComment: {
        blogId: undefined,
        content: undefined,
        createTime: undefined,
        deleteFlag: 0,
        id: undefined,
        updateTime: undefined,
        userId: undefined,
        userName: undefined,
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
    this.getBlog(this.$route.params.id)
    this.getLastReply()
    this.evaHeartOutline = evaHeartOutline
    this.evaHeart = evaHeart
    this.evaStarOutline = evaStarOutline
    this.evaStar = evaStar
    this.evaTrash2Outline = evaTrash2Outline
    this.evaEditOutline = evaEditOutline
    this.matThumbUp = matThumbUp
    this.commentQuery.id = this.$route.params.id
    this.$on('isLogin', () => {
      if (!this.isLogin) {
        login(this.$route.fullPath)
      }
    })
    if (this.isLogin) {
      // 登陆回来 获取相关信息

      this.judgeIsAuthor(this.$route.params.id)
      this.getPersonalInfo() // 个人信息
    }
    this.getLastReply()
  },
  methods: {
    judgeIsAuthor(id) {
      isAuthor(id)
        .then((response) => {
          this.isAuthor = response.data
        })
        .catch(() => {})
    },
    handleThumbUp() {
      if (this.blog.isThumbedUp) {
        this.$q.notify('亲，每人只能点赞一次哦')
        // this.$_message.info('亲，每人只能点赞一次哦')
      } else {
        this.thumbLoading = true
        const obj = {
          category: 'blog',
          id: this.blog.contentInfo.id,
          state: 1,
        }
        thumbup(obj)
          .then(() => {
            this.$q.notify('点赞成功')

            this.getBlog(this.$route.params.id)
          })
          .catch(() => {
            this.globalThumb = 'thumb'
            // console.log('点赞失败，失败原因：接口返回问题1')
          })
          .finally(() => {
            this.thumbLoading = false
          })
      }
    },
    getLastReply() {
      this.lastReplyLoading = true
      getLastReply()
        .then((response) => {
          this.lastestArtical = response.data
        })
        .finally(() => {
          this.lastReplyLoading = false
        })
    },
    getBlog(id) {
      this.blogLoading = true
      getBlog(id)
        .then((response) => {
          this.blog = response.data
          document.title = '博客-' + this.blog.contentInfo.title
          this.blog.contentInfo.tags = this.blog.contentInfo.tags
            .replace(/，/gi, ',')
            .split(',')
        })
        .finally(() => {
          this.blogLoading = false
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
    getBlogComment() {
      return getBlogComment(this.commentQuery)
        .then((response) => {
          this.comment.commentCount = response.data.commentCount
          this.comment.commentList.push(...response.data.commentList)
          this.comment.isLast =
            this.comment.commentCount === this.comment.commentList.length
          this.commentQuery.page++
          // console.log("blogComment",response)
        })
        .catch((err) => {
          throw err
        })
    },
    refreshComment() {
      this.commentQuery.page = 1
      this.comment = {
        isLast: false,
        commentCount: undefined,
        commentList: [],
      }
      this.getBlogComment() // 从头重新获取
    },
    handleAddComment() {
      this.replyComment.content = this.$refs.editor.getValue()

      this.$emit('isLogin')
      this.addLoading = true
      this.replyComment.blogId = this.$route.params.id
      if (this.replyComment.content.length < 5) {
        this.$q.notify('评论不能少于5个字')
      } else {
        addComment(this.replyComment)
          .then(() => {
            this.$refs.editor.setValue('')
            this.refreshComment()
            this.addLoading = false
            this.$q.notify('评论成功')
          })
          .catch(() => {
            this.addLoading = false
          })
      }

      // this.$refs.commentForm.validate(valid => {
      //   if (valid) {
      //     this.$emit('isLogin')
      //     this.addLoading = true
      //     this.replyComment.blogId = this.$route.params.id
      //     addComment(this.replyComment).then(() => {
      //       this.$refs.editor.setValue('')
      //       this.refreshComment()
      //       this.addLoading = false
      //     }).catch(() => {
      //       this.addLoading = false
      //     })
      //   }
      // })
    },
    handleEdit(id) {
        let routeUrl = this.$router.resolve({
          name: 'BlogEdit',
          params: {id}
        })
        window.open(routeUrl.href, '_blank')
      },
    handleDeleteComment(id) {
      this.confirmDelId = id
      this.delDialog = true
      this.confirmDialogType = 'comment'
    },
    confirmDel() {
      if (this.confirmDelId) {
        if (this.confirmDialogType === 'comment') {
          delComment({ id: this.confirmDelId }).then(() => {
            this.$q.notify('删除评论成功')
            // this.$_message.success('删除评论成功')
            this.refreshComment()
          })
        } else if (this.confirmDialogType === 'blog') {
          this.blogDelLoading = true
          delBlog(this.confirmDelId).then(() => {
            this.$q.notify('删除成功')
            this.$router.push({
              name: 'blogList',
            })
            this.blogDelLoading = false
          })
          // this.cancelButtonClass()
        }
      }
    },
    handleDel(id) {
      this.confirmDelId = id
      this.delDialog = true
      this.confirmDialogType = 'blog'
    },
    handleCollect(id) {
      const obj = {
        category: 'blog',
        id,
        state: Number(!this.blog.isFaved),
      }
      collect(obj).then(() => {
        obj.state ? this.$q.notify('收藏成功') : this.$q.notify('取消收藏成功')

        this.getBlog(id)
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
