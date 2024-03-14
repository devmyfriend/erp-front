export default{
    name:'formasPago',
    path:'/formasPago',
    component: () => import(/* webpackChunkName: "layout"*/ '@/modules/empresas/layout/layout.vue'),
    redirect: '/formasPago/listado/',
    children:[
        {
            path:'listado/',
            name: 'listadoFormasPago',
            component: ()=> import(/* webpackChunkName: "listado"*/ '@/modules/formasPago/views/listFormasPago.vue'),
        }
    ]
}