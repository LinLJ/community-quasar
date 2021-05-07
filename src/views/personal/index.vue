<template>
  <div class="row q-pa-md">
    <div class="col-8 person-box">11</div>
    <div class="col-4">11</div>

  </div>
  <!-- <tdf-scroll-load :on-touch-bottom="getScoreInfos" :is-loaded-all="allLoaded">
    <div v-for="item in score" :key="item.id" class="score">
      <span>{{ item.pointsName }}获取总积分为{{ item.score }}</span>
    </div>
  </tdf-scroll-load> -->
</template>

<script>
import { getScoreInfos } from '@/api/personal'
export default {
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
.person-box{
  background: white;
}
.score {
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
}
</style>
