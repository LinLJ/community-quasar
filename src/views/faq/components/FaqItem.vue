<template>
  <div class="faq-item-container">
    <div class="count">
      <p>{{ faq.ticketCount }}</p>
      <p>得票</p>
    </div>
    <div :class="countObj.className" class="count">
      <p>{{ faq.replyCount }}</p>
      <p>{{ countObj.text }}</p>
    </div>
    <div class="count">
      <p>{{ faq.readCount }}</p>
      <p>浏览</p>
    </div>
    <div class="meta">
      <p class="time">
        {{ faq.createTime }}
        <span>{{ faq.lastTime || '暂无回复'}}</span>
      </p>
      <router-link :to="{ name: 'faqView', params: { id: this.faq.id }}" target="_blank" class="title">{{ faq.title }}</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FaqItem',
  props: {
    faq: {
      type: Object,
      required: true
    }
  },
  computed: {
    countObj() {
      if (this.faq.takeAnswer === 1 || this.faq.takeAnswer === '1') {
        return { className: 'is-taken', text: '解决' }
      } else {
        if (this.faq.replyCount === 0 || this.faq.replyCount === '0') {
          return { className: 'none-answer', text: '回答' }
        } else {
          return { className: 'default', text: '回答' }
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../styles/variables.scss';
.faq-item-container {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid $borderColor;
  cursor: default;
  .count {
    margin-left: 4px;
    margin-right: 4px;
    //padding: 0 4px;
    height:45px;
    width:45px;
    p {
      width:45px;
      text-align: center;
      margin-bottom: 3px;
    }
  }
  .default {
    border: 1px solid $brandColor;
    color: $brandColor
  }
  .none-answer {
    color: $dangerColor
  }
  .is-taken {
    background-color: $faqSolveColor;
    color: $mainBgColor;
  }
  .meta {
    padding:0 5px;
    .time {
      color: $subColor;
      margin-bottom: 5px;
      span {
        margin-left: 10px;
      }
    }
    .title {
      cursor: pointer;
      margin-bottom: 5px;
      font-size: 16px;
    }
  }
}
</style>

