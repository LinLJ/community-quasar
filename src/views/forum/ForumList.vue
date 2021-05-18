<template>
  <div class="row q-pt-xs">
    <div class="col-12 col-md-8 q-pt-lg">
      <div class="q-pb-md" v-for="(item, index) in groups" :key="index">
        <div class="column show-border text-h6 q-pa-sm">{{ item[0] }}</div>
        <div class="column show-border">
          <div class="row">
            <div
              class="col-6"
              v-for="item in item[1]"
              :key="item.id || item.name"
            >
              <router-link :to="item.baseUrl" class="a-decoration-none">
                <q-card flat class="card-img-left">
                  <div class="row">
                    <div class="col-4">
                      <img
                        v-if="!$q.screen.lt.md"
                        :src="item.forumLog"
                        class="img-location-left"
                      />
                      <img
                        v-else
                        :src="item.forumLog"
                        class="img-location-left-small"
                      />
                    </div>
                    <div class="col-8">
                      <div class="text-body2 q-pt-md q-pb-xs">
                        {{ item.forumName || item.name }}
                      </div>
                      <div class="text-caption cut-text text-grey-14 q-pr-md">
                        {{ item.forumDescription || item.description }}
                      </div>
                    </div>
                  </div>
                </q-card>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!$q.screen.lt.md" class="col-md-4 q-pa-lg">
      <tdf-box class="text-h6" showBorder content="最新讨论帖">
        <tdf-list rounded :list="lastForum" type="post"></tdf-list>
      </tdf-box>
    </div>
  </div>
</template>

<script>
import { getLastForum, getForumGroups } from '@/api/forum'

export default {
  data() {
    return {
      groupsLoading: false,
      furomsLoading: false,
      groups: [],
      lastForum: [],
    }
  },
  created() {
    this.getGroups()
    this.getForums()
    document.title = '讨论组 - 太极开发者社区'
  },
  methods: {
    getGroups() {
      this.groupsLoading = true
      getForumGroups()
        .then((response) => {
          this.groups = Object.entries(response.data)
        })
        .finally(() => {
          this.groupsLoading = false
        })
    },
    getForums() {
      this.furomsLoading = true
      getLastForum()
        .then((response) => {
          this.lastForum = response.data
        })
        .finally(() => {
          this.furomsLoading = false
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
}
.card-img-top {
  height: 270px;
}
.img-location-top {
  height: 140px;
}
.card-img-left {
  // max-width: 360px;
  height: 100px;
}
.img-location-left {
  height: 70px;
  width: 70px;
  padding-top: 20px;
  padding-left: 15px;
}
.img-location-left-small {
  height: 70px;
  width: 40px;
  padding-top: 30px;
  padding-left: 3px;
}
.cut-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
