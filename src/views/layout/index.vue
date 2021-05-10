<template>
  <q-layout view="hHh lpR fFf" >
    <q-header
      reveal
      elevated
      class="bg-white text-grey-8 q-py-xs"
      height-hint="58"
    >
      <Header />
    </q-header>
    <q-page-container>
      <Container />
      <Footer />
    </q-page-container>
  </q-layout>
</template>

<script>
import { Header, Container, Footer } from './components'
import { mapGetters } from 'vuex'

import { fabYoutube } from '@quasar/extras/fontawesome-v5'
import img_logo from '@/assets/logo.jpg'
export default {
  name: 'MyLayout',
  components: {
    Header,
    Container,
    Footer,
  },
  data() {
    return {
      img_logo,
      leftDrawerOpen: false,
      search: '',
      links1: [
        { icon: 'home', text: 'Home' },
        { icon: 'whatshot', text: 'Trending' },
        { icon: 'subscriptions', text: 'Subscriptions' },
      ],
      links2: [
        { icon: 'folder', text: 'Library' },
        { icon: 'restore', text: 'History' },
        { icon: 'watch_later', text: 'Watch later' },
        { icon: 'thumb_up_alt', text: 'Liked videos' },
      ],
      links3: [
        { icon: fabYoutube, text: 'YouTube Premium' },
        { icon: 'local_movies', text: 'Movies & Shows' },
        { icon: 'videogame_asset', text: 'Gaming' },
        { icon: 'live_tv', text: 'Live' },
      ],
      links4: [
        { icon: 'settings', text: 'Settings' },
        { icon: 'flag', text: 'Report history' },
        { icon: 'help', text: 'Help' },
        { icon: 'feedback', text: 'Send feedback' },
      ],
      buttons1: [
        { text: 'About' },
        { text: 'Press' },
        { text: 'Copyright' },
        { text: 'Contact us' },
        { text: 'Creators' },
        { text: 'Advertise' },
        { text: 'Developers' },
      ],
      buttons2: [
        { text: 'Terms' },
        { text: 'Privacy' },
        { text: 'Policy & Safety' },
        { text: 'Test new features' },
      ],
    }
  },
  computed: {
    ...mapGetters(['isLogin']),
  },
  created() {
    this.fabYoutube = fabYoutube
    this.$store.dispatch('UpdateNav', this.isLogin)
  },
}
</script>

<style lang="sass">
.YL
  &__toolbar-input-container
    min-width: 100px
    width: 55%
  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      color: #000
</style>
