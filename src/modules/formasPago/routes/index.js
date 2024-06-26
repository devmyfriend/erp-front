export default{
    name:'formasPago',
    path:'/formasPago',
    component: () => import(/* webpackChunkName: "layout"*/ '@/shared/layoutGym.vue'),
    redirect: '/formasPago/listado/',
    children:[
        {
            path:'listado/',
            name: 'listadoFormasPago',
            component: ()=> import(/* webpackChunkName: "listado"*/ '@/modules/formasPago/views/listFormasPago.vue'),
        }
    ]
}