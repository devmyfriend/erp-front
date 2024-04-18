export default{
    name:'usuarios',
    path:'/usuarios',
/*     component: () => import('@/modules/empresas/layout/layout.vue'), */
    component: () => import('@/shared/layoutGym.vue'),
    redirect: '/usuarios/listado/',
    children:[
        {
            path: 'listado/:tipo?',
            name: 'listadoUsuarios',
            component: () => import('@/modules/usuarios/views/listUsuarios.vue'),
        }
    ]
}