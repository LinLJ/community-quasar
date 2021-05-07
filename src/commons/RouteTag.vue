<template>
  <q-tabs :exact="exact" class="router-tag-width row">
    <q-route-tab
      class="col"
      v-for="item in list"
      :key="item.path"
      :name="item.meta.title"
      :label="item.meta.title"
      :exact="item.exact || exact"
      :icon="item.icon"
      :to="item.path"
    />
  </q-tabs>
</template>

<script>
export default {
  name: 'TdfRouteTag',
  props: {
    list: {
      type: Array,
    },
    exact: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.router-tag-width {
  width: 100%;
}
</style>
