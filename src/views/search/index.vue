<template>
  <div>
    <div class="top-search">
      <div class="row">
        <q-input
        class="col-11 q-mt-md"
        v-model="listQuery.search"
        type="search"
        autocomplete
        @keyup.enter.native="handleSearch" />
      <q-btn color="primary" class="col-1 search-btn q-mt-lg" @click="handleSearch">搜索</q-btn>
      </div>
      
      <q-tabs
        v-model="tab"
        class="text-teal"
        align="left"
        @click="handleSearch"
      >
        <q-tab name="all" label="全部" />
        <q-tab name="blog" label="博客" />
        <q-tab name="post"  label="帖子" />
        <q-tab name="question"  label="问答" />
        <q-tab name="accessory"  label="附件" />
      </q-tabs>
      <!-- <el-radio-group v-model="listQuery.category" class="category" @change="handleSearch">
        <el-radio-button label="all">全部</el-radio-button>
        <el-radio-button label="blog">博客</el-radio-button>
        <el-radio-button label="post">帖子</el-radio-button>
        <el-radio-button label="question">问答</el-radio-button>
        <el-radio-button label="accessory">附件</el-radio-button>
      </el-radio-group> -->
    </div>
    <section>
      <tdf-scroll-load :on-touch-bottom="getList" :is-loaded-all="isLoadedAll" ref="scrollLoad">
        <article v-for="item in list" :key="item.id" class="result-container">
          <header class="title">
            <a v-if="item.baseUrlState === '1'" :href="item.baseUrl" target="_blank">
              <span v-html="item.title" />
            </a>
            <router-link v-else :to="item.baseUrl" target="_blank">
              <span v-html="item.title" />
            </router-link>
          </header>
          <div class="info">
            <span><svg-icon icon-class="tdc-clock" />{{ item.updateTime }}</span>
            <span><svg-icon icon-class="user" /><span v-html="item.userName" /></span>
          </div>
          <section v-html="item.content" class="content" />
        </article>
      </tdf-scroll-load>
    </section>
  </div>
</template>

<script>
import { getSearch } from '@/api/search'

export default {
  name: 'search',
  components: {  },
  data() {
    return {
      tab:"all",
      listQuery: {
        search: '',
        category: 'all',
        page: 1
      },
      list: [],
      isLoadedAll: false
    }
  },
  created() {
    this.listQuery.search = this.$route.query.keyword || ''
    this.listQuery.category = this.$route.query.category || 'all'
  },
  watch: { // 解决组件复用并不会重新刷新请求的问题
    $route() {
      this.listQuery.search = this.$route.query.keyword || ''
      this.listQuery.category = this.$route.query.category || 'all'
      this.listQuery.page = 1
      this.list = []
      this.isLoadedAll = false
      this.$refs.scrollLoad.refreshData()
    }
  },
  methods: {
    getList() {
      return getSearch(this.listQuery).then(response => {
        this.list = this.list.concat(response.data.content)
        this.isLoadedAll = response.data.isLast
        this.listQuery.page++
      }).catch(err => {
        throw err
      })
    },
    handleSearch() {
      this.$router.push({ path: '/search', query: { category: this.tab, keyword: this.listQuery.search }})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/variables';
.top-search {
  position: relative;
  padding-right: 100px;
  margin-bottom: 20px;
  .search-btn {
    position: absolute;
    right: 0;
  }
  .category {
    margin-top: 10px;
  }

}
.result-container {
  border: 1px solid $borderColor;
  padding: 20px;
  overflow: hidden;
  background-color: $mainBgColor;
  margin-bottom: -1px;
  &:hover {
    background-color: $hoverBgColor;
    border-color: $brandColor;
    position: relative;
  }
  .title {
    font-size: $fontSizeMd;
    font-weight: bold;
    color: $mainColor;
    &:hover {
      color: $brandColor;
    }
  }
  .info {
    margin-top: 10px;
    span {
      margin-right: 10px;
      svg {
        margin-right: 5px;
      }
    }
  }
  .content {
    margin-top: 10px;
    line-height: 20px;
    height: 60px;
    overflow: hidden;
    word-wrap: break-word;
  }
}
</style>
