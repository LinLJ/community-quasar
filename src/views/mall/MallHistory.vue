<template>
  <div>
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">兑换历史</div>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 50vh" class="scroll">
        <q-table :data="list" :columns="columns" row-key="name">
          <template v-slot:body-cell-name="props">
            <q-td :props="props">
              <div class="my-table-details">
                {{ props.row.commodityName }}
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <div>
                <q-badge v-if="props.value==='已取货'" color="blue" :label="props.value" />
                <q-badge v-else color="orange" :label="props.value" />
              </div>
              <div class="my-table-details">
                {{ props.row.details }}
              </div>
            </q-td>
          </template>
        </q-table>
        <!-- <section class="list">
          <div v-for="item in list" :key="item.id" class="list-item">
            {{ item.createTime }}兑换{{ item.commodityName }}，兑换数量：{{
              item.number
            }}，消费积分：{{ item.nowPrice * item.number }}，当前商品{{
              item.status
            }}
          </div>
        </section> -->
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="关闭" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
    <!-- <header class="title">兑换历史</header>
    <section v-loading="loading" class="list">
      <div v-for="item in list" :key="item.id" class="list-item">
        {{ item.createTime }}兑换{{ item.commodityName }}，兑换数量：{{ item.number }}，消费积分：{{ item.nowPrice * item.number }}，当前商品{{ item.status }}
      </div>
    </section> -->
  </div>
</template>

<script>
import { getOrders } from "@/api/personal";

export default {
  name: "MallHistory",
  data() {
    return {
      loading: false,
      list: [],
      columns: [
        {
          name: "commodityName",
          required: true,
          label: "商品名称",
          align: "left",
          field: (row) => row.commodityName,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "createTime",
          align: "center",
          label: "兑换时间",
          field: "createTime",
          sortable: true,
        },
        { name: "number", label: "兑换数量", field: "number", sortable: true },
        { name: "nowPrice", label: "消费积分", field: "nowPrice" },
        {
          name: "status",
          label: "商品状态",
          field: (row) => row.status,
          format: (val) => `${val}`,
        },
      ],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getOrders()
        .then((response) => {
          this.list = response.data;
          console.log("999999");
          console.log(this.list);
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/variables.scss";
.title {
  font-size: $fontSizeLg;
  color: $mainColor;
}
.my-table-details {
  font-size: 0.85em;
  font-style: italic;
  max-width: 200px;
  white-space: normal;
  color: #555;
  margin-top: 4px;
}
.list {
  margin-top: 20px;
  .list-item {
    padding: 20px;
    background-color: $mainBgColor;
    border: 1px solid $borderColor;
    &:hover {
      background-color: $hoverBgColor;
      border-color: $brandColor;
      z-index: 10;
    }
  }
}
</style>
