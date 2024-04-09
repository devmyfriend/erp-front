export default{
    name:'cfdi',
    path:'/cfdi',
    component: () => import(/* webpackChunkName: "layout"*/ '@/shared/layoutGym.vue'),
    redirect: '/cfdi/listado/',
    children:[
        {
            path:'listado/',
            name: 'listadoCFDi',
            component: ()=> import(/* webpackChunkName: "listado"*/ '@/modules/usoCFDi/views/listCFDi.vue'),
        }
    ]
}