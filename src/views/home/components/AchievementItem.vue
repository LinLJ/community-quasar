<template>
  <div class="achievement-item">
    <router-link v-if="baseUrlState === '0'" :to="baseUrl" target="_blank">
      <img :src="image" class="img hover-transition">
      <h3 class="title cut-text">{{ title }}</h3>
      <el-tooltip  placement="bottom" effect="light">
        <div slot="content">{{ content }}</div>
        <p class="content cut-text">{{ content }}</p>
      </el-tooltip>
    </router-link>
    <a v-else :href="baseUrl" target="_blank">
      <img :src="image" class="img hover-transition">
      <h3 class="title cut-text">{{ title }}</h3>
      <el-tooltip  placement="bottom" effect="light">
        <div slot="content">{{ content }}</div>
        <p class="content cut-text">{{ content }}</p>
      </el-tooltip>
    </a>
  </div>
</template>

<script>
export default {
  name: 'AchievementItem',
  props: {
    baseUrl: {
      type: String,
      required: true
    },
    baseUrlState: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.achievement-item {
  float: left;
  width: 33%;
  height: 250px;
  padding: 10px 15px;
  .img {
    width: 100%;
    height: 130px;
  }
  .cut-text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .title {
    font-size: $fontSizeLg;
    color: $mainColor;
    margin: 10px 0;
  }
  .content {
    font-size: $fontSizeSm;
    color: $subColor;
    line-height: 20px;
    height: 40px;
  }
}
</style>
