import listadoRegimenes from '@/modules/regimenFiscal/views/listRegimen.vue'

export default{
    name:'regimenFiscal',
    path:'/regimenFiscal',
    component: () => import(/* webpackChunkName: "layout"*/ '@/modules/empresas/layout/layout.vue'),
    redirect: '/regimenFiscal/listado/',
    children:[
        {
            path:'listado/',
            name: 'listadoRegimenFiscal',
            component: listadoRegimenes,
        }
    ]
}