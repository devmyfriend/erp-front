import listadoCodigoPostal from '@/modules/codigoPostal/views/listCP.vue'

export default{
    name:'codigoPostal',
    path:'/cp',
    component: () => import(/* webpackChunkName: "layout"*/ '@/modules/empresas/layout/layout.vue'),
    redirect: '/cp/listado/',
    children:[
        {
            path:'listado/',
            name: 'listadoCP',
            component: listadoCodigoPostal,
        }
    ]
}