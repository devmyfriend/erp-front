export default{
    name:'codigoPostal',
    path:'/cp',
    component: () => import(/* webpackChunkName: "layout"*/ '@/shared/layout.vue'),
    redirect: '/cp/listado/',
    children:[
        {
            path:'listado/',
            name: 'listadoCP',
            component: ()=> import(/* webpackChunkName: "listado"*/ '@/modules/codigoPostal/views/listCP.vue'),
        }
    ]
}