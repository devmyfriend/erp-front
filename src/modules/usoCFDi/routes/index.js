export default{
    name:'cfdi',
    path:'/cfdi',
    component: () => import(/* webpackChunkName: "layout"*/ '@/modules/empresas/layout/layout.vue'),
    redirect: '/cfdi/listado/',
    children:[
        {
            path:'listado/',
            name: 'listadoCFDi',
            component: ()=> import(/* webpackChunkName: "listado"*/ '@/modules/usoCFDi/views/listCFDi.vue'),
        },{
            path: 'formulario',
            name: 'formularioCFDi',
            component: ()=> import(/* webpackChunkName: "formulario"*/ '@/modules/usoCFDi/views/frmCFDi.vue')
        }
    ]
}