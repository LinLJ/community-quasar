<template>
  <div>
    <q-spinner-tail v-if="!type" color="primary" size="2em" />
    <q-spinner-cube v-if="type === 'cube'" size="xl" color="primary" />
  </div>
</template>

<script>
export default {
  name: 'TdfLoading',
  props: {
    type: {
      type: String,
      defaulte: 'default',
    },
  },
}
</script>
