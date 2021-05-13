<template>
  <div class="personal">
    <div class="person-info">
      <img :src="personal.avatar ? personal.avatar : img_avatar" alt="头像">
      <div class="user-info">
        <p class="name">{{ personal.username }}</p>
        <q-btn
          v-if="personal.isFollowed && personal.isLogin !== 0"
          :loading="btnLoading"
          size="mini"
          @click="onDeleteFollowed">
          取消关注
        </q-btn>
        <q-btn
          v-else
          :loading="btnLoading"
          type="primary"
          size="mini"
          @click="onFollowed">
          关注
        </q-btn>
      </div>
    </div>
    <ul>
      <li>
        <p class="count">{{ personal.followerCount}}</p>
        <p class="label">关注</p>
      </li>
      <li>
        <p class="count">{{ personal.followedCount}}</p>
        <p class="label">粉丝</p>
      </li>
      <li>
        <p class="count">{{ personal.blogCount}}</p>
        <p class="label">博客</p>
      </li>
      <li>
        <p class="count">{{ personal.postCount}}</p>
        <p class="label">帖子</p>
      </li>
      <li>
        <p class="count">{{ personal.forumCount}}</p>
        <p class="label">小组</p>
      </li>
      <li>
        <p class="count">{{ personal.totalFavorites}}</p>
        <p class="label">收藏</p>
      </li>
    </ul>
  </div>
</template>

<script>
import img_avatar from '@/assets/avatar.png'

export default {
  name: 'Personal',
  data() {
    return {
      img_avatar
    }
  },
  props: {
    personal: {
      type: Object,
      required: true,
      default() {
        return {
          blogCount: 0,
          isLogin: 1, // 0、未登录；1、登录；2、登录用户与查询的用户为一个人
          followedCount: 0,
          totalFavorites: 0,
          postCount: 0,
          forumCount: 0,
          followerCount: 0,
          userId: undefined,
          isFollowed: true,
          username: undefined,
          avatar: undefined,
        }
      }
    },
    onFollowed: {
      type: Function,
      required: true
    },
    onDeleteFollowed: {
      type: Function,
      required: true
    },
    btnLoading: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/variables';
.personal {
  padding: 0 10px 10px 10px;
  .person-info {
    margin: 10px 0;
    display: flex;
    img {
      width: 35px;
      height: 35px;
      margin: 5px 0;
    }
    .user-info {
      padding-left: 10px;
      .name {
        color: $brandColor;
        margin: 5px;
        margin: 0;
      }
    }
  }
  ul {
    list-style: none;
    width: 100%;
    margin: 0 auto;
    padding: 0;
    border-top: 1px solid $borderColor;
    border-bottom: 1px solid $borderColor;
    margin-bottom: 20px;
    li {
      display: inline-block;
      border-right: 1px solid $borderColor;
      padding: 10px;
      text-align: center;
      .count {
        margin-bottom: 0;
        color: $brandColor;
        font-size: $fontSizeSm;
        font-weight: 700;
      }
      .label {
        color: $routineColor;
        font-size: $fontSizeSm;
        font-weight: 600;
        margin-bottom: 0;
      }
    }
  }
}
</style>
