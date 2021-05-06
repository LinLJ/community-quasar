<template>
  <div>
    <div class="row q-pt-xs">
      <div class="col-8 q-pl-lg">
        <tdf-box class="text-h6" content="热门标签">
          <div :class="[{ 'light-dimmed': tagsLoading }]">
            <tdf-chip
              v-for="item in tags"
              :key="item.id"
              :content="item.tagName"
              :num="item.blogNum"
              @click="clickTag"
            ></tdf-chip>
            <tdf-chip
              v-show="tags.length > 0"
              content="更多"
              @click="loadMoreTag"
            ></tdf-chip>
          </div>
          <div v-show="tagsLoading" class="text-center">
            <tdf-loading></tdf-loading>
          </div>
        </tdf-box>
        <tdf-box class="text-h6" content="最新话题"> </tdf-box>
        <tdf-loading-scroll @loadMore="getBlogList">
          <tdf-box-detail
            v-for="(item, index) in blogs"
            :key="index"
            :body="item"
          ></tdf-box-detail>
        </tdf-loading-scroll>
      </div>

      <div class="col-4 q-pa-lg">
        <div class="q-pa-md">
          <q-btn
            @click="publishBlog"
            class="text-center text-h6"
            color="primary"
            style="width: 100%; height: 50px"
            label="发布博客"
          />
        </div>

        <tdf-box class="text-h6" showBorder content="博客推荐">
          <tdf-list rounded :list="lastestArtical"></tdf-list>
        </tdf-box>
        <tdf-box class="text-h6" showBorder content="友情链接">
          <div class="row">
            <div
              class="col-3 text-body2 q-py-md text-center"
              v-for="(item, index) in links"
              :key="index"
            >
              <a class="text-center text-primary" :href="item.baseUrl">{{
                item.title
              }}</a>
            </div>
          </div>
        </tdf-box>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecomment, getTags, getBlogList, getFriendHref } from '@/api/blog'

export default {
  data() {
    return {
      listQuery: {
        tagName: undefined,
        search: undefined,
        page: 1,
      },
      tagPage: 1,
      tags: [],
      blogs: [],
      tagsLoading: false,
      isLastPage: false,
      loadingBlogs: true,
      lastestArtical: [],
      links: [],
    }
  },
  created() {
    this.getTags()
    this.getBlogList()
    this.getRecomment()
    this.getFriendHref()
    document.title = '博客 - 太极开发者社区'
  },
  methods: {
    getTags() {
      this.tagsLoading = true
      getTags(this.tagPage)
        .then((response) => {
          this.tags.push(...response.data.content)
        })
        .finally(() => {
          this.tagsLoading = false
        })
    },

    loadMoreTag() {
      this.tagPage++
      this.getTags()
    },
    getBlogList() {
      return getBlogList(this.listQuery)
        .then((response) => {
          console.info(response, '============')
          this.isLastPage = response.data.isLast
          this.blogs.push(...response.data.content) // 搜索不是滚动加载
          console.info(
            this.blogs,
            'this.tagsthis.tagsthis.tagsthis.tagsthis.tagsthis.tagsthis.tagsthis.tagsthis.tagsthis.tagsthis.tags'
          )
          this.listQuery.page++
        })
        .finally(() => {
          this.loadingBlogs = false
        })
        .catch((err) => {
          throw err
        })
    },
    getRecomment() {
      this.recommentLoading = true
      getRecomment()
        .then((response) => {
          this.lastestArtical = response.data
        })
        .finally(() => {
          this.recommentLoading = false
        })
    },
    getFriendHref() {
      this.linksLoading = true
      getFriendHref()
        .then((response) => {
          this.links = response.data
        })
        .finally(() => {
          this.linksLoading = false
        })
    },
    clickTag(tag) {
      this.listQuery.page = 1
      this.listQuery.tagName = tag.tagName
      this.blogs = []
      this.getBlogList()
    },
    publishBlog() {
      let routeUrl = this.$router.resolve({
        name: 'BlogNew',
      })
      window.open(routeUrl.href, '_blank')
    },
  },
}
</script>

<style lang="scss">
a {
  text-decoration: none;
}
</style>
