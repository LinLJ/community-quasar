<template>
  <div class="row q-pt-xs">
    <div class="col-12 col-md-8 q-pt-lg">
      <div class="q-pa-md">
        <div class="q-pb-sm text-h6">
          <a @click="gotoAllForum()">
            <q-icon :name="evaUndo"></q-icon>
            返回全部讨论组</a
          >
        </div>

        <div class="show-border text-h6 q-pa-sm">
          <div class="row">
            <img class="forum-logo col-1" :src="forumInfo.forumLog" />
            <div class="col-11">
              <div class="text-subtitle2">
                <span class="text-h6">{{ forumInfo.forumName }}</span>
                <span class="flex flex-right" style="float: right"
                  >类别：{{ forumInfo.forumCategoryName }}</span
                >
              </div>
              <div class="hw-100 text-caption text-grey">
                {{ forumInfo.forumDescription }}
              </div>
            </div>
          </div>
          <q-separator inset />
          <div style="display: flex; justify-content: space-between">
            <div class="text-body2 text-grey q-pa-xs">
              管理员:<a @click="gotoPersonView(forumInfo.userId)"
                >{{ forumInfo.userName }}
              </a>
            </div>
            <div class="q-pt-xs">
              <div v-if="!belongToForum">
                <q-btn color="primary" @click="handleJoin">加入</q-btn>
              </div>
              <div v-else>
                <q-btn color="positive" @click="handleMakePost">发帖</q-btn>
                <q-btn color="primary" class="q-ml-sm" @click="handleQuit"
                  >退出</q-btn
                >
              </div>
            </div>
          </div>
        </div>
        <div class=" left-area">
          <div class="show-border forum-view-item">
            <tdf-scroll-load
            ref="scrollLoad"
              :on-touch-bottom="getForumPosts"
              :is-loaded-all="isLastPage"
              class="width-auto q-py-none q-px-xs"
            >
              <div class="posts-in-forum">
                <div
                  v-for="(item, index) in forumPosts"
                  :key="index"
                  class="posts"
                >
                  <div class="img">
                    <img :src="item.avatar" width="100%" />
                  </div>
                  <div class="main">
                    <div class="meta-row">
                      <router-link
                        :to="{ name: 'forumPostView', params: { id: item.id } }"
                        class="title"
                        >{{ item.title }}
                        <span v-if="item.stickOrder" class="top">【置顶】</span>
                        <span v-if="item.validFlag" class="best">【精华】</span>
                      </router-link>
                      <span class="blue-name q-mr-md"
                        ><a @click="gotoPersonView(item.userId)"
                          >{{ item.userName }}
                        </a></span
                      >
                    </div>
                    <div v-if="!$q.screen.lt.md" class="meta-row">
                      <div class="meta-row">
                        <span class="name">{{ item.createTime }}</span>
                        <span class="name">访问数:{{ item.readCount }}</span>
                        <span class="name">回复数{{ item.replyCount }}</span>
                      </div>
                      <div v-if="isOwner">
                        <q-btn flat color="primary" label="管理">
                          <q-menu>
                            <q-list style="min-width: 100px">
                              <q-item clickable v-close-popup>
                                <q-item-section @click="setTop(item)">{{
                                  item.stickOrder ? '取消置顶' : '置顶'
                                }}</q-item-section>
                              </q-item>
                              <q-item clickable v-close-popup>
                                <q-item-section @click="setBest(item)">{{
                                  item.validFlag ? '取消加精' : '加精'
                                }}</q-item-section>
                              </q-item>
                              <q-item clickable v-close-popup>
                                <q-item-section @click="delForumPost(item.id)"
                                  >删帖</q-item-section
                                >
                              </q-item>
                            </q-list>
                          </q-menu>
                        </q-btn>
                        <!-- <el-dropdown trigger="click" @command="handleCommand">
                          <span class="el-dropdown-link">
                            管理<i
                              class="el-icon-arrow-down el-icon--right"
                            ></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="{ index: 0, item }">{{
                              item.stickOrder ? '取消置顶' : '置顶'
                            }}</el-dropdown-item>
                            <el-dropdown-item :command="{ index: 1, item }">{{
                              item.validFlag ? '取消加精' : '加精'
                            }}</el-dropdown-item>
                            <el-dropdown-item :command="{ index: 2, item }"
                              >删帖</el-dropdown-item
                            >
                          </el-dropdown-menu>
                        </el-dropdown> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div
                class=" q-px-lg q-py-xs favorite"
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
                  <div class="text-right">
                    <a @click="gotoPersonView(item.userId)"
                      >{{ item.userName }}
                    </a>
                  </div>

                  <div v-if="isOwner">
                    
                    <el-dropdown trigger="click" @command="handleCommand">
                      <span class="el-dropdown-link">
                        管理<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="{ index: 0, item }">{{
                          item.stickOrder ? '取消置顶' : '置顶'
                        }}</el-dropdown-item>
                        <el-dropdown-item :command="{ index: 1, item }">{{
                          item.validFlag ? '取消加精' : '加精'
                        }}</el-dropdown-item>
                        <el-dropdown-item :command="{ index: 2, item }"
                          >删帖</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </div>
                <q-separator inset />
              </div> -->
            </tdf-scroll-load>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!$q.screen.lt.md" class="col-md-4 q-pa-lg">
      <tdf-box class="text-h6" showBorder content="小组成员">
        <tdf-scroll-load
          :on-touch-bottom="getFollowers"
          :is-loaded-all="allLoaded"
          class="width-auto"
        >
          <div class="row">
            <div
              class="my-card q-pa-sm"
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
import { evaUndo } from '@quasar/extras/eva-icons'

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
    this.evaUndo = evaUndo
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
          this.getForumMembers()
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
          this.getForumMembers()
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

<style lang="scss" scoped>
@import '../../styles/variables.scss';
.mobile {
  width: 100% !important;
}
.left-area {
  float: left;
  width: 100%;
  .forum-return {
    font-size: $frontSizeBLg;
    color: $gotoAllForumColor;
    &:hover {
      color: $frontPostColor;
    }
  }
  .forum-view-item {
    padding: 20px;
    border: 1px solid $borderColor;
    border-radius: 4px;
    background-color: $mainBgColor;
    & + .forum-view-item {
      margin-top: 20px;
    }
  }
  .header {
    .info {
      display: flex;
      align-items: center;
      border-bottom: 1px solid $borderColor;
      padding-bottom: 10px;
      .main {
        width: calc(100% - 10px);
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
        .meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          & + .meta-row {
            margin-top: 5px;
          }
          .main-title {
            font-size: $fontSizeMd;
            color: $mainColor;
            font-weight: 600;
          }
          .name {
            font-size: $fontSizeBase;
            color: $homePostTimeColor;
          }
          .blue-name {
            font-size: $fontSizeBase;
            color: $frontNameColor;
          }
          .forum-qrcode {
            position: absolute;
            width: 200px;
            top: 80px;
            border: 1px solid $borderColor;
          }
        }
      }
    }
    .owner {
      padding-top: 5px;
      font-size: $fontSizeBase;
      color: $frontColor;
    }
  }
  .posts-in-forum {
    .posts {
      padding: 10px;
      border-bottom: 1px solid $borderColor;
      &:last-child {
        border-bottom: 0px solid $borderColor;
      }
      .img {
        width: 30px;
        display: inline-block;
      }
      .main {
        width: calc(100% - 40px);
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
        .meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 25px;
          & + .meta-row {
            .name + .name {
              text-indent: 1em;
            }
          }
          .title {
            font-size: $fontSizeBase;
            color: $frontPostColor;
            cursor: pointer;
            font-weight: 600;
            &:hover {
              color: $frontHoverColor;
            }
            .top {
              color: $mainColor;
            }
            .best {
              color: $dangerColor;
            }
          }
          .name {
            font-size: $fontSizeBase;
            color: $frontColor;
          }
          .blue-name {
            font-size: $fontSizeBase;
            color: $frontNameColor;
          }

          .el-dropdown-link {
            cursor: pointer;
            color: #409eff;
          }
        }
      }
    }
  }
}
.right-area {
  float: right;
  width: calc(30% - 20px);

  .members-in-forum {
    width: 60px;
    height: 75px;
    text-align: center;
    float: left;
    margin: 5px;
    cursor: pointer;
    .name {
      font-size: $fontSizeSm;
      color: $memberNameColor;
    }
  }
}
</style>
