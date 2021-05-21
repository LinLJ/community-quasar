<template>
  <div v-loading="listLoading" class="share-list">
    <div v-for="(item, index) in list" :key="index" class="share-item">
      <article class="article-wrapper">
        <header class="title">
          <a v-if="item.baseUrlState === '1'" :href="item.baseUrl" target="_blank">{{ item.title }}</a>
          <router-link v-else :to="item.baseUrl">{{ item.title }}</router-link>
        </header>
        <section>{{ item.summary }}</section>
      </article>
    </div>
  </div>
</template>

<script>
import { getLinks } from '@/api/share'

export default {
  name: 'ShareTabList',
  props: ['tabId'],
  data() {
    return {
      listLoading: false,
      list: []
    }
  },
  created() {
    this.getData()
  },
  watch: {
    tabId(val) {
      if (val) this.getData()
    }
  },
  methods: {
    getData() {
      if (this.tabId) {
        this.listLoading = true
        getLinks(this.tabId).then(response => {
          this.list = response.data
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../../styles/variables.scss';
.share-list {
  min-height: 20px;
  width:100%;
  .share-item {
    border: 1px solid $borderColor;
    margin-bottom: -1px;
    &:hover {
      background-color: $hoverBgColor;
      border-color: $brandColor;
      position: relative;
      z-index: 10;
    }
    &:last-child {
      margin-bottom: 0;
      border-radius: 0 0 5px 5px;
    }
    .article-wrapper {
      padding: 20px;
      .title {
        font-size: $fontSizeLg;
        color: $mainColor;
        font-weight: bold;
        &:hover {
          color: $brandColor;
        }
      }
    }
  }
}
</style>
