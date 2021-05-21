<template>
  <div>
    <div class="row q-pt-xs">
      <div class="col-12">
        <tdf-news-carousel
          v-if="!$q.screen.lt.md"
          height="300px"
          titleText="text-h6"
          showTitle
          titleShadow
          arrows
          :list="advertising"
        ></tdf-news-carousel>
        <div class="col-12 seckill">
          <!-- 头部 -->
          <div class="seckill-head">
            <div class="seckill-icon">
              <img src="../../assets/clock.png" />
            </div>
            <div class="seckill-text">
              <span class="seckill-title">限时秒杀</span>
              <span class="seckill-remarks">总有你想不到的兑换低价</span>
            </div>
            <div class="count-down">
              <span class="count-down-text">本次兑换</span>
              <span class="count-down-num count-down-hour">{{
                seckillsHours
              }}</span>
              <span class="count-down-point">:</span>
              <span class="count-down-num count-down-minute">{{
                seckillsMinutes
              }}</span>
              <span class="count-down-point">:</span>
              <span class="count-down-num count-down-seconds">{{
                seckillsSeconds
              }}</span>
              <span class="count-down-text">后开始抢购</span>
            </div>
          </div>
          <!-- 内容 左侧部分-->
          <div>
            <div class="left-container seckill-content">
              <div
                class="seckill-item"
                v-for="(item, index) in commodities"
                :key="index"
              >
                <div class="seckill-item-img">
                  <router-link
                    v-if="item.code !== '5'"
                    :to="item.baseUrl"
                    target="_blank"
                    ><img :src="item.pic"
                  /></router-link>
                </div>
                <div class="seckill-item-info">
                  <p>{{ item.name }}</p>
                  <p>
                    <span
                      v-if="item.code === '1' && item.number > 0"
                      class="seckill-price text-danger"
                      ><Icon type="social-yen"></Icon>积分:{{
                        item.price
                      }}</span
                    >
                    <!-- <span class="seckill-old-price"><s>{{item.realPrice}}</s></span> -->
                    <span
                      v-else-if="item.code === '2'"
                      class="no-buy"
                      style="font-size: 13px"
                    >
                      {{ item.putawayTime }} 上架</span
                    >
                    <span
                      v-else-if="item.code === '3' && item.number > 0"
                      class="discount-price"
                    >
                      积分：{{ item.cuxiaoPrice }}
                      <span>积分：{{ item.price }}</span>
                    </span>
                    <span v-else class="no-buy" style="font-size: 13px"
                      >很抱歉，商品已售罄</span
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- 内容 右侧个人积分信息 -->
          <div class="right-container">
            <q-card>
              <q-card-section>用户个人积分信息</q-card-section>
              <q-separator inset />
              <q-list>
                <q-item clickable>
                  <q-item-section avatar>
                    <img
                      :src="
                        personalInfo.avatar ? personalInfo.avatar : img_avatar
                      "
                    />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{ personalInfo.userName }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable>
                  <q-item-section avatar>
                    <q-icon color="red" name="local_gas_station" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>可用积分</q-item-label>
                    <q-item-label caption>{{
                      personalInfo.usablePoint
                    }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable @click="openDialog">
                  <q-item-section avatar>
                    <q-icon color="amber" name="local_movies" />
                  </q-item-section>

                  <q-item-section>
                    <!-- <router-link :to="personalInfo.orderList" target="_blank"> -->
                    <q-item-label>兑换历史</q-item-label>
                    <!-- </router-link> -->
                    <!-- <q-item-label caption>Watch a movie.</q-item-label> -->
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
          <q-dialog v-model="isOpenHistory">
            <mall-history style="width: 700px; max-width: 80vw;"></mall-history>
          </q-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getCommodities } from "@/api/mall";
import { getPersonalInfo } from "@/api/personal";
import MallHistory from './MallHistory.vue';

export default {
  components:{ MallHistory },
  data() {
    return {
      advertising: [{ pic: "https://tech.taiji.com.cn/img/mall.d6987a46.png" }],
      commodities: [], // 商品数据
      personalInfo: { orderList: "" }, // 个人信息
      isOpenHistory: false
    };
  },
  mounted() {
    this.getData();
    this.getPersonal();
  },
  methods: {
    ...mapActions(["loadSeckillsInfo"]),
    getData() {
      this.leftLoading = true;
      getCommodities()
        .then((response) => {
          this.commodities = response.data;
          console.log("所有商品信息", this.commodities);
          this.leftLoading = false;
        })
        .catch(() => {
          this.leftLoading = false;
        });
    },
    getPersonal() {
      this.rightLoading = true;
      getPersonalInfo()
        .then((response) => {
          this.personalInfo = response.data;
          this.rightLoading = false;
        })
        .catch(() => {
          this.rightLoading = false;
        });
    },
    openDialog(){
      this.isOpenHistory = true
       console.log(this.isOpenHistory + '34ooooo')
    }
  },
  computed: {
    ...mapGetters(["seckillsHours", "seckillsMinutes", "seckillsSeconds"]),
  },
};
</script>

<style lang="scss">
@import "../../styles/variables.scss";
/*****************************秒杀专栏开始*****************************/
/*秒杀专栏*/
.seckill {
  width: 100%;
  height: 330px;
  margin: 15px auto;
  background-color: #fff;
}
.seckill-head {
  width: 100%;
  height: 50px;
  background-color: #e01222;
}
.seckill-icon {
  width: 68px;
  height: 100%;
  float: left;
}
.seckill-icon img {
  width: 35px;
  height: 35px;
  margin-top: 6px;
  margin-left: 15px;
  animation-name: shake-clock;
  animation-duration: 0.3s;
  animation-iteration-count: infinite; /*设置无线循环*/
}
/*定义闹钟震动动画关键帧*/
@keyframes shake-clock {
  0% {
    transform: rotate(-8deg);
  }
  50% {
    transform: rotate(8deg);
  }
  100% {
    transform: rotate(-8deg);
  }
}
.seckill-text {
  width: 300px;
  height: 100%;
  float: left;
}
.seckill-text .seckill-title {
  font-size: 22px;
  line-height: 50px;
  color: #fff;
}
.seckill-text .seckill-remarks {
  margin-left: 5px;
  font-size: 10px;
  color: #fff;
}
/*倒计时*/
.count-down {
  height: 100%;
  margin-right: 30px;
  line-height: 50px;
  float: right;
}
.count-down-text {
  color: #fff;
}
.count-down-num {
  padding: 3px;
  border-radius: 5px;
  background-color: #440106;
  font-size: 26px;
  font-weight: bold;
  color: #f90013;
}
.count-down-point {
  font-size: 26px;
  font-weight: bold;
  color: #440106;
}
.left-container {
  width: 75%;
  float: left;
  .seckill-item {
    width: calc(25% - 10px);
    height: 250px;
    display: inline-block;
    // vertical-align: top;
    text-align: center;
    margin-top: 15px;
    margin-left: 10px;
    box-shadow: 0px 0px 8px #ccc;
    cursor: pointer;
    // float: left;
  }
}
.seckill-item-img {
  width: 160px;
  height: 160px;
  margin: 0px auto;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
}
.seckill-item-img img {
  width: 140px;
  height: 140px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 15px;
  transition: margin-top 0.3s;
}
.seckill-item-img:hover img {
  margin-top: 6px;
  transition: margin-top 0.3s;
}
.seckill-item-info {
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 12px;
  color: $brandColor;
}
.seckill-item-info i:first-child {
  font-size: 14px;
}
.seckill-price {
  margin-right: 5px;
  font-size: $fontSizeMd;
  font-weight: bold;
}
.right-container {
  width: calc(25% - 20px);
  margin-left: 20px;
  margin-top: 20px;
  float: left;
}
/*****************************秒杀专栏结束*****************************/
</style>
