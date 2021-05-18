<template>
  <div class="q-pa-md row q-col-gutter-md">
    <div class="col-6" v-for="item in list" :key="item.id || item.name">
      <router-link
        v-if="item.baseUrlState === '0'"
        :to="item.baseUrl"
        target="_blank"
      >
        <q-card flat bordered class="card-img-left">
          <div class="row">
            <div class="col-4">
              <img
                v-if="!$q.screen.lt.md"
                :src="item.pic"
                class="img-location-left"
              />
              <img v-else :src="item.pic" class="img-location-left-small" />
            </div>
            <div class="col-8">
              <div class="text-body2 q-pt-md q-pb-xs">
                {{ item.title || item.name }}
              </div>
              <div class="text-caption cut-text text-grey-14 q-pr-md">
                {{ item.summary || item.description }}
              </div>
            </div>
          </div>
        </q-card>
      </router-link>
      <a v-else :href="item.baseUrl" target="_blank">
        <q-card flat bordered class="card-img-left">
          <div class="row">
            <div class="col-4">
              <img
                v-if="!$q.screen.lt.md"
                :src="item.pic"
                class="img-location-left"
              />
              <img v-else :src="item.pic" class="img-location-left-small" />
            </div>
            <div class="col-8">
              <div class="text-body2 q-pt-md q-pb-xs">
                {{ item.title || item.name }}
              </div>
              <div class="text-caption cut-text text-grey-14 q-pr-md">
                {{ item.summary || item.description }}
              </div>
            </div>
          </div>
        </q-card>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TdfPageCardsForForum',
  props: {
    list: {
      type: Array,
    },
    slide: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '300px',
    },
    titleText: {
      type: String,
      default: 'text-h5',
    },
    showTitle: {
      type: Boolean,
      default: false,
    },
    titleShadow: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
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
.img-location-left-small {
  height: 70px;
  width: 40px;
  padding-top: 30px;
  padding-left: 3px;
}
.cut-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
