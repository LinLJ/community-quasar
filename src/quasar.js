import Vue from "vue";

import "./styles/quasar.scss";
import "@quasar/extras/material-icons/material-icons.css";
import { Quasar,Platform,Notify  } from "quasar";

Vue.use(Quasar,Platform, {
  config: {},
  plugins: {Notify,Platform},
  extras: [
    'ionicons-v4',
    'eva-icons',
  ]
});
