<template>
  <div class="forum-container">
    <q-form ref="form" :model="answer" :rules="rules" label-width="50px">
      <q-form-item label="正文" prop="content" size="medium">
        <tdf-md-editor
          :config="config"
          :init-md-content="answer.content"
          ref="editor"
        />
      </q-form-item>
      <q-form-item>
        <q-btn :loading="editLoading" @click="handleEdit">发布</q-btn>
      </q-form-item>
    </q-form>
  </div>
</template>

<script>
import { addAnswer, getAnswers } from '@/api/faq'

export default {
  name: 'QuestionPublish',
  components: {},
  data() {
    return {
      questionId: undefined,
      answerId: undefined,
      answerPage: 1,
      answer: {
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
      config: this.$_global('EDITOR_COMMENT_CONFIG'),
      editLoading: false,
      rules: {
        content: [
          {
            required: true,
            message: '请输入回答正文',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  mounted() {
    this.questionId = this.$route.params.questionId
    this.answerId = this.$route.params.answerId
    this.nowIsEdit()
  },
  methods: {
    nowIsEdit() {
      getAnswers({ id: this.questionId, page: this.answerPage })
        .then((response) => {
          const answer = response.data.contentInfo.find(
            (item) => item.id === this.answerId
          )
          if (answer) {
            this.answer = answer
            this.$refs.editor.setValue(this.answer.content)
          } else {
            this.answerPage++
            this.nowIsEdit()
          }
        })
        .catch(() => {})
    },
    handleEdit() {
      this.answer.content = this.$refs.editor.getValue()
      if (this.answer.content.length < 5) {
        this.$q.notify('字数不能少于5个')
        return
      }
      this.editLoading = true
      for (let key in this.answer) {
        if (!this.answer[key]) {
          this.answer[key] = undefined
        }
      }
      addAnswer(this.answer)
        .then(() => {
          this.$q.notify('修改成功')
          this.$router.push({
            name: 'faqView',
            params: { id: this.questionId },
          })
        })
        .catch(() => {})
        .finally(() => {
          this.editLoading = false
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.forum-container {
  padding: 20px 10%;
  .post-input {
    width: 100%;
  }
}
</style>
