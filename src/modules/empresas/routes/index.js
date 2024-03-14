import listadoEmpresas from '@/modules/empresas/views/listEmpresas.vue'
import formularioEmpresas from '@/modules/empresas/views/empresa.vue'

export default{
    name:'Empresas',
    path:'/empresas',
    redirect: {name: 'listado'},
    component: () => import(/* webpackChunkName: "layout"*/ '@/modules/empresas/layout/layout.vue'),
    children:[
        {
            path:'listado',
            name: 'listado',
            component: listadoEmpresas,
        },{
            path: 'formulario',
            name: 'formulario',
            component: formularioEmpresas,
        },
        //prueba de modificacion de ruta para validar que se pueda hacer las actualizciones de empresa.
        {
            path: 'formulario/:id',
            name: 'frmeditar',
            component: formularioEmpresas,
        }
        //fin de prueba
    ]
}