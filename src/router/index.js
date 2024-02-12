import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/modules/login/components/login.vue'
import empresasRouter from '@/modules/empresas/routes/index'


import HelloWorld from '@/components/HelloWorld.vue'
import ModalC from '@/modules/contacto/components/ListaContacto.vue'
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
    path: '/modalC',
    name: 'modalC',
    component: ModalC
  }
 //fin de rutas de pruebas.
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router