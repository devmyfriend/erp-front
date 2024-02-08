import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/modules/login/components/login.vue'

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
  //borrar esta seccion de prubas
  {
    path:'/helloworld',
    name: 'helloworld',
    component: HelloWorld
  }
  //fin de la seccion de purebas.
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router