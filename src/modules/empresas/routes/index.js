export default{
    name:'Empresas',
    path:'/empresas',
    component: () => import(/* webpackChunkName: "layout"*/ '@/shared/layout.vue'),
    redirect: '/empresas/listado',
    children:[
        {
            path:'listado',
            name: 'listadoEmpresas',
            component: ()=> import(/* webpackChunkName: "listado"*/ '@/modules/empresas/views/listEmpresas.vue')
        },{
            path: 'formulario',
            name: 'formularioEmpresas',
            component: ()=> import(/* webpackChunkName: "formulario"*/ '@/modules/empresas/views/empresa.vue')
        }
    ]
}