<template>
  <div class="">
    <div class="row">
      <div class="width-100">
        <div class="my-content" :class="[{'show-border':showBorder}]">
          {{ content }}

          <q-icon
            v-if="showDownward"
            class="float-right q-pa-xs"
            :name="
              isExpanded ? evaArrowIosDownwardOutline : evaArrowIosUpwardOutline
            "
            @click="expandedClick"
          ></q-icon>
        </div>
        <div v-if="$slots.default" :class="[{'show-border':showBorder}]">
          <div v-if="!showDownward">
            <slot></slot>
          </div>
          <div
            v-if="showDownward"
            :class="[isExpanded ? 'expand-height' : 'collapse-height']"
          >
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  evaArrowIosDownwardOutline,
  evaArrowIosUpwardOutline,
} from '@quasar/extras/eva-icons'

export default {
  name: 'TdfBox',
  data() {
    return {
      isExpanded: false,
    }
  },
  props: {
    content: {
      type: String,
      default: '',
    },
    showBorder: {
      type: Boolean,
      default: false,
    },
    showDownward: {
      type: Boolean,
      default: false,
    },
    showHeight: {
      type: String,
      default: '260px',
    },
  },
  created() {
    this.evaArrowIosUpwardOutline = evaArrowIosUpwardOutline
    this.evaArrowIosDownwardOutline = evaArrowIosDownwardOutline
    
  },
  methods: {
    expandedClick() {
      this.isExpanded = !this.isExpanded
    },
  },
}
</script>

<style lang="sass" scoped>
.show-border
  border: 1px solid rgba(86,61,124,.2)
.my-content
  padding: 10px 15px
.my-content-small
  padding: 0px 15px
.collapse-height
  max-height: 360px
  overflow: hidden
.expand-height
  height: auto
</style>
