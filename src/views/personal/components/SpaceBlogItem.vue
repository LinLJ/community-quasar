<template>
  <article class="blog-item">
    <header>
      <router-link :to="{name: 'blog'}" class="cat">博客</router-link>
      <router-link :to="{name: 'blogView', params:{id: blog.id}}" target="_blank" class="title">
        {{ blog.title }}
      </router-link>
    </header>
    <p class="sub-content">
      <svg-icon icon-class="tdc-clock" /><span class="time">{{ blog.updateTime }}</span>
      <svg-icon icon-class="tdc-eye" /><span class="count">{{ blog.readCount }}</span>
    </p>
    <p class="content">
      {{ blog.content }}
    </p>
  </article>
</template>

<script>
export default {
  name: 'SpaceBlogItem',
  props: {
    blog: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';
.blog-item {
  box-sizing: border-box;
  border: 1px solid $borderColor;
  padding: 20px;
  transition: all .2s;
  margin-bottom: -1px;
  &:hover {
    border-color: $brandColor;
    background-color: $hoverBgColor;
    position: relative;
    z-index: 20;
  }
  &:last-child {
    margin-bottom: 0;
  }
  .cat {
    color: #FFF;
    background-color: $brandColor;
    padding: 3px 6px;
    font-size: $fontSizeSm;
    display: inline-block;
    position: relative;
    top: -2px;
    margin-right: 6px;
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      margin-top: -4px;
      right: -4px;
      display: inline-block;
      width: 0;
      height: 0;
      vertical-align: middle;
      border-left: 4px solid $brandColor;
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent
    }
  }
  .title {
    color: $mainColor;
    font-size: $fontSizeMd;
    font-weight: 700;
    transition: all .2s;
    &:hover {
      color: $brandColor;
    }
  }
  .content {
    font-size: $fontSizeSm;
    color: $subColor;
    display: -webkit-box;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    line-height: 20px;
    height: 60px;
  }
  .sub-content {
    color: $subColor;
    font-size: $fontSizeSm;
    margin: 10px 0;
    .time {
      margin: 0 10px 0 5px;
    }
    .count {
      margin: 0 10px 0 5px;
    }
  }
}
</style>
