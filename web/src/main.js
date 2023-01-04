import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

Vue.config.productionTip = false

import './assets/scss/style.scss'



// require styles
import 'swiper/dist/css/swiper.css'
// require iconfont
import './assets/iconfont/iconfont.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper, /* { default global options } */)

// vant
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

import Card from './components/Card.vue'
Vue.component('m-card', Card)

import ListCard from './components/ListCard.vue'
Vue.component('m-list-card', ListCard)

import Tabbar from './components/Tabbar.vue'
Vue.component('m-tabbar', Tabbar)

import http from './http.js'
Vue.prototype.$http = http

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
