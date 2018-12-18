import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/content/Login'
import Register from '@/components/content/Register'

import Index from '@/components/content/Index'
import LoginNew from '@/components/content/LoginNew'
import Home from '@/components/Home'
import SearchShow from '@/components/content/SearchShow'
import Cart from '@/components/content/Cart'
import Cartt from '@/components/content/Carttwo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/register',
      name:'Register',
      component: Register
    },
    {
      path:'/lognew',
      name:'LoginNew',
      component:LoginNew
    },
    {
      path:'/home',
      name:'Home',
      component:Home
    },
    {
      path:'/showsearch',
      name:'showsearch',
      component: SearchShow
    },
    {
      path:'/cart',
      name:'Cart',
      component: Cart
    },
    {
      path:'/cartt',
      name:'Cartt',
      component:Cartt
    }

  ]
})
