<template>
  <div class="pc-screan-width">
    <div class="row q-pt-xs q-px-md">

      <div class="col q-px-xs q-py-lg">
        <q-form ref="form" :model="question">
          <div class="colum">
            <div class="row">
              <div class="col-1 text-center text-weight-bolder q-pt-sm">
                标题:
              </div>
              <div class="col-4"><q-input dense outlined v-model="question.title" /></div>
                            <div class="col-1 text-center q-pt-sm">标签:</div>
              <div class="col-4"><q-input dense outlined v-model="text" /></div>

            </div>

            <div class="row q-pt-lg">
              <div class="col-1 text-center q-pt-sm">正文</div>
              <div class="col-11">
                <tdf-md-editor
                  :config="config"
                  :init-md-content="question.content"
                  ref="editor"
                ></tdf-md-editor>
              </div>
            </div>
            <div class="row q-pt-lg q-pl-xl">
              <div class="q-px-sm"><q-btn @click="publishQuestion">发布</q-btn></div>

              <div class="q-px-sm"><q-btn @click="close">取消</q-btn></div>
            </div>
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script>

import { evaTrash2Outline } from '@quasar/extras/eva-icons'
import { questionPublish, getQuestion, isAuthor } from '@/api/faq'
import { getPersonalInfo } from '@/api/personal'

export default {
  data() {
    return {
      state: 0,
      question: {
        baseUrl: undefined,
        baseUrlState: undefined,
        categoryId: undefined,
        content: undefined,
        createTime: undefined,
        deleteFlag: undefined,
        id: undefined,
        lastTime: undefined,
        originalFlag: undefined,
        readCount: undefined,
        replyCount: undefined,
        stickOrder: undefined,
        subTitle: undefined,
        tags: undefined,
        takeAnswer: undefined,
        ticketCount: undefined,
        title: undefined,
        titleSearch: undefined,
        token: undefined,
        updateTime: undefined,
        userId: undefined,
        userName: undefined,
        userUrl: undefined,
        userUrlState: undefined,
        validFlag: undefined
      },
      config: this.$_global('EDITOR_TEXT_CONFIG'),
      publishLoading: false,
      isAuthor:false,
      restaurants:[],
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',

    }
  },
  created() {
    this.evaTrash2Outline = evaTrash2Outline
  },
  mounted() {
    this.restaurants = this.loadAll();
    if (this.$route.params.id) {
      this.question.id = this.$route.params.id
      this.nowIsEdit()
    } else {
      this.getPersonalInfo()
    }
  },
  methods: {
    //添加标签
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        console.log(_);
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {

      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      console.info("dynamicTags",this.dynamicTags)
      this.question.tags=this.dynamicTags;

      this.inputVisible = false;
      this.inputValue = '';
    },

    //标签提示：
    querySearch(queryString, cb){

      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      //console.log("queryString:",queryString);
      //console.log("cb:",cb);
      //console.log("results:",results);
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        { "value": "TDF Cloud" },
        { "value": "TDF" },
        { "value": "TDF Blockchain" },
        { "value": "河图可视化" },
        { "value": "GIS云平台" },
        { "value": "业务流程管理平台" },
      ];
    },
    handleSelect(item) {
      console.log(item)
      this.handleInputConfirm()
    },

    nowIsEdit() {
      isAuthor(this.question.id).then(response => {
        this.isAuthor = response.data
        if(this.isAuthor){
          getQuestion(this.question.id).then(response => {
            this.question = response.data.contentInfo
            this.state = 1
            this.$refs.editor.setValue(this.question.content)
            this.isAuthor=false
            console.log("response.data.tags",response.data.contentInfo.tags);
            this.dynamicTags=response.data.contentInfo.tags;
          }).catch(() => {})
        }else {
          this.$q.notify('不是本人，将跳转首页')
          this.$router.push({
            name: 'home',
            component: () => import('@/views/home/index')
          })
        }
      }).catch(() => {
        console.info("查询是否为问题作者错误")
      })


    },
    getPersonalInfo() {
      getPersonalInfo().then(response => {
        this.question.userId = response.data.userId
        this.question.userName = response.data.userName
      }).catch(() => {})
    },
    publishQuestion() {
      this.question.content = this.$refs.editor.getValue()
      if (this.question.userId) {
            this.publishLoading = true
            questionPublish( this.question ).then(() => {
              this.$q.notify('发表成功')
              this.question.tags=""
              this.$router.push({
                name: 'faqList'
              })
            }).catch(() => {
            }).finally(() => {
              this.publishLoading = false
            })
          } else {
            this.$q.notify('正在获取个人数据，请稍后重试')
          }
      // this.$refs.form.validate(valid => {
      //   if (valid) {
      //     if (this.question.userId) {
      //       this.publishLoading = true
      //       questionPublish( this.question ).then(() => {
      //         this.$q.notify('发表成功')
      //         this.question.tags=""
      //         this.$router.push({
      //           name: 'faqList'
      //         })
      //       }).catch(() => {
      //       }).finally(() => {
      //         this.publishLoading = false
      //       })
      //     } else {
      //       this.$q.notify('正在获取个人数据，请稍后重试')
      //     }
      //   }
      // })
    }
  }
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
