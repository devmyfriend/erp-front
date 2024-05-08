export default{
    name:'impuestos',
    path:'/impuestos',
    component: () => import(/* webpackChunkName: "layout"*/ '@/shared/layoutGym.vue'),
    redirect: '/impuestos/listado/',
    children:[
        {
            path:'listado/',
            name: 'listadoImpuestos',
            component: ()=> import(/* webpackChunkName: "listado"*/ '@/modules/impuestos/views/listImpuestos.vue'),
        },
        {
            path: 'listadoCompuestos/',
            name: 'listadoImpuestosCompuestos',
            component: ()=> import(/* webpackChunkName: "listado"*/ '@/modules/impuestos/views/listImpuestosCompuestos.vue'),
        },
        {
            path: 'listadoPropios/',
            name: 'listadoImpuestosPropios',
            component: ()=> import(/* webpackChunkName: "listado"*/ '@/modules/impuestos/views/listImpuestosPropios.vue'),
        }
    ]
}