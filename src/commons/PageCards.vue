<template>
  <div class="q-pa-md row q-col-gutter-md">
    <div
      :class="[
        {
          'col-4': img === 'top',
          'col-6': img === 'left',
        },
      ]"
      v-for="item in list"
      :key="item.id || item.name"
    >
      <q-card :class="[`card-img-${img}`]">
        <img
          v-if="img === 'top'"
          :src="item.pic"
          :class="[`img-location-${img}`]"
        />

        <div v-if="img === 'top'">
          <q-card-section class="q-pa-md row" elevated>
            <div class="text-subtitle1">{{ item.title || item.name }}</div>
            <div class="text-caption cut-text text-grey-14">
              {{ item.summary || item.description }}
            </div>
          </q-card-section>
        </div>
        <div v-if="img === 'left'" class="row">
          <div class="col-4">
            <img :src="item.pic" :class="[`img-location-${img}`]" />
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
    </div>
  </div>
</template>
<script>
export default {
  name: 'TdfPageCards',
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
    img: {
      type: String,
      default: 'top',
    },
  },
  data() {
    return {
      lorem:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
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
