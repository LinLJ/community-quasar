<template>
  <div class="column ">
    <div v-if="!$q.screen.lt.md" class="row q-py-md ">
      <div class="col">
        <tdf-news-carousel
          height="280px"
          navigation
          :list="carousel"
        ></tdf-news-carousel>
      </div>
      <div class="col q-pt-md top-container">
        <div
          v-loading="rightLoading"
          :class="{ 'only-right': !isShowCarousel }"
        >
          <article
            v-for="(item, index) in article"
            :key="index"
            class="article-wrapper"
          >
            <header v-if="index === 0" class="title first-title">
              <a
                v-if="item.baseUrlState === '1'"
                :href="item.baseUrl"
                target="_blank"
                >{{ item.title }}</a
              >
              <router-link v-else :to="item.baseUrl">{{
                item.title
              }}</router-link>
            </header>
            <header v-else class="title">
              <a
                v-if="item.baseUrlState === '1'"
                :href="item.baseUrl"
                target="_blank"
                >{{ item.title }}</a
              >
              <router-link v-else :to="item.baseUrl">{{
                item.title
              }}</router-link>
            </header>
            <section v-if="index === 0" class="summary">
              {{ item.summary }}
            </section>
          </article>
        </div>
      </div>
    </div>
    <div class="q-pt-md width-100">
      <q-tabs v-model="activeTab" dense align="left" :breakpoint="0">
        <q-tab name="first" label="推荐阅读" />
        <q-tab name="second" label="技术平台" />
        <q-tab name="third" label="CBB产品" />
        <q-tab name="fourth" label="发包项目" />
        <q-tab name="fifth" label="优秀开源" />
      </q-tabs>
      <q-tab-panels v-model="activeTab">
        <q-tab-panel name="first" class="q-px-none">
          <share-tab-list :tab-id="columnId.down[0]" />
        </q-tab-panel>
        <q-tab-panel name="second" class="q-px-none">
          <share-tab-list :tab-id="columnId.down[1]" />
        </q-tab-panel>
        <q-tab-panel name="third" class="q-px-none">
          <share-tab-list :tab-id="columnId.down[2]" />
        </q-tab-panel>
        <q-tab-panel name="fourth" class="q-px-none">
          <share-tab-list :tab-id="columnId.down[3]" />
        </q-tab-panel>
        <q-tab-panel name="fifth" class="q-px-none">
          <share-tab-list :tab-id="columnId.down[4]" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import { getSorts, getLinks } from '@/api/share'
import ShareTabList from './components/ShareTabList'

export default {
  name: 'ShareList',
  components: { ShareTabList },
  data() {
    return {
      columnId: { down: [] }, // 所有栏目的id
      carousel: [], // 图片走马灯的数据
      article: [], // 走马灯右侧文章的数据
      leftLoading: false,
      rightLoading: false,
      activeTab: 'first',
    }
  },
  computed: {
    isShowCarousel() {
      return this.$store.getters.device !== 'min-mobile'
    },
  },
  created() {
    this.getColumnId()
    document.title = '成果共享 - 太极开发者社区'
  },
  methods: {
    getColumnId() {
      getSorts()
        .then((response) => {
          this.columnId = response.data
          this.getCarouselData()
          this.getArticleData()
        })
        .catch(() => {})
    },
    getCarouselData() {
      if (this.columnId['up-left']) {
        this.leftLoading = true
        getLinks(this.columnId['up-left'])
          .then((response) => {
            this.carousel = response.data
            this.leftLoading = false
          })
          .catch(() => {
            this.leftLoading = false
          })
      }
    },
    getArticleData() {
      if (this.columnId['up-right']) {
        this.rightLoading = true
        getLinks(this.columnId['up-right'])
          .then((response) => {
            this.article = response.data
            this.rightLoading = false
          })
          .catch(() => {
            this.rightLoading = false
          })
      }
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/variables.scss';
.top-container {

  .only-right {
    width: 100%;
  }
  img {
    width: 100%;
    height: 300px;
  }
  .article-wrapper {
    padding: 10px 20px;
    .title {
      font-size: $fontSizeMd;
      color: $mainColor;
      &:hover {
        color: $brandColor;
      }
      &.first-title {
        font-size: 22px;
      }
    }
    .summary {
      color: #b2b5b6;
    }
  }
}
</style>
