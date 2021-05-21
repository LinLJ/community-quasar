<template>
  <div class="forum-group-item">
    <router-link v-if="baseUrlState === '0'" :to="baseUrl">
      <img :src="pic" alt="">
      <div class="detail-info">
        <p class="name">{{ name }}</p>
        <p class="desc">{{ description }}</p>
      </div>
    </router-link>
    <a v-else :href="baseUrl" target="_blank">
      <img :src="pic" alt="">
      <div class="detail-info">
        <p class="name">{{ name }}</p>
        <p class="desc">{{ description }}</p>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'ForumGroupItem',
  props: {
    baseUrl: {
      type: String,
      required: true
    },
    baseUrlState: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    pic: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.forum-group-item {
  width: 100%;
  height: 75px;
  float: left;
  img {
    float: left;
    width: 48px;
    //为保持首页讨论组图标不变形，注释height
    //height: 48px;
    margin: 15px;
  }
  .detail-info {
    width: 100%;
    padding-left: 80px;
    padding-right: 10px;
    height: 75px;
    .name {
      color: $frontNameColor;
      font-weight: 700;
      font-size: $fontSizeSl;
      padding: 5px 0;
      margin: 0;
      line-height: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
    }
    .desc {
      font-size: $fontSizeBase;
      color: $frontColor;
      line-height: 20px;
      margin: 0;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      height: 40px;
    }
  }
}
</style>
