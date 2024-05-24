import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/modules/login/components/login.vue'

import empresasRouter from '@/modules/empresas/routes/index'

import HelloWorld from '@/components/HelloWorld.vue'

import cpRouter from '@/modules/codigoPostal/routes/index'
import monedasRouter from '@/modules/moneda/routes/index'
import comprobantesRouter from '@/modules/comprobante/routes/index'
import cfdiRouter from '@/modules/usoCFDi/routes/index'
import impuestosRouter from '@/modules/impuestos/routes/index'
import regimenRouter from '@/modules/regimenFiscal/routes/index'
import formasPagoRouter from '@/modules/formasPago/routes/index'

import productosRouter from '@/modules/productos/routes/index'
import unidadesMedidaRouter from '@/modules/unidadesMedida/routes/index'
import usuariosRouter from '@/modules/usuarios/routes/index'
import membresiasRouter from '@/modules/membresias/routes/index'
import activosRouter from '@/modules/activos/routes/index'

import almacenesRouter from '@/modules/almacen/routes/index'

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
  //ruta de pruebas se puede borrar
  {
    path:'/helloworld',
    name: 'helloworld',
    component: HelloWorld
  },
  {
    path: '/Menu',
    name: 'Menu',
    component: () => import('@/shared/Menu.vue')
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
  {
    path: '/productos',
    ...productosRouter
  },
  {
    path: '/unidades',
    ...unidadesMedidaRouter
  },
  {
    path: '/usuarios',
    ...usuariosRouter
  },
  {
    path: '/membresias',
    ...membresiasRouter
  },
  {
    path: '/activos',
    ...activosRouter
  },
  {
    path: '/almacenes',
    ...almacenesRouter
  
  }
 //fin de rutas de pruebas.
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
