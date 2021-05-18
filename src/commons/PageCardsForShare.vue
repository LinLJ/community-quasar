<template>
  <div class="row q-col-gutter-md">
    <div
      class="col-4"
      v-for="item in list"
      :key="item.id || item.name"
      :height="height"
    >
      <router-link v-if="item.baseUrlState === '0'" :to="item.baseUrl" target="_blank">
        <q-card flat bordered class="height-100">
          <q-img v-if="!$q.screen.lt.md" :src="item.pic" :height="imgHeight" />
          <q-img v-else :src="item.pic" :height="imgHeight" />

          <div>
            <q-card-section v-if="!$q.screen.lt.md" class="row" elevated>
              <div v-if="!$q.screen.lt.md" class="text-subtitle1">
                {{ item.title || item.name }}
              </div>
              <div
                v-if="showDescription"
                class="text-caption cut-text text-grey-14"
              >
                {{ item.summary || item.description }}
              </div>
            </q-card-section>
            <q-card-section v-else class="q-pa-xs row" elevated>
              <div class="text-body2 text-center">
                {{ item.title || item.name }}
              </div>
              <div
                v-if="showDescription"
                class="text-caption cut-text text-grey-14"
              >
                {{ item.summary || item.description }}
              </div>
            </q-card-section>
          </div>
        </q-card></router-link
      >
      <a v-else :href="item.baseUrl" target="_blank">
        <q-card flat bordered class="height-100">
          <q-img v-if="!$q.screen.lt.md" :src="item.pic" :height="imgHeight" />
          <q-img v-else :src="item.pic" :height="imgHeight" />

          <div>
            <q-card-section v-if="!$q.screen.lt.md" class="row" elevated>
              <div v-if="!$q.screen.lt.md" class="text-subtitle1">
                {{ item.title || item.name }}
              </div>
              <div
                v-if="showDescription"
                class="text-caption cut-text text-grey-14"
              >
                {{ item.summary || item.description }}
              </div>
            </q-card-section>
            <q-card-section v-else class="q-pa-xs row" elevated>
              <div class="text-body2 text-center">
                {{ item.title || item.name }}
              </div>
              <div
                v-if="showDescription"
                class="text-caption cut-text text-grey-14"
              >
                {{ item.summary || item.description }}
              </div>
            </q-card-section>
          </div>
        </q-card>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TdfPageCardsForShare',
  props: {
    showDescription: {
      type: Boolean,
      default: false,
    },
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
    imgHeight: {
      type: String,
      default: '140px',
    },
    titleText: {
      type: String,
      default: 'text-h5',
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

.cut-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
