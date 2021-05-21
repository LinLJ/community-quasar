<template>
  <tdf-page-cards-for-forum
    :list="forums"
    img="left"
  ></tdf-page-cards-for-forum>
</template>

<script>
import { getForumGroups } from '@/api/personal'

export default {
  name: 'PersonalPost',

  data() {
    return {
      forums: [],
    }
  },
  created() {
    this.getForumGroups()
  },
  methods: {
    getForumGroups() {
      getForumGroups()
        .then((response) => {
          this.forums = response.data
        })
        .catch(() => {})
    },
  },
}
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
}
.card-img-top {
  height: 270px;
}
.img-location-top {
  height: 140px;
}
.card-img-left {
  // max-width: 360px;
  height: 100px;
}
.img-location-left {
  height: 70px;
  width: 70px;
  padding-top: 20px;
  padding-left: 15px;
}
.cut-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
