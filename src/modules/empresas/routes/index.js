export default{
    name:'Empresas',
    path:'/empresas',
    component: () => import(/* webpackChunkName: "layout"*/ '@/modules/empresas/layout/layout.vue'),
    redirect: '/empresas/listado',
    children:[
        {
            path:'listado',
            name: 'listado',
            component: ()=> import(/* webpackChunkName: "listado"*/ '@/modules/empresas/views/listEmpresas.vue')
        },{
            path: 'formulario',
            name: 'formulario',
            component: ()=> import(/* webpackChunkName: "formulario"*/ '@/modules/empresas/views/empresa.vue')
        }
    ]
}