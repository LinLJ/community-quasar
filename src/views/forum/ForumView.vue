<template>
  <div class="row q-pt-xs">
    <div class="col-8 q-pa-lg">
      <div class="q-pa-md">
        <div class="q-pb-sm text-h6">
          <a @click="gotoAllForum()">返回全部讨论组</a>
        </div>

        <div class="show-border text-h6 q-pa-sm">
          <div class="row">
            <img class="forum-height col-1" :src="forumInfo.forumLog" />
            <div class="col-11">
              <div class="text-subtitle2">
                {{ forumInfo.forumName }} 类别：{{
                  forumInfo.forumCategoryName
                }}
              </div>
              <div class="hw-100 text-body2">
                {{ forumInfo.forumDescription }}
              </div>
            </div>
          </div>
          <q-separator inset />
          <div class="row">
            <div>管理员:{{ forumInfo.userName }}</div>
            <div v-if="!belongToForum"><q-btn  @click="handleJoin">加入</q-btn></div>
            <div v-else>
              <q-btn @click="handleMakePost">发帖</q-btn>
              <q-btn @click="handleQuit">退出</q-btn>
            </div>
          </div>
        </div>
        <div class="q-pt-md">
          <div class="show-border q-pt-md">
            <tdf-scroll-load
              :on-touch-bottom="getForumPosts"
              :is-loaded-all="isLastPage"
              class="width-auto q-py-none q-px-xs"
            >
              <div
                class="show-border q-py-md q-px-sm favorite"
                v-for="(item, index) in forumPosts"
                :key="index"
              >
                <div class="title">
                  <router-link
                    :to="{ name: 'forumPostView', params: { id: item.id } }"
                    target="_blank"
                    class="link text-dark a-decoration-none"
                  >
                    <div>{{ item.title }}</div>
                    <span class="name">{{ item.createTime }}</span>
                    <span class="name">访问数:{{ item.readCount }}</span>
                    <span class="name">回复数{{ item.replyCount }}</span>
                    
                    </router-link>
                    <div class="text-right"><a @click="gotoPersonView(item.userId)">{{ item.userName }} </a></div>

                    <div v-if="isOwner">
 -->
                    <el-dropdown trigger="click" @command="handleCommand">
                      <span class="el-dropdown-link">
                        管理<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <!-- TODO 使用quasar菜单 -->
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="{ index: 0, item }">{{ item.stickOrder ? '取消置顶' : '置顶' }}</el-dropdown-item>
                        <el-dropdown-item :command="{ index: 1, item }">{{ item.validFlag ? '取消加精' : '加精' }}</el-dropdown-item>
                        <el-dropdown-item :command="{ index: 2, item }">删帖</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                  
                </div>
              </div>
            </tdf-scroll-load>
          </div>
        </div>
      </div>
    </div>

    <div class="col-4 q-pa-lg">
      <tdf-box class="text-h6" showBorder content="小组成员">
        <tdf-scroll-load
          :on-touch-bottom="getFollowers"
          :is-loaded-all="allLoaded"
          class="width-auto"
        >
          <div class="row">
            <div
              class="my-card q-pa-md"
              v-for="(item, index) in members"
              :key="index"
              :body="item"
            >
              <q-avatar rounded>
                <img :src="item.avatar ? item.avatar : img_avatar" />
              </q-avatar>
              <router-link
                :to="{ name: 'space', params: { id: item.userId } }"
                class="name q-py-xs a-decoration-none"
              >
                <div class="text-caption margin-auto">
                  {{ item.userName }}
                </div>
              </router-link>
            </div>
          </div>
        </tdf-scroll-load>
      </tdf-box>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { login } from '@/utils/oauthLogin'
import {
  getForumInfo,
  getForumPosts,
  getForumMembers,
  isBelongToFurom,
  joinForum,
  quitForum,
  delForumPost,
  setBestPost,
  setTopPost,
} from '@/api/forum'
import { getPersonalInfo } from '@/api/personal'
export default {
  data() {
    return {
      page: 1,
      forumInfo: {
        id: undefined,
        forumName: undefined,
        forumDescription: undefined,
        createTime: undefined,
        userId: undefined,
        userName: undefined,
        forumCategoryId: undefined,
        forumCategoryName: undefined,
        forumLog: undefined,
        forumQRCode: undefined,
        deleteFlag: undefined,
        memberCount: undefined,
        token: undefined,
      },
      forumPosts: [],
      members: [],
      personalInfo: {},
      memberLoading: false,
      forumInfoLoading: false,
      qRCodeShow: false,
      belongToForum: false,
      joinLoading: false,
      isOwner: false,
      isLastPage: false,
    }
  },
  computed: {
    isDesktop() {
      return this.$store.getters.device === 'desktop'
    },
    currentId() {
      return this.$route.params.id
    },
    ...mapGetters(['isLogin']),
  },
  created() {
    this.getForumInfo()
    this.getForumMembers()
    this.$on('isLogin', () => {
      if (!this.isLogin) {
        login(this.$route.fullPath)
      }
    })
    if (this.isLogin) {
      // 登陆回来 获取相关信息
      this.isBelongToFurom()
      this.getPersonalInfo() // 个人信息
    }
    this.$on('isOwner', () => {
      if (this.forumInfo.userName === this.personalInfo.userName) {
        this.isOwner = true
      }
    })
  },
  methods: {
    gotoAllForum() {
      this.$router.push({
        name: 'forumList',
        component: () => import('@/views/forum/ForumList'),
      })
    },
    getPersonalInfo() {
      getPersonalInfo()
        .then((response) => {
          this.personalInfo = response.data
          this.$emit('isOwner')
        })
        .catch(() => {})
    },
    isBelongToFurom() {
      isBelongToFurom(this.currentId)
        .then((response) => {
          this.belongToForum = response.data
        })
        .catch(() => {
          this.belongToForum = true
        })
    },
    getForumInfo() {
      this.forumInfoLoading = true
      getForumInfo(this.currentId)
        .then((response) => {
          this.forumInfo = response.data
          this.$emit('isOwner')
        })
        .finally(() => {
          this.forumInfoLoading = false
        })
    },
    getForumPosts() {
      return getForumPosts({ id: this.currentId, page: this.page })
        .then((response) => {
          this.isLastPage = response.data.isLast
          this.forumPosts.push(...response.data.content)
          this.page++
        })
        .catch((err) => {
          throw err
        })
    },
    getForumMembers() {
      this.memberLoading = true
      getForumMembers(this.currentId)
        .then((response) => {
          this.members = response.data
        })
        .finally(() => {
          this.memberLoading = false
        })
    },
    handleJoin() {
      //this.$emit('isLogin')
      this.joinLoading = true
      joinForum(this.currentId)
        .then(() => {
          this.belongToForum = true
        })
        .catch(() => {})
        .finally(() => {
          this.joinLoading = false
        })
    },
    handleQuit() {
      this.joinLoading = true
      quitForum(this.currentId)
        .then(() => {
          this.belongToForum = false
        })
        .catch(() => {
          this.$_message.error('退出失败')
        })
        .finally(() => {
          this.joinLoading = false
        })
    },
    handleMakePost() {
      let routeUrl = this.$router.resolve({
        name: 'ForumPostNew',
        params: { id: this.forumInfo.id },
      })
      window.open(routeUrl.href, '_blank')
    },
    handleCommand({ index, item }) {
      switch (index) {
        case 0:
          this.setTop(item)
          break
        case 1:
          this.setBest(item)
          break
        case 2:
          this.delForumPost(item.id)
          break
      }
    },
    setTop(item) {
      setTopPost({ id: item.id, value: Number(!item.stickOrder) })
        .then(() => {
          this.freshPosts()
        })
        .catch(() => {})
    },
    setBest(item) {
      setBestPost({ id: item.id, value: Number(!item.validFlag) })
        .then(() => {
          this.freshPosts()
        })
        .catch(() => {})
    },
    delForumPost(id) {
      delForumPost(id)
        .then(() => {
          this.freshPosts()
        })
        .catch(() => {})
    },
    freshPosts() {
      this.page = 1
      this.isLastPage = false
      this.forumPosts = []
      this.$refs.scrollLoad.refreshData()
    },
    gotoPersonView(id) {
      debugger
      this.$router.push({
        name: 'space',
        params: {
          id,
        },
      })
    },
  },
}
</script>

<style></style>
