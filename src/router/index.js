import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/modules/login/components/login.vue'
import empresasRouter from '@/modules/empresas/routes/index'

import testLalo from '@/modules/empresas/layout/testLalo.vue'

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
  },{
    path: '/testLalo',
    name: 'testLalo',
    component: testLalo
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router