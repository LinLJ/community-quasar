<template>
  <div class="blog-item hover-transition">
    <router-link v-if="baseUrlState === '0'" :to="baseUrl" class="title" target="_blank">{{ title }}</router-link>
    <a v-else :href="baseUrl" class="title" target="_blank">{{ title }}</a>
    <time class="time">
      <svg-icon icon-class="tdc-clock"/>
      <span>{{ time }}</span>
    </time>
    <span class="name">
      <svg-icon icon-class="user" />
      <span>{{ user }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'BlogItem',
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
    time: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-item {
  padding: 10px 15px;
  & + .blog-item {
    border-top: 1px solid $borderColor;
  }
  &:hover {
    cursor: pointer;
    background-color: $hoverBgColor;
    .title {
      color: $brandColor
    }
  }
  .title {
    display: block;
  }
  .time {
    font-size: $fontSizeSm;
    color: $homeBlogTimeColor;
    display: inline-block;
    margin-right: 20px;
    span {
      margin-left: 5px;
    }
  }
  .name {
    font-size: $fontSizeSm;
    color: $subColor;
    display: inline-block;
    span {
      margin-left: 5px;
    }
  }
}
</style>
