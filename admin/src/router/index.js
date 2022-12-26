import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login'
import Home from '../views/Home'

import CategoryEdit from '../views/CategoryEdit'
import CategoryList from '../views/CategoryList'

import ItemEdit from '../views/ItemEdit'
import ItemList from '../views/ItemList'

import HeroEdit from '../views/HeroEdit'
import HeroList from '../views/HeroList'

import ArticleEdit from '../views/ArticleEdit'
import ArticleList from '../views/ArticleList'

import AdEdit from '../views/AdEdit'
import AdList from '../views/AdList'

Vue.use(VueRouter)

const routes = [
	{
		path: '/login',
		name: 'login',
		component: Login,
		meta: {
			isPublic: true
		}
	}, {
		path: '/',
		name: 'home',
		component: Home,
		children: [
			{ path: '/categories/create', component: CategoryEdit },
			{ path: '/categories/edit/:id', component: CategoryEdit, props: true }, // 将页面的id通过地址注入页面
			{ path: '/categories/list', component: CategoryList },

			{ path: '/items/create', component: ItemEdit },
			{ path: '/items/edit/:id', component: ItemEdit, props: true }, // 将页面的id通过地址注入页面
			{ path: '/items/list', component: ItemList, props: true },

			{ path: '/heroes/create', component: HeroEdit },
			{ path: '/heroes/edit/:id', component: HeroEdit, props: true }, // 将页面的id通过地址注入页面
			{ path: '/heroes/list', component: HeroList, props: true },

			{ path: '/articles/create', component: ArticleEdit },
			{ path: '/articles/edit/:id', component: ArticleEdit, props: true }, // 将页面的id通过地址注入页面
			{ path: '/articles/list', component: ArticleList, props: true },

			{ path: '/ads/create', component: AdEdit },
			{ path: '/ads/edit/:id', component: AdEdit, props: true }, // 将页面的id通过地址注入页面
			{ path: '/ads/list', component: AdList, props: true },
		]
	}
]

const router = new VueRouter({
	routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
	// 【BUG】-> token未进行验证，只是判断是否存在不安全
	if (!to.meta.isPublic && !localStorage.token) {
		return next('/login')
	}
	next()
})

export default router
