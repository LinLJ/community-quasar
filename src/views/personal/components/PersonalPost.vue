<template>
  <tdf-scroll-load :on-touch-bottom="getPosts" :is-loaded-all="allLoaded" class="width-auto">
    <tdf-box-detail
      v-for="(item, index) in posts"
      :key="index"
      :body="item"
    ></tdf-box-detail>
  </tdf-scroll-load>

</template>

<script>
import { getForumPosts } from '@/api/personal'

export default {
  name: 'PersonalPost',

  data() {
    return {
      posts: [],
      listQuery: {
        page: 1,
      },
      allLoaded: false,
    }
  },
  methods: {
    getPosts(){
      return getForumPosts(this.listQuery).then(response => {
        this.posts = this.posts.concat(response.data.content)
        if (response.data.isLast) {
          this.allLoaded = true
        }
        this.listQuery.page++
      }).catch(err => {
        throw err
      })
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../../../styles/variables.scss";

.blog-item {
  box-sizing: border-box;
  border: 1px solid #EAEAEA;
  padding: 20px;
  transition: all 0.2s;
  margin-bottom: -1px;
  &:hover {
    border-color: #3399CC;
    background-color: #FBFDFF;
    position: relative;
  }
  &:last-child {
    margin-bottom: 0;
  }
  .title {
    color: $mainColor;
    font-size: $fontSizeMd;
    font-weight: 700;
    transition: all 0.2s;
    &:hover {
      color: $brandColor;
    }
  }
  .content {
    font-size: $fontSizeSm;
    color: $subColor;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    line-height: 20px;
    height: 60px;
  }
  .meta {
    color: $subColor;
    font-size: $fontSizeSm;
    margin: 10px 0;
    .origin-flag {
      color: $routineColor;
      border: 1px solid $borderColor;
      padding: 2px 5px;
      margin-right: 10px;
    }
  }
}
</style>
