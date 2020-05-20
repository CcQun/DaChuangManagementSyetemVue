import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login'
import Main from '../components/Main'
import Create from '../components/management/Create'
import Release from "../components/blink/Release";
import Browse from "../components/blink/Browse";
import Wel from "../components/wel";
import wel from "../components/wel";
import My_Release from "../components/blink/My_Release";
// const Login = () => import('../components/Login')
// import Main from "../components/Main";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // redirect 重定向
    redirect: '/app_login'
  },
  {
    path:'/app_login',
    name:'/app_login',
    component:Login
  },
  {
    path:'/main',
    name:'main',
    component:Main,
    redirect: '/wel',
    children:[{path:'/wel',name:'wel',component:Wel},
      { path:'/Release', name:'release', component:Release},
      { path:'/Create', name:'create', component:Create},
      { path:'/Browse', name:'browse', component:Browse},
      { path:'/My_Release', name:'my_release', component:My_Release},
    ]
  },
  // {
  //   path:'/create',
  //   name:'create',
  //   component:Create
  // },
  // {
  //   path:'/blink/Release',
  //   name:'release',
  //   component:Release
  // },
  // {
  //   path:'/blink/Browse',
  //   name:'browse',
  //   component:Browse
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if(to.path === '/app_login') {
//     next();
//   } else {
//     let token = localStorage.getItem('token');
//     if(token === 'null' || token === '') {
//       next('/app_login');
//     }else {
//       next();
//     }
//   }
// });




export default router
