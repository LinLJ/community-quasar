<template>
  <div class="rank">
    <span>{{ seq }}</span>
    <p>{{ title }}</p>
    <span>{{ author }}</span>
  </div>
</template>

<script>
export default {
  name: 'PointRank',
  props: {
    seq: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.rank {
  box-sizing: border-box;
  height: 70px;
  border: 1px solid $borderColor;
  border-radius: 2px;
  transition: all .2s;
  overflow: hidden;
  background-color: $mainBgColor;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: -1px;
  padding: 20px;
  &:hover {
    border-color: $brandColor;
    background-color: $hoverBgColor;
    z-index: 20;
  }
}
</style>
