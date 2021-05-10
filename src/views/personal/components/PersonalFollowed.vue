<template>
  <tdf-scroll-load
    :on-touch-bottom="getFollowdes"
    :is-loaded-all="allLoaded"
    class="width-auto"
  >
    <div class="row">
      <div
        class="my-card q-pa-md"
        v-for="(item, index) in followed"
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
import { getFollowdes } from '@/api/personal'
import img_avatar from '@/assets/avatar.png'

export default {
  name: 'PersonalQuestion',

  data() {
    return {
      img_avatar,
      followed: [],
      listQuery: {
        page: 1,
      },
      allLoaded: false,
    }
  },
  methods: {
    getFollowdes() {
      return getFollowdes(this.listQuery)
        .then((response) => {
          this.followed = this.followed.concat(response.data.content)
          if (response.data.isLast) {
            this.allLoaded = true
          }
          this.listQuery.page++
        })
        .catch((err) => {
          throw err
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.my-card {
  width: 70px;
}
</style>
