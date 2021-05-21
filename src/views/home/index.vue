<template>
  <div>
    <div class="row q-pt-xs">
      <div class="col-12 col-md-8">
        <tdf-news-carousel
          v-if="!$q.screen.lt.md"
          height="200px"
          titleText="text-h6"
          showTitle
          titleShadow
          arrows
          :list="advertising"
        ></tdf-news-carousel>
        <tdf-news-carousel
          v-if="$q.screen.lt.md"
          height="100px"
          titleText="text-caption"
          showTitle
          titleShadow
          arrows
          :list="advertising"
        ></tdf-news-carousel>

        <q-separator v-if="!$q.screen.lt.md" inset />

        <div class="row justify-between">
          <div v-if="!$q.screen.lt.md" class="q-pa-md text-h6 col-4">
            成果共享
          </div>
          <div v-else class="q-pa-xs q-pl-md text-h6 col-4">成果共享</div>
          <router-link to="/share" class="more">
            <div
              v-if="!$q.screen.lt.md"
              class="q-pa-md text-subtitle2 col-4 text-right"
              right
            >
              更多
            </div>
            <div
              v-else
              class="q-pa-xs q-pr-md text-subtitle2 col-4 text-right"
              right
            >
              更多
            </div></router-link
          >
        </div>
        <q-separator inset />
        <tdf-page-cards-for-share
          v-if="!$q.screen.lt.md"
          :list="achievement"
          height="270px"
          imgHeight="140px"
          showDescription
        ></tdf-page-cards-for-share>
        <tdf-page-cards-for-share
          v-else
          :list="achievement"
          height="150px"
          imgHeight="80px"
        ></tdf-page-cards-for-share>
        <!-- <tdf-page-cards :list="achievement" img="top"></tdf-page-cards> -->

        <tdf-box
          class="text-h6 q-py-md"
          showBorder
          showDownward
          showHeight="360px"
          content="讨论组"
        >
          <tdf-page-cards-for-forum
            :list="forumGroups"
            img="left"
          ></tdf-page-cards-for-forum>
        </tdf-box>
        <tdf-box class="text-h6 q-py-md" showBorder content="最新话题">
          <tdf-list :list="newestForums" type="post"></tdf-list>
        </tdf-box>
      </div>

      <div
        v-if="!$q.platform.is.mobile"
        class="col-md-4 q-pr-lg normal-screen-only"
      >
        <tdf-user-card class="q-pa-md" v-if="isLogin" :personal="personal" />
        <router-link to="/rank" tag="a" target="_blank" class="label no-list">
        <tdf-box
          class="text-h6 q-pa-md width-auto"
          showBorder
          content="社区排行榜"
        ></tdf-box></router-link>
 
        
        <tdf-box class="text-h6 q-pa-md" showBorder content="博客推荐">
          <tdf-list rounded :list="recommendBlogs" type="blog"></tdf-list>
        </tdf-box>
        <tdf-box class="text-h6 q-pa-md" showBorder content="最新文章">
          <tdf-list rounded :list="newestBlogs" type="blog"></tdf-list>
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
