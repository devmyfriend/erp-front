export default{
    name:'impuestos',
    path:'/impuestos',
    component: () => import(/* webpackChunkName: "layout"*/ '@/shared/layout.vue'),
    redirect: '/impuestos/listado/',
    children:[
        {
            path:'listado/',
            name: 'listadoImpuestos',
            component: ()=> import(/* webpackChunkName: "listado"*/ '@/modules/impuestos/views/listImpuestos.vue'),
        }
    ]
}