export default{
    name:'codigoPostal',
    path:'/cp',
    component: () => import(/* webpackChunkName: "layout"*/ '@/modules/codigoPostal/views/listCP.vue'),
    children:[
        {
            path:'listado/',
            name: 'listadoCP',
            component: ()=> import(/* webpackChunkName: "listado"*/ '@/modules/codigoPostal/views/listCP.vue'),
        }
    ]
}