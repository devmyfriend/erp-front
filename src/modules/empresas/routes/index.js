export default{
    name:'Empresas',
    path:'/empresas',
    component: () => import(/* webpackChunkName: "layout"*/ '@/modules/empresas/layout/layout.vue'),
    children:[
        {
            path:'listado',
            name: 'listado',
            component: ()=> import(/* webpackChunkName: "listado"*/ '@/modules/empresas/views/listEmpresas.vue')
        }
    ]
}