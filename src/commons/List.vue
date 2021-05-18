<template>
  <div class="q-pa-xs">
    <q-list>
      <q-item clickable v-ripple v-for="item in list" :key="item.id">
        <q-item-section avatar>
          <q-avatar :rounded="rounded" :square="square">
            <router-link
              target="_blank"
              :to="{ name: 'space', params: { id: item.userId } }"
            >
              <img
                style="height: 100%; width: 100%"
                :src="url + item.userId + '.jpg'"
              />
            </router-link>
          </q-avatar>
        </q-item-section>

        <q-item-section class="text-body2">
          <router-link
            class="text-dark text-subtitle2"
            v-if="type === 'blog'"
            target="_blank"
            :title="item.title"
            :to="{ name: 'blogView', params: { id: item.id } }"
          >
            <q-item-label>{{ item.title }}</q-item-label>
          </router-link>
          <router-link
            class="text-dark text-subtitle2"
            v-if="type === 'post'"
            target="_blank"
            :title="item.title"
            :to="{ name: 'forumPostView', params: { id: item.id } }"
          >
            <q-item-label>{{ item.title }}</q-item-label>
          </router-link>

          <q-item-label caption
            >{{ item.updateTime }} {{ item.userName }}</q-item-label
          >
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: 'TdfList',
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
    type: {
      type: String,
      defaulte: 'post',
    },
    list: {
      type: Array,
    },
    rounded: {
      type: Boolean,
      defaule: false,
    },
    square: {
      type: Boolean,
      defaule: false,
    },
  },
}
</script>
