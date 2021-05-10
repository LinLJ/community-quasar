<template>
  <tdf-scroll-load :on-touch-bottom="getUnreads" :is-loaded-all="allLoaded" class="width-auto">
    <div
      class="show-border q-py-sm q-px-sm favorite"
      v-for="(item, index) in notify"
      :key="index"
    >
    <div class="row q-pa-xs ">
      <div class="col-11"><p v-html="item.content" /></div>
      <div class="col-1"><q-icon v-if="item.unreadFlag" class="read-btn text-right" :name="evaBookOpenOutline" title="已读" size="mini" @click="notifyRead(item.id)" />
</div>
      
      

    </div>


    </div>
  </tdf-scroll-load>

</template>

<script>
import { getUnreads, notifyRead } from '@/api/personal'
import {
  evaBookOpenOutline,
  evaBookOpen,
} from '@quasar/extras/eva-icons'

export default {
  name: 'PersonalPost',

  data() {
    return {
      listQuery: {
        page: 1
      },
      notify: [],
      allLoaded: false
    }
  },
  created() {
    this.evaBookOpenOutline = evaBookOpenOutline
    this.evaBookOpen = evaBookOpen
    
  },
  methods: {
    getUnreads() {
      return getUnreads(this.listQuery).then(response => {
        this.notify = this.notify.concat(response.data.content)
        if (response.data.isLast) {
          this.allLoaded = true
        }
        this.listQuery.page++
      }).catch(err => {
        throw err
      })
    },
    notifyRead(id) { // 消息已读
      notifyRead(id).then(() => {
        window.location.reload()
      }).catch(() => {})
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../../../styles/variables.scss";

.blog-item {
  box-sizing: border-box;
  border: 1px solid #EAEAEA;
  padding: 20px;
  transition: all 0.2s;
  margin-bottom: -1px;
  &:hover {
    border-color: #3399CC;
    background-color: #FBFDFF;
    position: relative;
  }
  &:last-child {
    margin-bottom: 0;
  }
  .title {
    color: $mainColor;
    font-size: $fontSizeMd;
    font-weight: 700;
    transition: all 0.2s;
    &:hover {
      color: $brandColor;
    }
  }
  .content {
    font-size: $fontSizeSm;
    color: $subColor;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    line-height: 20px;
    height: 60px;
  }
  .meta {
    color: $subColor;
    font-size: $fontSizeSm;
    margin: 10px 0;
    .origin-flag {
      color: $routineColor;
      border: 1px solid $borderColor;
      padding: 2px 5px;
      margin-right: 10px;
    }
  }
}
</style>
