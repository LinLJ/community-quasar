<template>
  <div class="q-pa-md row q-col-gutter-md">
    <div class="col-6" v-for="item in forums" :key="item.id || item.name">
      <router-link :to="item.baseUrl" class="a-decoration-none">
        <q-card flat  bordered :class="[`card-img-left`]">
          <div class="row">
            <div class="col-4">
              <img :src="item.forumLog" :class="[`img-location-left`]" />
            </div>
            <div class="col-8">
              <div class="text-body2 q-pt-md q-pb-xs">
                {{ item.forumCategoryName || item.name }}
              </div>
              <div class="text-caption cut-text text-grey-14 q-pr-md">
                {{ item.forumDescription || item.description }}
              </div>
            </div>
          </div>
        </q-card>
      </router-link>
    </div>
  </div>
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
