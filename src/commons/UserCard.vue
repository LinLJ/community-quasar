<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section>用户个人信息</q-card-section>
      <q-separator inset />

      <q-item>
        <q-item-section avatar>
          <q-avatar square>
            <img :src="personal.avatar ? personal.avatar : img_avatar" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ personal.userName }}</q-item-label>
          <q-item-label caption>{{ personal.unreadNotifies }}未读消息</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator inset />
      <q-card-actions horizontal>
        <q-item-section>
          <q-item-label caption class="text-center text-indigo-12"
            >{{ personal.followerCount}}</q-item-label
          >
          <q-item-label caption class="text-center text-weight-bolder"
            >关注</q-item-label
          >
        </q-item-section>
        <q-separator vertical />
        <q-item-section>
          <q-item-label caption class="text-center text-indigo-12"
            >{{ personal.followedCount}}</q-item-label
          >
          <q-item-label caption class="text-center text-weight-bolder"
            >粉丝</q-item-label
          >
        </q-item-section>
        <q-separator vertical />
        <q-item-section>
          <q-item-label caption class="text-center text-indigo-12"
            >{{ personal.blogCount}}</q-item-label
          >
          <q-item-label caption class="text-center text-weight-bolder"
            >博客</q-item-label
          >
        </q-item-section>
        <q-separator vertical />
        <q-item-section>
          <q-item-label caption class="text-center text-indigo-12"
            >{{ personal.postCount}}</q-item-label
          >
          <q-item-label caption class="text-center text-weight-bolder"
            >帖子</q-item-label
          >
        </q-item-section>
        <q-separator vertical />
        <q-item-section>
          <q-item-label caption class="text-center text-indigo-12"
            >{{ personal.forumCount}}</q-item-label
          >
          <q-item-label caption class="text-center text-weight-bolder"
            >小组</q-item-label
          >
        </q-item-section>
        <q-separator vertical />
        <q-item-section>
          <q-item-label caption class="text-center text-indigo-12"
            >{{ personal.favoriteCount}}</q-item-label
          >
          <q-item-label caption class="text-center text-weight-bolder"
            >收藏</q-item-label
          >
        </q-item-section>
      </q-card-actions>
      <q-separator inset />
      <q-card-actions>
        <div class="row q-gutter-md">
          <div class="text-center text-indigo-12 text-body2">积分：{{ personal.usablePoint }}</div>
          <div class="text-center text-indigo-12">排名：{{ personal.pointRanking }}</div>
          <div class="text-center text-indigo-12">年度排名：{{ personal.annualPointRanking }}</div>
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import img_avatar from '@/assets/avatar.png'

export default {
  name: 'TdfUserCard',
  props: {
    personal: {
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
  },
  data(){
    return {
      img_avatar
    }
  }
}
</script>

<style></style>
