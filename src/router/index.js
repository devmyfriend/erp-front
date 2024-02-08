import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/modules/login/components/login.vue'
import HelloWorld from '@/components/HelloWorld.vue'

import empresasRouter from '@/modules/empresas/routes/index'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/login',
    component: Login
  },
  {
    path: '/empresas',
    ...empresasRouter
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
 
  {
    path:'/helloworld',
    name: 'helloworld',
    component: HelloWorld
  }
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router