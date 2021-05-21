<template>
  <div class="rank" :class="{ 'min-mobile': isMinMobile }">
    <div class="point" :class="{ mobile: isMobile }">
      <span class="rank-title pt-5" :class="{ 'min-mobile': isMinMobile }"
        >积分排行</span
      >
      <q-tabs
        align="right"
        indicator-color="purple"
        class="text-teal"
        :breakpoint="0"
      >
        <q-tab name="积分排行" label="积分排行" />
      </q-tabs>
      <div>
        <rank-item
          v-for="(item, index) in point"
          :seq="index"
          :title="item.remark"
          :name="item.userName"
          :user-id="item.userId"
          :key="index"
          point
        />
      </div>
    </div>
    <div class="point" :class="{ mobile: isMobile }">
      <span class="rank-title pt-5" :class="{ 'min-mobile': isMinMobile }"
        >最佳博客排行</span
      >
      <q-tabs
        align="right"
        indicator-color="purple"
        class="text-teal"
        :breakpoint="0"
      >
        <q-tab name="热度" label="热度" >
          <q-tooltip>
          博客热度=1*访问数+2*回复数+3*收藏数+3*点赞数
        </q-tooltip>
        </q-tab>
      </q-tabs>
      <div>
        <rank-item
            v-for="(item, index) in blogHeat"
            :seq="index"
            :title="item.title"
            :name="item.userName"
            :id="item.blogId"
            :user-id="item.userId"
            :key="index"
            blog
          />
      </div>

    </div>

    <div class="point" :class="{ mobile: isMobile }">
      <span class="rank-title pt-5" :class="{ 'min-mobile': isMinMobile }"
        >热帖排行</span
      >
      <q-tabs
        align="right"
        indicator-color="purple"
        class="text-teal"
        :breakpoint="0"
      >
        <q-tab  name="热度" label="热度" >
          <q-tooltip>
          帖子热度=1*访问数+2*回复数+3*收藏数
        </q-tooltip>
        </q-tab>
      </q-tabs>
      <div>
        <rank-item
            v-for="(item, index) in postHeat"
            :seq="index"
            :title="item.title"
            :name="item.userName"
            :id="item.postId"
            :user-id="item.userId"
            :key="index"
            forum
          />
      </div>

    </div>
  </div>
</template>

<script>
import {
  getPoint,
  getBlogReply,
  getBlogCollect,
  getBlogVisit,
  getBlogHeat,
  getPostReply,
  getPostCollect,
  getPostVisit,
  getPostHeat,
} from '@/api/rank'
import RankItem from './components/RankItem'

export default {
  name: 'Rank',
  components: {
    RankItem,
  },
  data() {
    return {
      point: [],
      blogReply: [],
      blogCollect: [],
      blogVisit: [],
      blogHeat: [],
      postReply: [],
      postCollect: [],
      postVisit: [],
      postHeat: [],
    }
  },
  computed: {
    isMobile() {
      return this.$store.getters.device !== 'desktop'
    },
    isMinMobile() {
      return this.$store.getters.device === 'min-mobile'
    },
  },
  created() {
    this.getPoint()
    this.getBlogReply()
    this.getBlogCollect()
    this.getBlogVisit()
    this.getBlogHeat()
    this.getPostReply()
    this.getPostCollect()
    this.getPostVisit()
    this.getPostHeat()
  },
  methods: {
    getPoint() {
      getPoint()
        .then((response) => {
          this.point = response.data
        })
        .catch(() => {})
    },
    getBlogReply() {
      getBlogReply()
        .then((response) => {
          this.blogReply = response.data
        })
        .catch(() => {})
    },
    getBlogCollect() {
      getBlogCollect()
        .then((response) => {
          this.blogCollect = response.data
        })
        .catch(() => {})
    },
    getBlogVisit() {
      getBlogVisit()
        .then((response) => {
          this.blogVisit = response.data
        })
        .catch(() => {})
    },
    getBlogHeat() {
      getBlogHeat()
        .then((response) => {
          this.blogHeat = response.data
        })
        .catch(() => {})
    },
    getPostReply() {
      getPostReply()
        .then((response) => {
          this.postReply = response.data
        })
        .then(() => {})
    },
    getPostCollect() {
      getPostCollect()
        .then((response) => {
          this.postCollect = response.data
        })
        .catch(() => {})
    },
    getPostVisit() {
      getPostVisit()
        .then((response) => {
          this.postVisit = response.data
        })
        .catch(() => {})
    },
    getPostHeat() {
      getPostHeat()
        .then((response) => {
          this.postHeat = response.data
        })
        .catch(() => {})
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
.rank {
  position: relative;
  .point {
    float: left;
    width: 33%;
    padding: 10px;
    .rank-title {
      position: absolute;
      line-height: 40px;
      font-size: $fontSizeBase;
      color: $mainColor;
      font-weight: 700;
      &.min-mobile {
        position: relative;
        display: block;
        padding: 10px;
        width: 100%;
        text-align: center;
        color: #3399cc;
        font-size: $fontSizeLg;
      }
    }
    &.mobile {
      width: 100%;
      margin-bottom: 20px;
    }
  }
}
</style>

<style lang="scss">
.rank {
  .el-tabs__item {
    padding: 0 10px !important;
  }
  .el-tabs__nav {
    float: right;
  }
  .el-tabs__item.is-active {
    border-top: 2px solid #3399cc;
  }
  &.min-mobile {
    .el-tabs__nav {
      float: left;
    }
  }
}
</style>
