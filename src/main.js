import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import './router/routerHook' 
import store from "./store";
import "./quasar";
import "./common";
import "./plugin"
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
