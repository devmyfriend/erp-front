import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/modules/login/components/login.vue'

import HelloWorld from '@/components/HelloWorld.vue'


import empresasRouter from '@/modules/empresas/routes/index'
import tablaInfinita from '@/shared/sTablaInfinita.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/login',
    component: Login
  },
  {
    path: '/tablaInfinita',
    name: 'tablaInfinita',
    component: tablaInfinita
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
  //ruta de pruebas se puede borrar
  {
    path:'/helloworld',
    name: 'helloworld',
    component: HelloWorld
  }
 //fin de rutas de pruebas.
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router