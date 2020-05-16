import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login'
import Main from '../components/Main'
import Create from '../components/management/Create'
import Release from "../components/blink/Release";
// const Login = () => import('../components/Login')
// import Main from "../components/Main";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // redirect 重定向
    redirect: '/login'
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/main',
    name:'main',
    component:Main
  },
  {
    path:'/management/create',
    name:'create',
    component:Create
  },
  {
    path:'/blink/Release',
    name:'create',
    component:Release
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
