import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/modules/login/components/login.vue'

import empresasRouter from '@/modules/empresas/routes/index'
import cpRouter from '@/modules/codigoPostal/routes/index'
import monedasRouter from '@/modules/moneda/routes/index'
import comprobantesRouter from '@/modules/comprobante/routes/index'

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
    path: '/cp',
    ...cpRouter
  },
  {
    path: '/monedas',
    ...monedasRouter
  },
  {
    path: '/comprobantes',
    ...comprobantesRouter
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