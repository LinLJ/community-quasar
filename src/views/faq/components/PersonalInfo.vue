<!-- copyed from personal-->
<template>
  <div class="personal">
    <div class="person-info">
      <img :src="personal.avatar ? personal.avatar : img_avatar" alt="头像">
      <div class="user-info">
        <p class="name">{{ personal.userName }}</p>
      </div>
    </div>
    <ul>
      <li>
        <p class="count">{{ personal.personalView}}</p>
        <p class="label">
          <span>关注</span>
        </p>
      </li>
      <li>
        <p class="count">{{ personal.personalCollect}}</p>
        <p class="label">
          <span>收藏</span>
        </p>
      </li>
      <li>
        <p class="count">{{ personal.personalQuestion}}</p>
        <p class="label">
          <span>我的问题</span>
        </p>
      </li>
      <li>
        <p class="count">{{ personal.personalAnswer}}</p>
        <p class="label">
          <span>我的回答</span>
        </p>
      </li>
      <li>
        <p class="count">{{ personal.personalTakeAnswer}}</p>
        <p class="label">
          <span>被采纳</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import img_avatar from '@/assets/avatar.png'
import { getPersonInfo } from '@/api/faq'
import { getPersonalInfo as getAvatarAndName } from '@/api/personal'

export default {
  name: 'PersonalInfo',
  data() {
    return {
      img_avatar,
      personal: {
        avatar: undefined,
        userName: undefined,
        personalView: undefined,
        personalCollect: undefined,
        personalQuestion: undefined,
        personalAnswer: undefined,
        personalTakeAnswer: undefined
      }
    }
  },
  created() {
    this.getPersonInfo()
    this.getAvatarAndName()
  },
  methods: {
    getPersonInfo() {
      getPersonInfo().then(response => {
        Object.assign(this.personal, response.data)
      }).catch(() => {})
    },
    getAvatarAndName() {
      getAvatarAndName().then(response => {
        Object.assign(this.personal, response.data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/variables.scss";
.personal {
  padding: 0 10px 10px 10px;
  .person-info {
    margin: 10px 0;
    display: flex;
    img {
      width: 35px;
      height: 35px;
      margin: 5px 0;
    }
    .user-info {
      padding-left: 10px;
      .name {
        color: $brandColor;
        margin: 5px;
        margin: 0;
      }
      .msg {
        border: 1px solid $borderColor;
        padding: 2px 5px;
        font-size: $fontSizeSm;
        margin: 0;
        &:hover {
          cursor: pointer;
        }
        i {
          font-weight: 700;
          font-style: normal;
          color: $mainColor;
          margin: 0 5px;
        }
      }
    }
  }
  ul {
    list-style: none;
    width: 100%;
    margin: 0 auto;
    padding: 0;
    border-top: 1px solid $borderColor;
    border-bottom: 1px solid $borderColor;
    li {
      display: inline-block;
      border-right: 1px solid $borderColor;
      padding: 10px;
      text-align: center;
      .count {
        margin-bottom: 0;
        color: $homeUserNumColor;
        font-size: $fontSizeSm;
        font-weight: 700;
      }
      .label {
        color: $userSortColor;
        font-size: $fontSizeSm;
        font-weight: 700;
        margin-bottom: 0;
        &:hover {
          cursor: default;
        }
      }
    }
  }
}
</style>
