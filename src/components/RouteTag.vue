<template>
  <q-tabs :exact="exact">
    <q-route-tab
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
      type: Array
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
  mounted(){
    console.info(this.list,"++++++++")
  }
}
</script>

<style></style>
