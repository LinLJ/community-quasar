<template>
  <div class="q-pa-xs" >
    <q-list>
      <q-item clickable v-ripple v-for="item in list" :key="item.id">
        <q-item-section avatar>
          <q-avatar :rounded="rounded" :square="square">
            <q-img :src="url + item.userId+ '.jpg'"></q-img>
          </q-avatar>
        </q-item-section>

        <q-item-section class="text-body2">
          <q-item-label>{{ item.title }}</q-item-label>
          <q-item-label caption>{{ item.updateTime }}     {{item.userName}}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: 'TdfListDetail',
  data() {
    return {
      url: process.env.VUE_APP_API_BASE + '/upload/avatar/',
    }
  },
  props: {
    content: {
      type: String,
      default: '',
    },
    list: {
      type: Array,
    },
    rounded:{
      type:Boolean,
      defaule:false
    },
    square:{
      type:Boolean,
      defaule:false
    }
  },
}
</script>
