<template>
  <div class="pc-screan-width">
    <div class="row q-pt-xs q-px-md">
      <div class="col q-px-xs q-py-lg">
        <q-form ref="form" :model="post">
          <div class="colum">
            <div class="row">
              <div class="col-1 text-center text-weight-bolder q-pt-sm">
                标题:
              </div>
              <div class="col-11">
                <q-input dense outlined v-model="post.title" />
              </div>
            </div>

            <div class="row q-pt-lg">
              <div class="col-1 text-center q-pt-sm">正文</div>
              <div class="col-11">
                <tdf-md-editor
                  :config="config"
                  :init-md-content="post.content"
                  ref="editor"
                ></tdf-md-editor>
              </div>
            </div>
            <div class="row q-pt-lg q-pl-xl">
              <div class="q-px-sm">
                <q-btn @click="publishPost">发布</q-btn>
              </div>
              <!-- <div class="q-px-sm">
                <q-btn @click="saveAsDraft">保存为草稿</q-btn>
              </div> -->
              <div class="q-px-sm"><q-btn @click="close">取消</q-btn></div>
            </div>
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script>
import { postPublish } from '@/api/forum'
import { getPersonalInfo } from '@/api/personal'
import { evaTrash2Outline } from '@quasar/extras/eva-icons'
import { Notify } from 'quasar'

export default {
  data() {
    return {
      post: {
        allowReview: undefined,
        avatar: undefined,
        content: undefined,
        createTime: undefined,
        deleteFlag: undefined,
        forumId: undefined,
        id: undefined,
        lastReplyTime: undefined,
        readCount: undefined,
        replyCount: undefined,
        stickOrder: undefined,
        title: undefined,
        token: undefined,
        updateTime: undefined,
        userId: undefined,
        userName: undefined,
        validFlag: undefined,
      },
      config: this.$_global('EDITOR_TEXT_CONFIG'),
      publishLoading: false,
    }
  },
  created() {
    this.evaTrash2Outline = evaTrash2Outline
    this.getPersonalInfo()
    this.post.forumId = this.$route.params.id
  },

  methods: {
    //添加标签
    getPersonalInfo() {
      getPersonalInfo()
        .then((response) => {
          this.post.userId = response.data.userId
          this.post.userName = response.data.userName
        })
        .catch(() => {
          Notify.create('获取个人信息失败，请重试')
        })
    },
    publishPost() {
      this.post.content = this.$refs.editor.getValue()
      if(this.post.content.length<5){
        this.$q.notify("帖子字数不能少于5个")
        return
      }

      if (this.post.userId) {
        this.publishLoading = true
        postPublish(this.post)
          .then(() => {
            Notify.create('发表成功')
            this.$router.push({
              name: 'forumView',
              params: {
                id: this.post.forumId,
              },
            })
          })
          .catch(() => {
            Notify.create('Network Error')
          })
          .finally(() => {
            this.publishLoading = false
          })
      } else {
        Notify.create('正在获取个人数据，请稍后重试')
      }

      // this.$refs.form.validate(valid => {
      //   if (valid) {
      //     if (this.post.userId) {
      //       this.publishLoading = true
      //       postPublish(this.post).then(() => {
      //          Notify.create('发表成功')
      //         this.$router.push({
      //           name: 'forumView',
      //           params: {
      //             id: this.post.forumId
      //           }
      //         })
      //       }).catch(() => {
      //          Notify.create('Network Error')
      //       }).finally(() => {
      //         this.publishLoading = false
      //       })
      //     } else {
      //        Notify.create('正在获取个人数据，请稍后重试')
      //     }
      //   }
      // })
    },
    close() {
      window.close()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

//标签样式
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.inline-input {
  margin-left: 10px;
}
.blog-container {
  padding: 20px;
  .left-wrapper {
    float: left;
    width: calc(10% + 20px);
    .title {
      height: 50px;
      line-height: 50px;
      font-size: $fontSizeLg;
      color: #333;
    }
    .draft {
      position: relative;
      margin-left: 20px;
      color: $frontPostColor;
      svg {
        fill: red;
      }
      .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-right: 30px;
        cursor: pointer;
        height: 40px;
        line-height: 40px;
      }
      .delete {
        position: absolute;
        width: 25px;
        right: 5px;
        top: 33%;
        cursor: pointer;
      }
    }
  }
  .right-wrapper {
    float: left;
    width: 75%;
    margin-right: 20px;
    .inline-form {
      display: flex;
    }
  }
}
</style>
