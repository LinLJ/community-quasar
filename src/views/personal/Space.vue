<template>
  <div class="content-wrap space">
    <div class="main-content" :class="{'mobile':isMobile}">
      <q-card class="box-card">
        <template #header>
          <header class="space-header">{{ personInfo.username }}的空间</header>
        </template>
        <el-tabs v-model="activeTab" type="card">
          <el-tab-pane label="博客" name="blog">
            <tdf-scroll-load :on-touch-bottom="getBlogsByUser" :is-loaded-all="allLoaded" ref="blogList">
              <space-blog-item v-for="item in blogs" :key="item.id" :blog="item"/>
            </tdf-scroll-load>
          </el-tab-pane>
        </el-tabs>
      </q-card>
    </div>
    <aside class="aside-content" v-if="!isMobile">
      <space-personal
        :personal="personInfo"
        :on-followed="followed"
        :on-delete-followed="removeFollowed"
        :btn-loading="followLoading"/>
    </aside>
  </div>
</template>

<script>
import { getPersonInfoById, getBlogsByUser, addFollowerInfo, deleteFollowerInfo } from '@/api/personal'
import SpaceBlogItem from './components/SpaceBlogItem'
import SpacePersonal from './components/SpacePersonal'

export default {
  name: 'Space',
  components: {
    SpaceBlogItem,
    SpacePersonal
  },
  data() {
    return {
      activeTab: 'blog',
      personInfo: {},
      blogs: [],
      userId: undefined,
      allLoaded: false,
      page: 1,
      followLoading: false
    }
  },
  computed: {
    isMobile() {
      return this.$store.getters.device !== 'desktop'
    }
  },
  created() {
    this.userId = this.$route.params.id
    this.getPersonInfoById()
  },
  watch: {
    $route(route) {
      this.userId = route.params.id
      this.page = 1
      this.blogs = []
      this.getPersonInfoById()
      this.allLoaded = false
      this.$refs.blogList.refreshData()
    }
  },
  methods: {
    getPersonInfoById() {
      getPersonInfoById(this.userId).then(response => {
        this.personInfo = response.data
        if (this.personInfo.isLogin === 2) {
          // 登录用户与查询的用户为一个人，跳转到个人中心页面
          this.$router.push('/personal')
        }
      }).catch(() => {})
    },
    getBlogsByUser() {
      return getBlogsByUser(this.userId, this.page).then(response => {
        if (response.data.isLast) {
          this.allLoaded = true
        }
        this.blogs = this.blogs.concat(response.data.content)
        this.page++
      }).catch(err => {
        throw err
      })
    },
    followed() { // 关注
      if (this.personInfo.isLogin === 0) {
        this.$_message({
          message: '请您先登录',
          type: 'warning'
        })
      } else {
        this.followLoading = true
        addFollowerInfo(this.personInfo.userId).then(() => {
          this.$_message({
            message: '关注成功',
            type: 'success'
          })

          this.getPersonInfoById()
          this.followLoading = false
        }).catch(() => {
          this.followLoading = false
        })
      }
    },
    removeFollowed() { // 取消关注
      if (this.personInfo.isLogin === 0) {
        this.$_message({
          message: '请您先登录',
          type: 'warning'
        })
      } else {
        this.followLoading = true
        deleteFollowerInfo(this.personInfo.userId).then(() => {
          this.$_message({
            message: '取消关注成功',
            type: 'success'
          })
          this.getPersonInfoById()
          this.followLoading = false
        }).catch(() => {
          this.followLoading = false
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
.content-wrap {
  width: 100%;
  position: relative;
  float: left;
}
.main-content {
  float: left;
  position: relative;
  width: 67%;
  margin-right: 32%;
  &.mobile {
    width: 100%;
    margin-right: 0;
  }
  .space-header {
    font-size: $fontSizeLg;
    color: $mainColor;
    text-align: center;
  }
}
.aside-content {
  float: left;
  margin-left: -30%;
  width: 31%;
  background-color: $mainBgColor;
  border-radius: 4px;
}
</style>

<style lang="scss">
.space {
  .el-tabs__header {
    margin: 0;
  }
}
</style>
