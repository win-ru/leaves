import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import Company from "@/views/Company/Company";
import CompanyList from "@/views/CompanyList/CompanyList";
import Hello from "@/views/Hello";

Vue.use(VueRouter)

const routes = [

  {
    path: '/company',
    name: 'Company',
    component: Company
  },

  {
    path: '/list',
    name: 'CompanyList',
    component: CompanyList
  },

  {
    path: '/',
    name: 'Hello',
    component: Hello
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
