export default{
    name:'membresias',
    path:'/membresias',
/*     component: () => import('@/modules/empresas/layout/layout.vue'), */
    component: () => import('@/shared/layoutGym.vue'),
    redirect: '/membresias/listado/',
    children:[
        {
            path: 'listado/:tipo?',
            name: 'listadoMembresias',
            component: () => import('@/modules/membresias/views/listMembresias.vue'),
        },
        {
            path: 'tipos/:tipo?',
            name: 'tipoMembresias',
            component: () => import('@/modules/membresias/views/tipoMembresias.vue'),
        },
        {
            path: 'periodo/:tipo?',
            name: 'periodoMembresias',
            component: () => import('@/modules/membresias/views/periodosMembresias.vue'),
        }
    ]
}