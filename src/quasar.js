import Vue from "vue";

import "./styles/quasar.scss";
import "@quasar/extras/material-icons/material-icons.css";

// Notify.create('Danger, Will Robinson! Danger!')
import { Quasar,Platform,Notify,Dialog,QIcon  } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";

Vue.use(Quasar, {
  config: {},
  plugins: {Notify,Platform,Dialog},
  component:{QIcon},
  extras: [
    'material-icons',
    'ionicons-v4',
    'eva-icons',
  ],
});
