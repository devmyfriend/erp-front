export default{
    name:'monedas',
    path:'/monedas',
    component: () => import(/* webpackChunkName: "layout"*/ '@/shared/layout.vue'),
    redirect: '/monedas/listado/',
    children:[
        {
            path:'listado/',
            name: 'listadoMonedas',
            component: ()=> import(/* webpackChunkName: "listado"*/ '@/modules/moneda/views/listMonedas.vue'),
        }
    ]
}