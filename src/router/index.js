import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/modules/login/components/login.vue'

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router