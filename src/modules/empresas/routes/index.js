export default{
    name:'Empresas',
    path:'/empresas',
    redirect: {name: 'listado'},
    component: () => import(/* webpackChunkName: "layout"*/ '@/modules/empresas/layout/layout.vue'),
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