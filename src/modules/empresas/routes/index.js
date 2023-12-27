export default{
    name:'Empresas',
    path:'/empresas',
    component: () => import(/* webpackChunkName: "layout"*/ '@/modules/empresas/layout/layout.vue'),
    children:[
        {
            path:'listado/:esPropietaria',
            name: 'listado',
            component: ()=> import(/* webpackChunkName: "listado"*/ '@/modules/empresas/views/listEmpresas.vue'),
            props: true
        },{
            path: 'formulario',
            name: 'formulario',
            component: ()=> import(/* webpackChunkName: "formulario"*/ '@/modules/empresas/views/empresa.vue')
        }
    ]
}