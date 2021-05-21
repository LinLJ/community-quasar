<template>
  <div class="forum-item">
    <div class="main">
      <div class="detail">
        <p class="title">
          <router-link v-if="forum.baseUrlState === '0'" :to="forum.baseUrl" target="_blank">{{ forum.title }}</router-link>
          <a v-else :href="forum.baseUrl" target="_blank">{{ forum.title }}</a>
        </p>
        <span class="time">{{ forum.updateTime }}</span>
      </div>
    </div>
    <div class="avatar">
      <img :src="forum.avatar ? forum.avatar : img_avatar" alt="个人头像">
    </div>
    <div class="author">
      <router-link :to="`/space/index/${forum.userId}`">{{ forum.userName }}</router-link>
    </div>
  </div>
</template>

<script>
import img_avatar from '@/assets/images/avatar.png'
export default {
  name: 'ForumItem',
  data() {
    return {
      img_avatar
    }
  },
  props: {
    forum: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.forum-item {
  float: left;
  width: 100%;
  padding: 10px;
  & + .forum-item {
    border-top: 1px solid $borderColor;
  }
  .avatar {
    float: left;
    width: 30px;
    height: 30px;
    margin-left: -100%;
    line-height: 30px;
    text-align: center;
    img {
      width: 23px;
      height: 23px;
      border-radius: 2px;
    }
  }
  .main {
    width: 100%;
    padding: 0 60px 0 40px;
    float: left;



    .title {
      color: $frontPostColor;
      font-size: $fontSizeBase;
      font-weight: 700;
      margin: 0;
      &:hover {
        color: $frontHoverColor;
      }
    }
    .time {
      color: $homePostTimeColor;
      font-size: $fontSizeBase;
    }
  }
  .author{
    width: 50px;
    margin-left: -50px;
    float: left;
    color: $brandColor;
    font-size: $fontSizeBase;
  }
}
</style>
