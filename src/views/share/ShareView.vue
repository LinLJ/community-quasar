<template>
  <div>
    <div class="row q-pt-xs">
      <div class="col-12 col-md-8 q-px-xs q-py-lg">
        <div class="q-pa-md">
          <div class="q-pa-sm column title-box show-border">
            <div class="text-center text-h5 q-pt-xl">
              {{ info.infolinkDto.infolinkTitle }}
              <div class="info">
                <svg-icon icon-class="tdc-clock" />
                {{ info.infolinkDto.modifiedDate }}
                <span>关键字：{{ info.infolinkDto.keyword }}</span>
              </div>
            </div>

            <q-separator class="q-mt-md q-mb-md" inset />

            <article class="article-wrapper">
              <span v-html="info.infolinkDto.infolinkContent" />
            </article>
          </div>
        </div>
      </div>
      <div v-if="!$q.screen.lt.md" class="col-md-4 q-px-xs q-py-lg">
        <div v-if="isShowRight" class="right-container q-py-md">
          <section class="common">
            <header class="title">讨论组</header>
            <div v-if="info.forumName" class="content hover-transition">
              <router-link
                :to="{ name: 'forumView', params: { id: info.forumId } }"
              >
                {{ info.forumName }}
              </router-link>
            </div>
          </section>
          <section class="common">
            <header class="title">相关资料</header>
            <div
              v-for="(item, index) in info.infolinkDto.files"
              :key="item.id"
              class="content hover-transition"
            >
              <a
                :href="info.fileNameList[index]"
                :download="item.fileName"
                target="_blank"
                >{{ item.fileName }}</a
              >
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfoLink } from '@/api/share'

export default {
  data() {
    return {
      info: { infolinkDto: {} },
      loading: false
    }
  },
  computed: {
    isShowRight() {
      return this.$store.getters.device !== 'min-mobile'
    }
  },
  created() {
    this.getInfo(this.$route.params.id)
  },
  methods: {
    getInfo(id) {
      this.loading = true
      console.info("请求后台前，当前时间："+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds())
      getInfoLink(id).then(response => {
        console.info("接收后台数据后，当前时间："+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds())

        this.info = response.data
        this.loading = false
        document.title = "成果-" + this.response.data.infolinkDto.infolinkTitle;
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/variables.scss';
.loading-page {
  overflow: hidden;
}
.common {
  background-color: $mainBgColor;
  border: 1px solid $borderColor;
  border-radius: 5px;
  & + .common {
    margin-top: 20px;
  }
}
.left-container {
  width: 70%;
  float: left;
  .header-wrapper {
    padding: 20px;
    border-bottom: 1px solid $borderColor;
    text-align: center;
    .title {
      font-size: $fontSizeSuperLg;
      line-height: 40px;
      color: $mainColor;
    }
    .info {
      font-size: $fontSizeSm;
      color: $subColor;
      span {
        margin-left: 20px;
      }
    }
  }
  .article-wrapper {
    padding: 20px;
   
  }
}
.only-left {
  width: 100%;
  .header-wrapper {
    text-align: left;
    .title {
      font-size: $fontSizeMd;
      line-height: 30px;
    }
  }
}
.right-container {
  margin-left: 20px;
  .title {
    line-height: 30px;
    border-bottom: 1px solid $borderColor;
    padding: 10px 20px;
    font-size: $fontSizeMd;
  }
  .content {
    padding: 10px 20px;
    color: $brandColor;
    word-break: break-all;
  }
}
</style>
