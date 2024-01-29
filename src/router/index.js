import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/modules/login/components/login.vue'

import empresasRouter from '@/modules/empresas/routes/index'
import cpRouter from '@/modules/codigoPostal/routes/index'
import monedasRouter from '@/modules/moneda/routes/index'
import comprobantesRouter from '@/modules/comprobante/routes/index'
import cfdiRouter from '@/modules/usoCFDi/routes/index'
import impuestosRouter from '@/modules/impuestos/routes/index'
import regimenRouter from '@/modules/regimenFiscal/routes/index'
import formasPagoRouter from '@/modules/formasPago/routes/index'

import menuTemporal from '../shared/menuTemporal.vue'

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
    path: '/cfdi',
    ...cfdiRouter
  },
  {
    path: '/impuestos',
    ...impuestosRouter
  },
  {
    path: '/regimenFiscal',
    ...regimenRouter
  },
  {
    path: '/formasPago',
    ...formasPagoRouter
  },
  /* Menú temporal: Vistas de los nuevos módulos*/
  {
    path: '/MenuTemporal',
    name: 'MenuTemporal',
    component: menuTemporal
  },
  /* FIN | Menú temporal */
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