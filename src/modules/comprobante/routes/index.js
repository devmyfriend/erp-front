export default{
    name:'comprobantes',
    path:'/comprobantes',
    component: () => import(/* webpackChunkName: "layout"*/ '@/modules/comprobante/views/listComprobante.vue'),
    redirect: '/comprobantes/listado/',
    children:[
        {
            path:'listado/',
            name: 'listadoComprobantes',
            component: ()=> import(/* webpackChunkName: "listado"*/ '@/modules/comprobante/views/listComprobante.vue'),
        }
    ]
}