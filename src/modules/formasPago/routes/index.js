import listFormasPago from '@/modules/formasPago/views/listFormasPago.vue'

export default{
    name:'formasPago',
    path:'/formasPago',
    component: () => import(/* webpackChunkName: "layout"*/ '@/modules/empresas/layout/layout.vue'),
    redirect: '/formasPago/listado/',
    children:[
        {
            path:'listado/',
            name: 'listadoFormasPago',
            component: listFormasPago,
        }
    ]
}