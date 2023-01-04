import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Main from '../views/Main.vue'

import Login from '../views/Login.vue'
import Article from '../views/Article.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import Me from '../views/Me.vue'
import Body from '../views/Body.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'main',
		component: Main,
		children: [
			{ path: '/', name: 'home', component: Home },
			{ path: '/articles/:id', name: 'article', component: Article, props: true },
			{ path: '/edit', name: 'edit', component: ArticleEdit, },
			{ path: '/login', name: 'login', component: Login, meta: { isPublice: true } },
			{
				path: '/me', name: 'me', component: Me,
			},
			{path:'/body', name: 'body', component: Body}
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
