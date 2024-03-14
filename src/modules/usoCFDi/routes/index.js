import listaddoCFDi from '@/modules/usoCFDi/views/listCFDi.vue'
import formularioCFDi from '@/modules/usoCFDi/views/frmCFDi.vue'

export default{
    name:'cfdi',
    path:'/cfdi',
    component: () => import(/* webpackChunkName: "layout"*/ '@/modules/empresas/layout/layout.vue'),
    redirect: '/cfdi/listado/',
    children:[
        {
            path:'listado/',
            name: 'listadoCFDi',
            component: listaddoCFDi,
        },{
            path: 'formulario',
            name: 'formularioCFDi',
            component: formularioCFDi,
        }
    ]
}