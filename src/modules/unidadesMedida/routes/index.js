export default{
    name:'unidades',
    path:'/unidades',
/*     component: () => import('@/modules/empresas/layout/layout.vue'), */
    component: () => import('@/shared/layoutGym.vue'),
    redirect: '/unidades/listado/',
    children:[
        {
            path: 'listado/:tipo?',
            name: 'listadoUnidades',
            component: () => import('@/modules/unidadesMedida/views/listUnidades.vue'),
        }
    ]
}