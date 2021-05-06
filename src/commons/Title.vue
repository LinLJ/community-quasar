<template>
  <div class="q-pa-md">
    <div class="q-pa-sm column title-box show-border">
      <div class="text-center text-h5 q-pt-xl">
        {{ data.contentInfo.title }}
        <span v-if="isAuthor" class="q-px-xs">
          <q-icon class="show-border q-pa-sm text-h6" :name="evaEditOutline" ></q-icon>
        </span>
        <span v-if="isAuthor" class="q-px-xs">
          <q-icon class="show-border q-pa-sm text-h6" :name="evaTrash2Outline" ></q-icon>
        </span>
        <span v-if="false" class="q-px-xs">
          <q-icon class="show-border q-pa-sm text-h6" :name="evaHeartOutline" ></q-icon>
        </span>
        <span v-if="false" class="q-px-xs">
          <q-icon class="show-border q-pa-sm text-h6" :name="evaHeart"></q-icon>
        </span>
        <span v-if="!data.isFaved" class="q-px-xs">
          <q-icon class="show-border q-pa-sm text-h6" :name="evaStarOutline" ></q-icon>
        </span>
        <span v-if="data.isFaved" class="q-px-xs">
          <q-icon class="show-border q-pa-sm text-h6" :name="evaStar"></q-icon>
        </span>
      </div>

      <div>{{data.contentInfo.content}}</div>

      <div>13</div>
    </div>
  </div>
</template>

<script>
import {
  evaHeartOutline,
  evaHeart,
  evaStarOutline,
  evaStar,
  evaTrash2Outline,
  evaEditOutline,
} from '@quasar/extras/eva-icons'
import { isAuthor } from '@/api/blog'
export default {
  name: 'TdfTitle',
  data() {
    return {
      isAuthor: false,
    }
  },
  created() {
    this.evaHeartOutline = evaHeartOutline
    this.evaHeart = evaHeart
    this.evaStarOutline = evaStarOutline
    this.evaStar = evaStar
    this.evaTrash2Outline = evaTrash2Outline
    this.evaEditOutline = evaEditOutline

    if (this.isLogin) {
      // 登陆回来 获取相关信息
      this.judgeIsAuthor(this.$route.params.id)
      this.getPersonalInfo() // 个人信息
    }
  },
  props: {
    editBtn: {
      type: Boolean,
      default: false,
    },
    delBtn: {
      type: Boolean,
      default: false,
    },
    faveBtn: {
      type: Boolean,
      default: false,
    },

    data: {
      type: Object,
    },
  },
  methods: {
    judgeIsAuthor(id) {
      isAuthor(id)
        .then((response) => {
          this.isAuthor = response.data
        })
        .catch(() => {})
    },
  },
}
</script>
<style lang="scss">
.title-box {
  background: white;
}
.show-border {
  border: 0.5px solid rgba(86, 61, 124, 0.2);
  border-radius: 4px;
}
.icon-box {
  width: 40px;
  height: 40px;
}
.icon-center {
  margin: auto;
}
</style>
