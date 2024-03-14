import listComprobante from '@/modules/comprobante/views/listComprobante.vue'

export default{
    name:'comprobantes',
    path:'/comprobantes',
    component: () => import(/* webpackChunkName: "layout"*/ '@/modules/empresas/layout/layout.vue'),
    redirect: '/comprobantes/listado/',
    children:[
        {
            path:'listado/',
            name: 'listadoComprobantes',
            component: listComprobante,
        }
    ]
}