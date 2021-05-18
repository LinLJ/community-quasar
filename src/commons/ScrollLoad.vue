<template>
  <div>
    <div ref="infiLoadSlot">
      <slot />
    </div>
    <div
      class="scroll-loading"
      v-show="loading"
      element-loading-text="加载中"
      element-loading-background="rgba(0,0,0,0)"
    >

      <div class="q-gutter-md row items-center flex flex-center">
        <q-spinner-dots color="blue" size="xl" />
      </div>
    </div>
    <div class="no-more" v-show="isLoadedAll">没有了</div>
  </div>
</template>
<script>
const body = document.body
const documentElement = document.documentElement
export default {
  name: 'TdfScrollLoad',
  props: {
    onTouchBottom: {
      type: Function,
      required: true,
    },
    isLoadedAll: {
      type: Boolean,
      default: false,
    },
    maxCalledTimes: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      firstTime: true,
      loading: false, // 数据加载中
      loadMore: true,
      domHeight: undefined,
      vh: undefined,
      calledTimes: 0,
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    window.addEventListener('scroll', this.useDebounce, true)
    window.addEventListener('beforeunload', this.backToTop)
    window.addEventListener('resize', this.useDebounce_2)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.useDebounce, true)
    window.removeEventListener('beforeunload', this.backToTop)
    window.removeEventListener('resize', this.useDebounce_2)
  },
  methods: {
    async onScroll() {
      console.info(this.loading, this.isLoadedAll)
      if (this.loading || this.isLoadedAll) return
      let top = documentElement.scrollTop || body.scrollTop // 滚动条在Y轴上的滚动距离
      this.domHeight = Math.max(body.scrollHeight, documentElement.scrollHeight) // 文档的总高度
      console.info(top + this.vh + '-0000-' + this.domHeight - 80)
      if (top + this.vh >= this.domHeight - 80) {
        // 滚动到底部 60为底部版权信息高度, 20为底部margin-top
        this.loading = true
        try {
          await this.$props.onTouchBottom()
        } catch (err) {
          null
        }
        this.loading = false
      }
    },
    async fillScreen() {
      if (
        this.domHeight ===
        Math.max(body.scrollHeight, documentElement.scrollHeight)
      ) {
        this.loadMore = true
      } else {
        this.loadMore = false
        this.domHeight = Math.max(
          body.scrollHeight,
          documentElement.scrollHeight
        )
      }

      if (this.isLoadedAll) {
        // 加载完情况，不继续继续加载
        this.loadMore = false
        return
      } else if (this.loadMore && this.calledTimes < this.maxCalledTimes) {
        // 没有加载完，loadMore为true，继续加载
        this.loading = true
        try {
          await this.$props.onTouchBottom()
        } catch {
          this.calledTimes++
        }
        this.loading = false
        this.fillScreen()
      } else {
        // 没有加载完，loadMore为false，（好像不存在这种情况）
        return
      }
    },
    getData() {
      this.calledTimes = 0
      this.domHeight = Math.max(body.scrollHeight, documentElement.scrollHeight) // 文档的总高度
      this.vh =
        document.compatMode === 'CSS1Compat'
          ? documentElement.clientHeight
          : body.clientHeight // 浏览器视口的高度
      this.fillScreen()
    },
    refreshData() {
      this.$nextTick(() => {
        this.getData()
      })
    },
    backToTop() {
      // 避免刷新浏览器记录滚动条位置触发onScroll
      window.scrollTo(0, 0)
      return ''
    },
    debounce(method, context) {
      method.tId && clearTimeout(method.tId)
      method.tId = setTimeout(() => {
        method.call(context)
        delete method.tId
      }, 500)
    },
    useDebounce() {
      this.debounce(this.onScroll, window)
    },
    useDebounce_2() {
      this.debounce(() => {
        this.vh =
          document.compatMode === 'CSS1Compat'
            ? documentElement.clientHeight
            : body.clientHeight // 浏览器视口的高度
      }, window)
    },
  },
}
</script>
<style lang="scss" scoped>
.scroll-loading {
  min-width: 100px;
  width: 100%;
  height: 100px;
}
.no-more {
  text-align: center;
  color: #878b8d;
}
</style>
