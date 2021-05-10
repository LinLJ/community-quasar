<template>
  <tdf-scroll-load :on-touch-bottom="getFavorites" :is-loaded-all="allLoaded" class="width-auto q-py-none q-px-xs" >
    <div class="show-border q-py-md q-px-sm favorite" v-for="(item, index) in favorites" :key="index" >
      <div class="title">
         <a v-if="item.favoriteContent.indexOf('https') !== -1" class="link a-decoration-none text-dark" :href="item.favoriteContent" target="_blank" >
        <div>{{ item.favoriteTitle }}</div>
        <div class="text-right">{{ item.createTime }}</div>
      </a>

      <router-link v-if="item.favoriteContent.indexOf('https') == -1" :to="item.favoriteContent" target="_blank" class="link text-dark a-decoration-none">
        <div>{{ item.favoriteTitle }}</div>
        <div class="text-right">{{ item.createTime }}</div>
      </router-link>
      </div>


    </div>
  </tdf-scroll-load>
</template>

<script>
import { getFavorites } from '@/api/personal'

export default {
  name: 'PersonalQuestionFollow',

  data() {
    return {
      favorites: [],
      listQuery: {
        page: 1,
      },
      allLoaded: false,
    }
  },
  methods: {
    getFavorites() {
      return getFavorites(this.listQuery)
        .then((response) => {
          this.favorites = this.favorites.concat(response.data.content)
          if (response.data.isLast) {
            this.allLoaded = true
          }
          this.listQuery.page++
        })
        .catch((err) => {
          throw err
        })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';
.favorite {
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
  .title {
    font-size: $fontSizeMd;
    color: $brandColor;
  }

}
</style>
