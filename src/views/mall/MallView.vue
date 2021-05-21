<template>
  <div class="row q-pt-sm q-pb-lg">
    <div class="loading-page">
      <div :class="{ 'min-mobile': isMinMobile }" class="left-container">
        <img :src="info.logo" :alt="info.name" />
      </div>
      <div :class="{ 'min-mobile': isMinMobile }" class="right-container">
        <header class="title common">
          {{ info.name }}
          <q-chip
            clickable
            @click="onClick"
            color="orange"
            text-color="white"
            icon="directions"
          >
            太极学院领取
          </q-chip>
        </header>
        <section class="common">{{ info.description }}</section>
        <div class="common">
          <div v-if="info.soldOutFlag === '1'" style="margin-bottom: 20px">
            <span class="item-price-title">积分：</span>
            <span class="item-price">￥{{ info.nowPrice }}</span>
          </div>
          <div
            v-if="info.soldOutFlag === '2' && info.nowPrice === info.oldPrice"
            style="margin-bottom: 20px"
          >
            <span class="item-price-title">积分：</span>
            <span class="item-price">￥{{ info.nowPrice }}</span>
          </div>

          <div
            v-if="info.soldOutFlag === '2' && info.nowPrice !== info.oldPrice"
            class="discount-price"
          >
            <span class="item-price-title">积分：</span>
            <span class="item-price">￥{{ info.nowPrice }}</span>
            <span>积分：{{ info.oldPrice }}</span>
          </div>

          <div v-if="info.soldOutFlag === '3'" class="discount-price">
            <span class="item-price-title">积分：</span>
            <span class="item-price">￥{{ info.nowPrice }}</span>
            <span>积分：{{ info.oldPrice }}</span>
            促销商品限购一份
          </div>
          <div class="row">
            <span class="item-price-title">数量：</span>
            <q-input
              v-model.number="orderNum"
              type="number"
              dense
              outlined 
              :min="1"
              :max="info.number"
              size="medium"
              controls-position="right"
            ></q-input>
            （库存：{{ info.number }}）
          </div>
        </div>
        <!--TODO ,需要设定颜色，本地颜色正常，build后颜色不正常-->
        <q-btn
          :loading="buyButtonLoadingFlag"
          color="primary"
          v-if="info.number > 0 && info.soldOutFlag === '1'"
          type="primary"
          @click="handleBuy"
          >兑换</q-btn
        >
        <q-btn
          :loading="buyButtonLoadingFlag"
          color="primary"
          v-if="info.number > 0 && info.soldOutFlag === '3'"
          type="primary"
          @click="handleBuy"
          >兑换</q-btn
        >
        <q-btn
          v-if="info.number > 0 && info.soldOutFlag === '2'"
          type="info"
          disabled
          >商品于 {{ info.putawayTime }} 上架，请耐心等候
        </q-btn>
        <q-btn v-if="info.number === 0" color="brown-5" disabled
          >商品已售罄</q-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getInfoById, buy } from "@/api/mall";
import { getPersonalInfo } from "@/api/personal";

export default {
  name: "MallView",
  data() {
    return {
      info: {}, // 商品信息
      loading: false,
      personalInfo: {},
      orderNum: 1, // 购买数量
      buyButtonLoadingFlag: false,
    };
  },
  computed: {
    isMinMobile() {
      return this.$store.getters.device === "min-mobile";
    },
  },
  created() {
    this.getInfo(this.$route.params.id);
    //this.getPersonal()
  },
  methods: {
    async getInfo(id) {
      this.loading = true;
      await getInfoById(id)
        .then((response) => {
          this.info = response.data;
          console.log("商品信息", this.info);
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    async getPersonal() {
      await getPersonalInfo()
        .then((response) => {
          this.personalInfo = response.data;
          console.log("用户信息", this.personalInfo);
        })
        .catch(() => {});
    },
    async handleBuy() {
      if (this.info.soldOutFlag == "3" && this.orderNum > 1) {
        this.$_message.error("促销产品限购一件");
      } else {
        const total = this.info.nowPrice * this.orderNum;
        this.buyButtonLoadingFlag = true;
        await this.getPersonal();
        console.log("等待获取个人信息");
        if (
          this.personalInfo.usablePoint &&
          this.personalInfo.usablePoint >= total
        ) {
          this.$_alert(`需要消耗${total}积分，确定兑换吗？`, "确定兑换", {
            confirmButtonText: "确定",
            type: "warning",
          })
            .then(() => {
              this.getInfo(this.$route.params.id);
              if (this.info.number < this.orderNum) {
                this.$_message.error("兑换失败，库存不足");
                this.buyButtonLoadingFlag = false;
              } else {
                buy(this.$route.params.id, this.orderNum)
                  .then(() => {
                    this.$_message.success(
                      `兑换成功，请到${this.info.address}领取`
                    );
                    console.log("兑换结束1");
                    this.getInfo(this.$route.params.id);
                    this.buyButtonLoadingFlag = false;
                    console.log("兑换结束2");
                  })
                  .catch((err) => {
                    debugger;
                    this.$_message.error(err);
                    this.buyButtonLoadingFlag = false;
                  });
              }
            })
            .catch(() => {
              this.buyButtonLoadingFlag = false;
            });
        } else {
          this.buyButtonLoadingFlag = false;
          this.$_confirm(
            `你的可用积分为${this.personalInfo.usablePoint}，需要${total}积分`,
            "积分不足",
            {
              confirmButtonText: "积分攻略",
              cancelButtonText: "取消",
              type: "error",
            }
          )
            .then(() => {
              this.$router.push({
                name: "forumPostView",
                params: { id: "82657d1cd68348f8ad9713ca9074951a" },
              }); // 跳转至积分攻略帖子查看页面
            })
            .catch(() => {});
        }
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/variables.scss";
.loading-page {
  overflow: hidden;
  padding-top:20px;
}
.left-container {
  width: 40%;
  border: 1px solid rgb(236, 231, 231);
  box-shadow: 0px 0px 8px #ccc;
  cursor: pointer;
  float: left;
  img {
    width: 100%;
  }
}
.right-container {
  width: 60%;
  padding-left: 30px;
  float: left;
  .common {
    padding-bottom: 20px;
    border-bottom: 1px solid $borderColor;
    margin-bottom: 20px;
    .item-price-title {
      color: #999999;
      font-size: 14px;
      margin-right: 15px;
    }
    .item-price {
      color: #e4393c;
      font-size: 23px;
      cursor: pointer;
    }
    .discount-price {
      color: $dangerColor;
      margin-bottom: 20px;
      span {
        margin-left: 10px;
        font-size: $fontSizeBase;
        color: $subColor;
        text-decoration-line: line-through;
      }
    }
  }
  .title {
    font-size: $fontSizeLg;
    color: $mainColor;
  }
}
.min-mobile {
  width: 100%;
  & + .min-mobile {
    margin-top: 20px;
  }
}
</style>
