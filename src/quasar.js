import Vue from "vue";

import "./styles/quasar.scss";
import "@quasar/extras/material-icons/material-icons.css";
import iconSet from 'quasar/icon-set/fontawesome-v5'

import { Quasar,Platform,Notify } from "quasar";
// Notify.create('Danger, Will Robinson! Danger!')
Vue.use(Quasar, {
  config: {},
  plugins: {Notify,Platform},
  extras: [
    'ionicons-v4',
    'eva-icons',
  ],
  iconSet: iconSet
});
