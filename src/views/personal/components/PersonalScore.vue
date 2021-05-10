<template>
  <tdf-scroll-load :on-touch-bottom="getScoreInfos" :is-loaded-all="allLoaded">
    <div
      class="show-border q-py-md q-px-sm favorite"
      v-for="(item, index) in score"
      :key="index"
    >
            <span>{{ item.pointsName }} 积分变化为{{ item.score}}</span>

    </div>
  </tdf-scroll-load>
</template>

<script>
import { getScoreInfos } from '@/api/personal'

export default {
  name: 'PersonalPost',

  data() {
    return {
      score: [],
      listQuery: {
        page: 1,
      },
      allLoaded: false,
    }
  },
  methods: {
    getScoreInfos() {
      return getScoreInfos(this.listQuery)
        .then((response) => {
          this.score = this.score.concat(response.data.content)
          if (response.data.isLast) {
            this.allLoaded = true
          }
          this.listQuery.page++
        })
        .catch((err) => {
          throw err
        })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';

.blog-item {
  box-sizing: border-box;
  border: 1px solid #eaeaea;
  padding: 20px;
  transition: all 0.2s;
  margin-bottom: -1px;
  &:hover {
    border-color: #3399cc;
    background-color: #fbfdff;
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
