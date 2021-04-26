<template>
  <div>
    <div class="row q-pt-xs">
      <div class="col-8 q-pl-lg">
        <tdf-news-carousel
          height="200px"
          titleText="text-h6"
          showTitle="true"
          titleShadow
          :list="achievement"
          :slide="achievement[0].linkId"
        ></tdf-news-carousel>
        <tdf-page-cards></tdf-page-cards>
      </div>
      <div class="col-4 q-pr-lg">
        <tdf-user-card />
      </div>
    </div>
  </div>
</template>

<script>
import { getInfolinksByAchievements, getInfolinks } from '@/api/home'

export default {
  data() {
    return {
      achievement: [],
    }
  },
  created() {
    this.getAchievement()
  },
  methods: {
    getAchievement() {
      // 左侧成果共享
      getInfolinksByAchievements()
        .then((response) => {
          const id = response.data
          getInfolinks(id)
            .then((res) => {
              console.info(res.data, 'res.data')
              this.achievement = res.data
            })
            .catch(() => {})
        })
        .catch(() => {})
    },
  },
}
</script>

<style></style>
