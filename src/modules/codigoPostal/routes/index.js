export default{
    name:'codigoPostal',
    path:'/cp',
    component: () => import(/* webpackChunkName: "layout"*/ '@/modules/codigoPostal/layout/layout.vue'),
    redirect: '/cp/listado/',
    children:[
        {
            path:'listado/',
            name: 'listadoCP',
            component: ()=> import(/* webpackChunkName: "listado"*/ '@/modules/codigoPostal/views/listCP.vue'),
            props: true
        }
    ]
}