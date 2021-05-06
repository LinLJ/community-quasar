<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        animated
        control-color="white"
        :autoplay="autoplay"
        padding
        arrows
        infinite
        :height="height"
        class="bg-primary text-white shadow-1 rounded-borders"
      >
        <q-carousel-slide
          :name="index"
          class="column no-wrap flex-center"
          v-for="(item,index) in list"
          :img-src="item.pic"
          :key="item.linkId"
        >
          <div
            v-if="showTitle"
            class="absolute-bottom custom-caption"
            :class="[{ 'title-shadow': titleShadow }]"
          >
            <div :class="titleText">{{ item.title }}</div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TdfNewsCarousel',
  data() {
    return {
      autoplay: true,
      slide:1
    }
  },
  props: {
    list: {
      type: Array,
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
  }
}
</script>

<style lang="scss">
q-carousel_-slide {
  height: 100%;
  width: auto;
}
.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
}
.title-shadow {
  background-color: rgba(0, 0, 0, 0.3);
}
.title-color {
  color: titleColor;
}
</style>
