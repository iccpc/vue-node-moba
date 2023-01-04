import axios from 'axios'
import { Notify } from 'vant';
import router from './router'

const http = axios.create({
	baseURL: 'http://localhost:5000/web/api'
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
	if (localStorage.token) {
		// 携带token令牌 - 鉴权
		config.headers.Authorization = 'Bearer ' + localStorage.token
	}
	return config;
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
	// 2xx 范围内的状态码都会触发该函数。
	// 对响应数据做点什么
	return response;
}, function (error) {
	if (error.response.data.message) {
		Notify({
			message: error.response.data.message,
			color: '#ad0000',
			background: '#ffe1e1',
		});
		if (error.response.status === 401) {
			router.push('/login')
		}
	}
	return Promise.reject(error);
});

export default http