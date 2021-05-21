<template>
  <div class="rank" :class="{ 'text-cut': point }">
    <span
      :class="[
        'seq',
        { top1: seq <= 2 && point },
        { top2: seq <= 2 && blog },
        { top3: seq <= 2 && forum },
      ]"
      >{{ seq + 1 }}</span
    >
    <template v-if="point">
      <router-link :to="`/space/index/${userId}`" class="point-name">{{
        name
      }}</router-link>
      <span class="point-org">{{ title }}</span>
    </template>
    <template v-else>
      <router-link :to="`/space/index/${userId}`" class="name">{{
        name
      }}</router-link>
      <span class="title" @click="view">{{ title }}</span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'RankItem',
  props: {
    id: {
      type: String,
    },
    seq: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    blog: {
      type: Boolean,
      default: false,
    },
    forum: {
      type: Boolean,
      deafult: false,
    },
    point: {
      type: Boolean,
      deafult: false,
    },
  },
  methods: {
    view() {
      if (this.id) {
        const path = this.blog
          ? `/blog/view/${this.id}`
          : `/forum/postView/${this.id}`
        this.$router.push(path)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';
.rank {
  box-sizing: border-box;
  height: 70px;
  border: 1px solid $borderColor;
  border-radius: 2px;
  transition: all 0.2s;
  background-color: $mainBgColor;
  overflow: hidden;
  margin-bottom: -1px;
  padding: 20px;
  &:hover {
    border-color: $brandColor;
    background-color: $hoverBgColor;
    position: relative;
    z-index: 20;
  }
  &:last-child {
    margin-bottom: 0;
  }
  &.text-cut {
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .seq {
    float: left;
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    color: #fff;
    background-color: $subColor;
    font-size: $fontSizeSm;
    margin-right: 5px;
    &.top1 {
      background-color: $dangerColor;
    }
    &.top2 {
      background-color: $brandColor;
    }
    &.top3 {
      background-color: $warningColor;
    }
  }
  .name {
    float: right;
    font-size: $fontSizeBase;
    margin-left: 5px;
    &:hover {
      color: $brandColor;
    }
  }
  .title {
    font-size: $fontSizeBase;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-right: 10px;
    width: calc(100% - 75px);
    word-break: break-all;
    transition: all 0.2s;
    display: inline-block;
    &:hover {
      cursor: pointer;
      color: $brandColor;
    }
  }
  .point-name {
    font-size: $fontSizeBase;
    width: 50px;
    margin-left: 10px;
    display: inline-block;
    transition: all 0.2s;
    &:hover {
      cursor: pointer;
      color: $brandColor;
    }
  }
  .point-org {
    font-size: $fontSizeBase;
  }
}
</style>
