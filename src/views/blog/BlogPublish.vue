<template>
  <div class="pc-screan-width">
    <div class="row q-pt-xs q-px-md">
      <div class="col-2 q-px-xs q-py-lg">
        <span class="q-py-md text-h6">草稿</span>
        <div v-for="item in drafts" :key="item.id" class="row">
          <div @click="handleClickDraft(item)" class="name">
            {{ item.title }}
          </div>
          <div class="flex float-right">
            <span @click="handleDelete(item.id)">
              <q-icon :name="evaTrash2Outline"></q-icon>
            </span>
          </div>
        </div>
      </div>
      <div class="col-10 q-px-xs q-py-lg">
        <q-form ref="form" :model="blog">
          <div class="colum">
            <div class="row">
              <div class="col-1 text-center text-weight-bolder q-pt-sm">
                类型:
              </div>
              <div class="col-4">
                <q-btn-dropdown
                  class="btn-hw text-primary"
                  align="between"
                  outline
                  :label="blogCatagory"
                >
                  <q-list>
                    <q-item
                      clickable
                      v-close-popup
                      @click="chooseBlogCatagory(item.value)"
                      v-for="item in options"
                      :key="item.value"
                    >
                      <q-item-section>
                        <q-item-label>{{ item.label }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </div>
              <div class="col-1 text-center text-weight-bolder q-pt-sm">
                标题:
              </div>
              <div class="col-4"><q-input dense outlined v-model="blog.title" /></div>
            </div>
            <div class="row q-pt-lg">
              <div class="col-1 text-center q-pt-sm">标签:</div>
              <div class="col-4"><q-input dense outlined v-model="text" /></div>

              <div></div>
            </div>
            <div class="row q-pt-lg">
              <div class="col-1 text-center q-pt-sm">正文</div>
              <div class="col-11">
                <tdf-md-editor
                  :config="config"
                  :init-md-content="blog.content"
                  ref="editor"
                ></tdf-md-editor>
              </div>
            </div>
            <div class="row q-pt-lg q-pl-xl">
              <div class="q-px-sm"><q-btn @click="publicBlog">发布</q-btn></div>
              <div class="q-px-sm">
                <q-btn @click="saveAsDraft">保存为草稿</q-btn>
              </div>
              <div class="q-px-sm"><q-btn @click="close">取消</q-btn></div>
            </div>
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getBlog,
  addBlog,
  getDrafts,
  isAuthor,
  delBlogDraft,
  addBlogDraft,
} from '@/api/blog'
import { getPersonalInfo } from '@/api/personal'
import { evaTrash2Outline } from '@quasar/extras/eva-icons'

export default {
  data() {
    return {
      drafts: [],
      blogCatagory: '原创',
      options: [
        {
          value: 0,
          label: '原创',
        },
        {
          value: 1,
          label: '转载',
        },
      ],
      blog: {
        baseUrl: undefined,
        baseUrlState: undefined,
        categoryId: undefined,
        content: undefined,
        createTime: undefined,
        deleteFlag: undefined,
        id: undefined,
        originalFlag: 0,
        readCount: undefined,
        replyCount: undefined,
        stickOrder: undefined,
        subTitle: undefined,
        tags: undefined,
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
      config: this.$_global('EDITOR_TEXT_CONFIG'),
      draftLoading: false,
      addDraftLoading: false,
      publishLoading: false,
      isAuthor: false,
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
    }
  },
  created() {
    this.evaTrash2Outline = evaTrash2Outline
  },
  mounted() {
    this.restaurants = this.loadAll()
    if (this.$route.params.id) {
      this.blog.id = this.$route.params.id
      this.nowIsEdit()
    } else {
      this.getPersonalInfo()
    }
    this.getDrafts()
  },
  methods: {
    //添加标签
    chooseBlogCatagory(value) {
      this.blog.originalFlag = value
      this.blog.originalFlag
        ? (this.blogCatagory = '转载')
        : (this.blogCatagory = '原创')
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick((_) => {
        console.log(_)
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      console.info('dynamicTags', this.dynamicTags)
      this.blog.tags = this.dynamicTags

      this.inputVisible = false
      this.inputValue = ''
    },

    //标签提示：
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      //console.log("queryString:",queryString);
      //console.log("cb:",cb);
      //console.log("results:",results);
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    loadAll() {
      return [
        { value: 'TDF Cloud' },
        { value: 'TDF' },
        { value: 'TDF Blockchain' },
        { value: '河图可视化' },
        { value: 'GIS云平台' },
        { value: '业务流程管理平台' },
      ]
    },
    handleSelect(item) {
      console.log(item)
      this.handleInputConfirm()
    },

    nowIsEdit() {
      isAuthor(this.blog.id)
        .then((response) => {
          this.isAuthor = response.data
          if (this.isAuthor) {
            getBlog(this.blog.id).then((response) => {
              this.blog = response.data.contentInfo
              this.dynamicTags = response.data.contentInfo.tags
              if (this.$refs.editor) {
                this.$refs.editor.setValue(this.blog.content)
              }
              this.isAuthor = false
            })
          } else {
            this.$_message.error('不是本人，将跳转首页')
            this.$router.push({
              name: 'home',
              component: () => import('@/views/home/index'),
            })
          }
        })
        .catch(() => {
          console.info('查询是否为博客作者错误')
        })
    },
    getPersonalInfo() {
      getPersonalInfo().then((response) => {
        this.blog.userId = response.data.userId
        this.blog.userName = response.data.userName
      })
    },
    handleClickDraft(item) {
      this.$refs.editor.setValue(item.content)
      this.blog = item
      this.dynamicTags = item.tags
    },
    handleDelete(id) {
      this.draftLoading = true
      delBlogDraft(id)
        .then(() => {
          this.getDrafts()
        })
        .catch(() => {
          this.draftLoading = false
        })
    },
    getDrafts() {
      this.draftLoading = true
      getDrafts()
        .then((response) => {
          this.drafts = response.data
        })
        .finally(() => {
          this.draftLoading = false
        })
    },
    publicBlog() {
      this.blog.content = this.$refs.editor.getValue()
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.blog.userId) {
            this.blog.validFlag = 1
            this.publishLoading = true
            for (let key in this.blog) {
              if (this.blog[key] === null) {
                this.blog[key] = undefined
              }
            }
            addBlog(this.blog)
              .then(() => {
                if (this.blog.baseUrl) {
                  this.$q.notify('修改成功')
                  this.$router.push({
                    path: this.blog.baseUrl,
                  })
                } else {
                  this.$q.notify('发表成功')
                  this.$router.push({
                    name: 'blogList',
                  })
                }
              })
              .catch(() => {})
              .finally(() => {
                this.publishLoading = false
              })
          } else {
            this.$q.notify('正在获取个人数据，请稍后重试')
          }
        }
      })
    },
    saveAsDraft() {
      this.blog.content = this.$refs.editor.getValue()
      this.blog.validFlag = 0
      for (let key in this.blog) {
        if (!this.blog[key] && key !== 'originalFlag') {
          this.blog[key] = undefined
        }
      }
      this.addDraftLoading = true
      addBlogDraft(this.blog)
        .then((response) => {
          console.info('添加草稿，结果：' + response)

          debugger
          this.$q.notify('添加草稿成功')
          this.blog = response.data.blog
          this.getDrafts()
        })
        .finally(() => {
          this.addDraftLoading = false
        })
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
