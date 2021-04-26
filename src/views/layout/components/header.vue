<template>
  <div>
    <q-toolbar>
      <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
        <q-img
          :src="img_logo"
          style="height: 40px; width: 200px"
          spinner-color="white"
        />
      </q-btn>
      <q-space />
      <div class="YL__toolbar-input-container row no-wrap">
        <tdf-route-tag v-show="!showSearch" :list="navigation" />

        <!-- <q-input
          v-if="showSearch"
          dense
          square
          borderless
          v-model="search"
          @blur="blurInput"
          placeholder="Search"
          ref="searchInput"
          class="bg-white col"
        >
          <template>
            <q-btn
              @click="focusInput"
              text-color="grey-8"
              icon="search"
              size="10px"
              unelevated
            />
          </template>
        </q-input>
        <q-btn
          v-else
          @click="focusInput"
          text-color="grey-8"
          icon="search"
          size="10px"
          unelevated
        /> -->

        <q-input
          v-if="showSearch"
          dense
          square
          v-model="search"
          @blur="blurInput"
          placeholder="Search"
          ref="searchInput"
          class="bg-white col"
        >
        </q-input>

        <q-btn
          @click="focusInput"
          text-color="grey-8"
          icon="search"
          size="10px"
          unelevated
        />
        <q-tabs>
          <q-tab v-if="!isLogin" name="login" label="登陆"> </q-tab>
          <q-tab v-else name="logout" label="注销"> </q-tab>
        </q-tabs>
      </div>

      <q-space />
    </q-toolbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import img_logo from '@/assets/logo.jpg'
import { login, logout } from '@/utils/oauthLogin'
import { removeToken } from '@/utils/token'

export default {
  name: 'LayoutHeader',
  data() {
    return {
      img_logo,
      showSearch: false,
      search: '',
    }
  },
  computed: {
    ...mapGetters(['navigation', 'isLogin']),
  },
  mounted() {
    console.log('获取当前导航栏：', this.navigation)
  },
  methods: {
    login() {
      login()
    },
    logout() {
      removeToken()
      logout()
        .then(() => {
          window.location.reload()
        })
        .catch(() => {
          window.location.href = '/'
        })
    },
    blurInput() {
      this.showSearch = false
      this.search = ''
    },
    focusInput() {
      this.showSearch = true
      this.$nextTick(() => {
        this.$refs.searchInput.focus()
      })
    },
  },
}
</script>

<style lang="scss">
.search-input {
  width: 620px;
  margin-right: 10px;
  line-height: 56px;
  .el-input__suffix {
    right: 9px;
    font-size: 12px;
  }
}
</style>
