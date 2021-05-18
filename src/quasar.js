import Vue from "vue";

import "./styles/quasar.scss";
import "@quasar/extras/material-icons/material-icons.css";
import iconSet from 'quasar/icon-set/fontawesome-v5'

// Notify.create('Danger, Will Robinson! Danger!')
import { Quasar,Platform,Notify,Dialog  } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";

Vue.use(Quasar, {
  config: {},
  plugins: {Notify,Platform,Dialog},
  extras: [
    'ionicons-v4',
    'eva-icons',
  ],
  iconSet: iconSet
});
