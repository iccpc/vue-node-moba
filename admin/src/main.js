import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

Vue.config.productionTip = false

import './assets/scss/style.scss'
import router from './router'

import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:5000/admin/api',
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
