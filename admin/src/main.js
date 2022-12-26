import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

Vue.config.productionTip = false

import './assets/scss/style.scss'
import router from './router'

import http from './http'
Vue.prototype.$http = http

Vue.mixin({
	computed: {
		uploadURL() {
			return this.$http.defaults.baseURL + '/upload'
		}
	},
	methods: {
		getAuthHeaders() {
			return { Authorization: `Bearer ${localStorage.token || ''}` }
		}
	}
})

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
