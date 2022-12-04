import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login'
import Home from '../views/Home'

import CategoryEdit from '../views/CategoryEdit'
import CategoryList from '../views/CategoryList'

import ItemEdit from '../views/ItemEdit'
import ItemList from '../views/ItemList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
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
      { path: '/items/list', component: ItemList, props: true }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
