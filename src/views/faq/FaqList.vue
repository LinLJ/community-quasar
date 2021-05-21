<template>
  <div>
    <div class="row q-pt-xs">
      <div class="col-12 col-md-8">
        <tdf-box class="text-h6" content="热门标签">
          <div :class="[{ 'light-dimmed': tagsLoading }]">
            <tdf-chip
              v-for="item in tags"
              :key="item.id"
              :content="item.tagName"
              :num="item.blogNum"
              @click="clickTag(item)"
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
        <q-tab-panel name="question">
          <q-tabs v-model="activeTab" dense align="left" :breakpoint="0">
            <q-tab name="answered" @click="getQuestion" label="最新回答" />
            <q-tab name="toAnswer" @click="getQuestion" label="等待回答" />
            <q-tab name="hotAnswer" @click="getQuestion" label="热门回答" />
          </q-tabs>
          <q-tab-panels v-model="activeTab">
            <q-tab-panel name="answered" class="q-px-none">
              <tdf-scroll-load :on-touch-bottom="getQuestion" :is-loaded-all="answered.isLast">
                <faq-item
                  v-for="(item, index) in answered.list"
                  :key="index"
                  :faq="item"
                />
              </tdf-scroll-load>
            </q-tab-panel>
            <q-tab-panel name="toAnswer" class="q-px-none">
              
              <tdf-scroll-load
                :on-touch-bottom="getQuestion"
                :is-loaded-all="toAnswer.isLast"
                class="width-auto"
              >
                <faq-item
                  v-for="(item, index) in toAnswer.list"
                  :key="index"
                  :faq="item"
                />
              </tdf-scroll-load>
            </q-tab-panel>
            <q-tab-panel name="hotAnswer" class="q-px-none">
              
              <tdf-scroll-load
                :on-touch-bottom="getQuestion"
                :is-loaded-all="hotAnswer.isLast"
                class="width-auto"
              >
                <faq-item
                  v-for="(item, index) in hotAnswer.list"
                  :key="index"
                  :faq="item"
                />
              </tdf-scroll-load>
            </q-tab-panel>
          </q-tab-panels>
        </q-tab-panel>
      </div>

      <div v-if="!$q.screen.lt.md" class="col-md-4 q-pa-lg">
        <div class="q-pa-md">
          <router-link :to="{ name: 'faqGuide' }">
            <q-btn
              class="text-center text-h6"
              color="primary"
              style="width: 100%; height: 50px"
              label="发布问题"
            />
          </router-link>
        </div>

        <personal-info v-if="isLogin"/>
      </div>
    </div>
  </div>
</template>

<script>
import FaqItem from './components/FaqItem'

import { getQuestions } from '@/api/faq'
import { mapGetters } from 'vuex'
import PersonalInfo from './components/PersonalInfo'
import { getTags } from '@/api/faq'

export default {
  components: {
    PersonalInfo,
    FaqItem,
  },
  data() {
    return {
      activeTab: 'answered',
      tagsLoading: false,
      tagListQuery: {
        tagName: undefined,
        search: undefined,
        page: 1,
      },
      tagPage: 1, // 从一开始
      tags: [],
      answered: {
        listQuery: {
          tagName: undefined,
          search: undefined,
          page: 1,
          state: 0,
        },
        list: [],
        isLast: false,
      },
      toAnswer: {
        listQuery: {
          tagName: undefined,
          search: undefined,
          page: 1,
          state: 1,
        },
        list: [],
        isLast: false,
      },
      hotAnswer: {
        listQuery: {
          tagName: undefined,
          search: undefined,
          page: 1,
          state: 2,
        },
        list: [],
        isLast: false,
      },
    }
  },
  computed: {
    isDesktop() {
      return this.$store.getters.device === 'desktop'
    },
    ...mapGetters(['isLogin']),
  },
  created() {
    this.getTags()
    // this.getQuestion()
    document.title = '问答 - 太极开发者社区'
  },
  methods: {
    getQuestion() {
      console.log(this.activeTab, 'this.activeTab')
      let obj
      switch (this.activeTab) {
        case 'answered':
          obj = this.answered
          break
        case 'toAnswer':
          obj = this.toAnswer
          break
        case 'hotAnswer':
          obj = this.hotAnswer
          break
      }
      return getQuestions(obj.listQuery)
        .then((response) => {
          obj.listQuery.page++
          obj.list.push(...response.data.content)
          obj.isLast = response.data.isLast
          console.info(this.answered,this.toAnswer,this.hotAnswer)
        })
        .catch((err) => {
          throw err
        })
    },
    loadMoreTag() {
      this.tagPage++
      this.getTags()
    },
    clickTag(tag) {
      this.answered.listQuery.page = 1
      this.answered.listQuery.tagName = tag.tagName

      this.toAnswer.listQuery.page = 1
      this.toAnswer.listQuery.tagName = tag.tagName

      this.hotAnswer.listQuery.page = 1
      this.hotAnswer.listQuery.tagName = tag.tagName

      this.answered.list = []
      this.toAnswer.list = []
      this.hotAnswer.list = []
      this.getQuestion()
    },
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
  },
}
</script>

<style lang="scss">
a {
  text-decoration: none;
}
</style>
