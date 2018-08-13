// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import {
  /* eslint-disable no-unused-vars */
  Style,
  Scroll,
  IndexList,
} from 'cube-ui'

import '@/styles/index.scss'

fastclick.attach(document.body)
Vue.use(VueLazyload)
Vue.use(Scroll)
Vue.use(IndexList)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
