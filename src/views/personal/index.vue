<template>
  <div class="row q-pt-lg">
    <div class="col-12 col-md-8">
      <div>
        <q-splitter v-if="!$q.screen.lt.md" v-model="splitterModel">
          <template v-slot:before>
            <q-tabs v-model="tab" vertical mobile-arrows class="text-teal fixed">
              <q-tab name="blog" label="我的博客" />
              <q-tab name="post" label="我的帖子" />
              <q-tab name="question" label="我的问答" />
              <q-tab name="forum" label="我的小组" />
              <q-tab name="favorites" label="我的收藏夹" />
              <div style="height: 30px"></div>
              <q-tab name="follower" label="关注的人" />
              <q-tab name="followed" label="粉丝列表" />
              <q-tab name="point" label="积分状态" />
              <q-tab name="notify" label="消息历史" />
              <q-tab name="setting" label="设置" />
            </q-tabs>
          </template>

          <template v-slot:after>
            <q-tab-panels
              v-model="tab"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel name="blog">
                <personal-blog />
              </q-tab-panel>
              <q-tab-panel name="post">
                <personal-post />
              </q-tab-panel>
              <q-tab-panel name="question">
                <q-tabs
                  v-model="questionTab"
                  dense
                  align="left"
                  :breakpoint="0"
                >
                  <q-tab name="question" label="我的提问" />
                  <q-tab name="answer" label="我的回答" />
                  <q-tab name="questionFollow" label="关注问题" />
                </q-tabs>
                <q-tab-panels v-model="questionTab">
                  <q-tab-panel name="question" class="q-px-none">
                    <personal-question />
                  </q-tab-panel>
                  <q-tab-panel name="answer" class="q-px-none">
                    <personal-answer />
                  </q-tab-panel>
                  <q-tab-panel name="questionFollow" class="q-px-none">
                    <personal-question-follow />
                  </q-tab-panel>
                </q-tab-panels>
              </q-tab-panel>
              <q-tab-panel name="forum">
                <personal-forums />
              </q-tab-panel>
              <q-tab-panel name="favorites">
                <personal-favorites />
              </q-tab-panel>
              <q-tab-panel name="follower">
                <personal-follower />
              </q-tab-panel>
              <q-tab-panel name="followed">
                <personal-followed />
              </q-tab-panel>
              <q-tab-panel name="point">
                <personal-score />
              </q-tab-panel>
              <q-tab-panel name="notify">
                <component :is="msgComponent" />
              </q-tab-panel>
              <q-tab-panel name="setting">
                <personal-setting />
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>



        <q-card v-if="$q.screen.lt.md">

        <q-tabs
          v-model="tab"
          dense
          class="text-teal"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="blog" label="我的博客" />
              <q-tab name="post" label="我的帖子" />
              <q-tab name="question" label="我的问答" />
              <q-tab name="forum" label="我的小组" />
              <q-tab name="favorites" label="我的收藏夹" />
              <div style="height: 30px"></div>
              <q-tab name="follower" label="关注的人" />
              <q-tab name="followed" label="粉丝列表" />
              <q-tab name="point" label="积分状态" />
              <q-tab name="notify" label="消息历史" />
              <q-tab name="setting" label="设置" />
        </q-tabs>

        <q-separator />
        <q-tab-panels
              v-model="tab"
              animated
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel name="blog">
                <personal-blog />
              </q-tab-panel>
              <q-tab-panel name="post">
                <personal-post />
              </q-tab-panel>
              <q-tab-panel name="question">
                <q-tabs
                  v-model="questionTab"
                  dense
                  align="left"
                  :breakpoint="0"
                >
                  <q-tab name="question" label="我的提问" />
                  <q-tab name="answer" label="我的回答" />
                  <q-tab name="questionFollow" label="关注问题" />
                </q-tabs>
                <q-tab-panels v-model="questionTab">
                  <q-tab-panel name="question" class="q-px-none">
                    <personal-question />
                  </q-tab-panel>
                  <q-tab-panel name="answer" class="q-px-none">
                    <personal-answer />
                  </q-tab-panel>
                  <q-tab-panel name="questionFollow" class="q-px-none">
                    <personal-question-follow />
                  </q-tab-panel>
                </q-tab-panels>
              </q-tab-panel>
              <q-tab-panel name="forum">
                <personal-forums />
              </q-tab-panel>
              <q-tab-panel name="favorites">
                <personal-favorites />
              </q-tab-panel>
              <q-tab-panel name="follower">
                <personal-follower />
              </q-tab-panel>
              <q-tab-panel name="followed">
                <personal-followed />
              </q-tab-panel>
              <q-tab-panel name="point">
                <personal-score />
              </q-tab-panel>
              <q-tab-panel name="notify">
                <component :is="msgComponent" />
              </q-tab-panel>
              <q-tab-panel name="setting">
                <personal-setting />
              </q-tab-panel>
            </q-tab-panels>


      </q-card>



      </div>
    </div>
    <div v-if="!$q.screen.lt.md" class="col-md-4">
      <tdf-user-card :personal="personal"></tdf-user-card>
    </div>
  </div>
  <!-- <tdf-scroll-load :on-touch-bottom="getScoreInfos" :is-loaded-all="allLoaded">
    <div v-for="item in score" :key="item.id" class="score">
      <span>{{ item.pointsName }}获取总积分为{{ item.score }}</span>
    </div>
  </tdf-scroll-load> -->
</template>

<script>
// import { getScoreInfos } from '@/api/personal'

import { getPersonalInfo } from '@/api/personal'

import img_avatar from '@/assets/avatar.png'
import PersonalBlog from './components/PersonalBlog.vue'

import PersonalPost from './components/PersonalPost.vue'
import PersonalQuestion from './components/PersonalQuestion'
import PersonalAnswer from './components/PersonalAnswer'
import PersonalQuestionFollow from './components/PersonalQuestionFollow'
import PersonalFavorites from './components/PersonalFavorites'
import PersonalForums from './components/PersonalForums'
import PersonalScore from './components/PersonalScore'
import PersonalUnreadNotify from './components/PersonalUnreadNotify'
import PersonalNotify from './components/PersonalNotify'
import PersonalFollowed from './components/PersonalFollowed'
import PersonalFollower from './components/PersonalFollower'
import PersonalSetting from './components/PersonalSetting'

export default {
  name: 'Personal',
  components: {
    PersonalBlog,
    PersonalPost,
    PersonalQuestion,
    PersonalAnswer,
    PersonalQuestionFollow,
    PersonalFavorites,
    PersonalForums,
    PersonalScore,
    PersonalUnreadNotify,
    PersonalNotify,
    PersonalFollowed,
    PersonalFollower,
    PersonalSetting,
  },

  data() {
    return {
      img_avatar,
      tab: 'blog',
      questionTab: 'question',
      splitterModel: 20,
      msgComponent: 'PersonalNotify',

      personal: {
        userId:undefined,
        blogCount: 0,
        postUrl: undefined,
        usablePoint: 0,
        avatarUrl: undefined,
        followedUrl: undefined,
        orderList: '',
        avatar: undefined,
        userName: undefined,
        pointRanking: undefined,
        annualPointRanking: undefined,
        annualPoint: undefined,
        totalPoint: undefined,
        favoriteUrl: undefined,
        followedCount: 0,
        blogUrl: undefined,
        unreadNotifiesURL: undefined,
        postCount: 0,
        forumUrl: undefined,
        forumCount: 0,
        followerCount: 0,
        unreadNotifies: 0,
        favoriteCount: 0,
      },
      // score: [],
      // listQuery: {
      //   page: 1,
      // },
      // allLoaded: false,
    }
  },
  created() {
    this.getPersonalInfo()
    this.msg = this.$route.query.msg
    this.msgComponent =
      this.msg === '0' ? 'PersonalNotify' : 'PersonalUnreadNotify'
    this.tab = this.$route.query.tab || this.tab
    document.title = '个人中心 - 太极开发者社区'
    console.info(
        'create',
        this.$route,
        this.msgComponent,
        this.$route.query.tab
      )
  },
  watch: {
    $route(route) {
      console.info(
        'watch',
        route,
        this.$route,
        route.query.msg,
        this.msgComponent,
        this.$route.query.tab
      )
      this.msg = route.query.msg
      this.msgComponent =
        this.msg === '0' ? 'PersonalNotify' : 'PersonalUnreadNotify'

      this.tab = this.$route.query.tab || this.tab
    },
  },
  methods: {
    getPersonalInfo() {
      getPersonalInfo()
        .then((response) => {
          this.personal = response.data
          console.info(this.personal.userId,"this.personal")
        })
        .catch(() => {})
    },
    // getScoreInfos() {
    //   return getScoreInfos(this.listQuery)
    //     .then((response) => {
    //       this.score = this.score.concat(response.data.content)
    //       if (response.data.isLast) {
    //         this.allLoaded = true
    //       }
    //       this.listQuery.page++
    //     })
    //     .catch((err) => {
    //       throw err
    //     })
    // },
  },
}
</script>

<style lang="scss" scoped>
.avatar-height {
  height: 300px;
}

// .score {
//   box-sizing: border-box;
//   border: 1px solid #eaeaea;
//   padding: 20px;
//   transition: all 0.2s;
//   margin-bottom: -1px;
//   &:hover {
//     border-color: #3399cc;
//     background-color: #fbfdff;
//     position: relative;
//   }
// }
</style>
