export default{
    name:'impuestos',
    path:'/impuestos',
    component: () => import(/* webpackChunkName: "layout"*/ '@/modules/empresas/layout/layout.vue'),
    redirect: '/impuestos/listado/',
    children:[
        {
            path:'listado/',
            name: 'listadoImpuestos',
            component: ()=> import(/* webpackChunkName: "listado"*/ '@/modules/impuestos/views/listImpuestos.vue'),
        }
    ]
}