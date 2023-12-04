import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/modules/login/components/login.vue'
import empresasRouter from '@/modules/empresas/routes/index'

/* Pruebas Lalo */
import testLalo2 from '@/shared/tabla.vue'
import testLalo from '@/modules/empresas/views/empresa.vue'

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
  },{
    path: '/testLalo2',
    name: 'testLalo2',
    component: testLalo2
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router