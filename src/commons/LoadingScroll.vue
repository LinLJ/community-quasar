<template>
  <div class="q-pa-md">
    <q-infinite-scroll @load="onLoad" :offset="250">
      <slot />
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>
<script>
export default {
  name: 'TdfLoadingScroll',
  methods: {
    onLoad() {
      this.$emit('loadMore')
    },
  },
}
</script>
