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
import My_Apply from "../components/blink/My_Apply";
import Teacher_Main from "../components/Teacher_Main";
import Project_Browse from "../components/project/Project_Browse";
import Project_Create from "../components/project/Project_Create";
import Project_My_Apply from "../components/project/Project_My_Apply";
import Project_My_Release from "../components/project/Project_My_Release";
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
    path:'/teacher_main',
    name:'/teacher_main',
    component:Teacher_Main
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
      { path:'/My_Apply', name:'my_apply', component:My_Apply},
      { path:'/Project_My_Apply', name:'project_my_apply', component:Project_My_Apply},
      { path:'/Project_Browse', name:'project_browse', component:Project_Browse},
    ]
  },
  {
    path:'/teacher_main',
    name:'teacher_main',
    component:Teacher_Main,
    children:[
      { path:'/Project_Create', name:'project_create', component:Project_Create},
      { path:'/Project_My_Release', name:'project_my_release', component:Project_My_Release},
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
