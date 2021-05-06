<template>
  <div>
    <div class="row q-pt-xs">
      <div class="col-8 q-pa-lg">
        <tdf-title :data="blog"></tdf-title>
      </div>
      <div class="col-4 q-pa-lg">
        <tdf-box class="text-h6" showBorder content="最新发布文章">
          <tdf-list rounded :list="lastestArtical"></tdf-list>
        </tdf-box>
      </div>
    </div>
  </div>
</template>

<script>
import { getBlog,getLastReply } from '@/api/blog'
export default {
  data() {
    return {
      
      lastestArtical: [],
      lastReplyLoading: false,
      blogLoading: false,
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
            readCount: undefined
          }
        },
    }
  },
  created() {
    this.getBlog(this.$route.params.id)
    this.getLastReply()
  },
  methods: {
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
        getBlog(id).then(response => {
          this.blog = response.data
          document.title = "博客-" + this.blog.contentInfo.title;
          this.blog.contentInfo.tags = this.blog.contentInfo.tags.replace(/，/ig, ',').split(',')
        }).finally(() => {
          this.blogLoading = false
        })
      },
  },
}
</script>

<style></style>
