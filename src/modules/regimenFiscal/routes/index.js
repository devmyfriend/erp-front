export default{
    name:'regimenFiscal',
    path:'/regimenFiscal',
    component: () => import(/* webpackChunkName: "layout"*/ '@/shared/layout.vue'),
    redirect: '/regimenFiscal/listado/',
    children:[
        {
            path:'listado/',
            name: 'listadoRegimenFiscal',
            component: ()=> import(/* webpackChunkName: "listado"*/ '@/modules/regimenFiscal/views/listRegimen.vue'),
        }
    ]
}