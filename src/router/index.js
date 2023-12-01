import { createRouter, createWebHashHistory } from 'vue-router'
import buscador from '@/shared/txtbuscador.vue'

import login from '@/modules/login/components/login.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */'@/modules/dashboard/layout/layout.vue')
  },
  {
    path:'/dashboard/empresas',   //Ruta hija, se tiene que actuaizar 
    name:'moduloempresa',
    component: () => import(/* webpackChunkName: "modulempresa" */'@/modules/dashboard/views/listEmpresas.vue')
  },{
    path:'/paginador',
    name:'paginador',
    component: buscador
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
