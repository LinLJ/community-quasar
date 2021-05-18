<template>
  <div class="guide-container">
    <header class="contain-header">关于如何提问</header>
    <div class="faq-part">
      <div class="header">先搜索，再提问</div>
      <div class="content">
        你提问前有在我们的 搜索栏
        先行搜索过吗？使用搜索，能更快地帮你找到答案。即使没找到，在看了相关或者类似的问题之后，你的提问会更准确。
      </div>
    </div>
    <div class="faq-search">
      <div class="row">
        <q-input
          class="col-10"
          v-model="search"
          type="search"
          placeholder="请输入关键字"
          autocomplete
          @keyup.enter.native="handleSearch"
        /><q-btn type="primary" class="search-btn col-2 q-mt-sm" @click="handleSearch"
          >搜索</q-btn
        >
      </div>
    </div>
    <div class="faq-part-container">
      <div class="faq-part side">
        <div class="header">尽量清楚、详细地描述问题</div>
        <div v-for="(item, index) in goodContent" :key="index" class="content">
          <svg-icon icon-class="tdc-check" class-name="icon" />
          <span v-html="item" />
        </div>
      </div>
      <div class="faq-part side">
        <div class="header">不适合发布的</div>
        <div v-for="(item, index) in badContent" :key="index" class="content">
          <svg-icon icon-class="tdc-cross" class-name="icon" />
          <span v-html="item" />
        </div>
      </div>
    </div>
    <div class="faq-part">
      <div class="header">保持求知欲</div>
      <div class="content">
        或许最后得到的答案并不是你最想要的，但深思熟虑过的问题依旧可能会让你有其他方面的收获。每个人的成长都是一步步来的，所以，Keep
        an open mind。
      </div>
    </div>
    <div class="container-footer">
      <q-btn type="primary" class="qa-button" @click="goAskAQues"
        >我已知晓，继续提问</q-btn
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'Guide',
  data() {
    return {
      search: undefined,
      goodContent: [
        '编程技术、软件算法、开发工具相关',
        '<b>标题</b>清晰明了，<b>内容</b>包含必要的操作环境、截图和代码、期望结果与实际结果',
        '善用<b>编辑器</b>排版你的问题，提高可读性',
        '准确地使用多个<b>标签</b>标记你的问题',
      ],
      badContent: [
        '你自己没有尝试找过答案',
        '征询产品、服务推荐',
        '软件程序评比投票，没有结论的观点讨论',
        '任何与编程开发无关的问题',
      ],
    }
  },
  methods: {
    handleSearch() {
      this.$router.push({
        path: '/search',
        query: { category: 'all', keyword: this.search },
      })
    },
    goAskAQues() {
      setTimeout(() => {
        this.$router.push({ name: 'faqList' })
      }, 0)
      let routeUrl = this.$router.resolve({
        name: 'FaqNew',
      })
      window.open(routeUrl.href, '_blank')
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../../styles/variables.scss';
.guide-container {
  .contain-header {
    text-align: center;
    margin-bottom: 20px;
    font-size: $fontSizeLg;
  }
  .faq-search {
    width: 60%;
    position: relative;
    padding-right: 100px;
    margin-bottom: 20px;
    .search-btn {
      background-color: $brandColor;
      border-color: $brandColor;
      position: absolute;
      right: 0;
    }
  }
  .faq-part-container {
    .side {
      width: 50%;
      float: left;
    }
  }
  .faq-part {
    margin-bottom: 20px;
    .header {
      font-size: $fontSizeMd;
      margin-bottom: 10px;
    }
    .content {
      margin-left: 2em;
      .icon {
        margin-right: 0.5em;
      }
    }
  }
  .container-footer {
    text-align: center;
    .qa-button {
      background-color: $brandColor;
      border-color: $brandColor;
    }
  }
}
</style>
