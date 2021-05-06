<template>
  <div>
    <div class="row q-pt-xs">
      <div class="col-4 q-px-xs q-py-lg">
        <span>草稿</span>
      </div>
      <div class="col-8 q-px-xs q-py-lg">
        <div class="colum">
          <div>类型</div>
          <div>标签</div>
          <div>正文</div>
          <tdf-editor></tdf-editor>
          <q-btn @click="publicBlog">发布</q-btn>
          <q-btn>保存为草稿</q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>

<style></style>
