<template>
  <tdf-scroll-load
    :on-touch-bottom="getFollowers"
    :is-loaded-all="allLoaded"
    class="width-auto"
  >
    <div class="row">
      <div
        class="my-card q-pa-md"
        v-for="(item, index) in follower"
        :key="index"
        :body="item"
      >
        <q-avatar rounded>
          <img :src="item.avatar ? item.avatar : img_avatar" />
        </q-avatar>
        <router-link
          :to="{ name: 'space', params: { id: item.followerId } }"
          class="name q-py-xs a-decoration-none"
        >
          <div class="text-caption margin-auto">{{ item.followerName }}</div>
        </router-link>
      </div>
    </div>
  </tdf-scroll-load>

</template>

<script>
import { getFollowers } from '@/api/personal'
import img_avatar from '@/assets/avatar.png'

export default {
  name: 'PersonalQuestion',

  data() {
    return {
      img_avatar,
      follower: [],
      listQuery: {
        page: 1,
      },
      allLoaded: false,
    }
  },
  methods: {
    getFollowers() {
      return getFollowers(this.listQuery).then(response => {
        this.follower = this.follower.concat(response.data.content)
        if (response.data.isLast) {
          this.allLoaded = true
        }
        this.listQuery.page++
      }).catch(err => {
        throw err
      })
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
