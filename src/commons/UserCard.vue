<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section>用户个人信息</q-card-section>
      <q-separator inset />

      <q-item>
        <q-item-section avatar>
          <q-avatar square>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>林炼钧</q-item-label>
          <q-item-label caption>404 未读消息</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator inset />
      <q-card-actions horizontal>
        <q-item-section>
          <q-item-label caption class="text-center text-indigo-12"
            >12</q-item-label
          >
          <q-item-label caption class="text-center text-weight-bolder"
            >关注</q-item-label
          >
        </q-item-section>
        <q-separator vertical />
        <q-item-section>
          <q-item-label caption class="text-center text-indigo-12"
            >3</q-item-label
          >
          <q-item-label caption class="text-center text-weight-bolder"
            >粉丝</q-item-label
          >
        </q-item-section>
        <q-separator vertical />
        <q-item-section>
          <q-item-label caption class="text-center text-indigo-12"
            >17</q-item-label
          >
          <q-item-label caption class="text-center text-weight-bolder"
            >博客</q-item-label
          >
        </q-item-section>
        <q-separator vertical />
        <q-item-section>
          <q-item-label caption class="text-center text-indigo-12"
            >6</q-item-label
          >
          <q-item-label caption class="text-center text-weight-bolder"
            >帖子</q-item-label
          >
        </q-item-section>
        <q-separator vertical />
        <q-item-section>
          <q-item-label caption class="text-center text-indigo-12"
            >15</q-item-label
          >
          <q-item-label caption class="text-center text-weight-bolder"
            >小组</q-item-label
          >
        </q-item-section>
        <q-separator vertical />
        <q-item-section>
          <q-item-label caption class="text-center text-indigo-12"
            >21</q-item-label
          >
          <q-item-label caption class="text-center text-weight-bolder"
            >收藏</q-item-label
          >
        </q-item-section>
      </q-card-actions>
      <q-separator inset />
      <q-card-actions>
        <div class="row q-gutter-md">
          <div class="text-center text-indigo-12 text-body2">积分：236</div>
          <div class="text-center text-indigo-12">排名：7</div>
          <div class="text-center text-indigo-12">年度排名：6</div>
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'TdfUserCard',
  props: {

  },
}
</script>

<style></style>
