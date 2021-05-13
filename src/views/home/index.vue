<template>
  <div>
    <div class="row q-pt-xs">
      <div class="col-12 col-md-8 q-pl-lg">
        <tdf-news-carousel
          height="200px"
          titleText="text-h6"
          showTitle
          titleShadow
          arrows
          :list="advertising"
        ></tdf-news-carousel>
        <q-separator inset />
        <div class="row justify-between">
          <div class="q-pa-md text-h6 col-4">成果共享</div>
          <q-icon name="ion-heart"></q-icon>
          <q-icon name="ion-logo-npm"></q-icon>
          <div class="q-pa-md text-subtitle2 col-4 text-right" right>更多</div>
        </div>
        <q-separator inset />
        <tdf-page-cards :list="achievement" img="top"></tdf-page-cards>

        <tdf-box
          class="text-h6"
          showBorder
          showDownward
          showHeight="360px"
          content="讨论组"
        >
          <tdf-page-cards :list="forumGroups" img="left"></tdf-page-cards>
        </tdf-box>
        <tdf-box class="text-h6" content="最新话题">
          <tdf-list :list="newestForums"></tdf-list>
        </tdf-box>
      </div>

      <div v-if="!$q.platform.is.mobile" class="col-md-4 q-pr-lg">
        <tdf-user-card v-if="isLogin" :personal="personal" />
        <tdf-box class="text-h6" showBorder content="社区排行榜"></tdf-box>
        <tdf-box class="text-h6" showBorder content="博客推荐">
          <tdf-list rounded :list="recommendBlogs"></tdf-list>
        </tdf-box>
        <tdf-box class="text-h6" showBorder content="最新文章">
          <tdf-list rounded :list="newestBlogs"></tdf-list>
        </tdf-box>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import {
  getInfolinksByAchievements,
  getInfolinksByAdvertisings,
  getInfolinks,
  getForumGroups,
  getNewestForums,
  getRecommendBlogs,
  getNewestBlogs,
} from '@/api/home'
import { getPersonalInfo } from '@/api/personal'

export default {
  data() {
    return {
      advertising: [],
      achievement: [],
      recommendBlogs: [],
      newestBlogs: [],
      newestForums: [],
      forumGroups: [],
      personal: {},
    }
  },
  created() {
    this.getAdvertising()
    this.getAchievement()
    this.getRecommendBlogs()
    this.getNewestBlogs()
    this.getNewestForums()
    this.getForumGroups()
    this.getPersonalInfo()
  },
  computed: {
    ...mapGetters(['isLogin']),
  },
  methods: {
    getAdvertising() {
      // 左侧广告轮播
      getInfolinksByAdvertisings()
        .then((response) => {
          const id = response.data
          getInfolinks(id)
            .then((res) => {
              this.advertising = res.data
            })
            .catch(() => {})
        })
        .catch(() => {})
    },
    getAchievement() {
      // 左侧成果共享
      getInfolinksByAchievements()
        .then((response) => {
          const id = response.data
          getInfolinks(id)
            .then((res) => {
              this.achievement = res.data
            })
            .catch(() => {})
        })
        .catch(() => {})
    },
    getRecommendBlogs() {
      // 右侧博客推荐
      getRecommendBlogs()
        .then((response) => {
          this.recommendBlogs = response.data
        })
        .catch(() => {})
    },
    getNewestBlogs() {
      // 右侧最新文章
      getNewestBlogs()
        .then((response) => {
          this.newestBlogs = response.data
        })
        .catch(() => {})
    },
    getNewestForums() {
      // 左侧最新话题
      getNewestForums()
        .then((response) => {
          this.newestForums = response.data
        })
        .catch(() => {})
    },
    getForumGroups() {
      // 左侧讨论组
      getForumGroups()
        .then((response) => {
          this.forumGroups = response.data
        })
        .catch(() => {})
    },
    getPersonalInfo() {
      getPersonalInfo()
        .then((response) => {
          this.personal = response.data
        })
        .catch(() => {})
    },
  },
}
</script>
