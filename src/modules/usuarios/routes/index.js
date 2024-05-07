export default{
    name:'usuarios',
    path:'/usuarios',
/*     component: () => import('@/modules/empresas/layout/layout.vue'), */
    component: () => import('@/shared/layoutGym.vue'),
    redirect: '/usuarios/listado/1&',
    children:[
        {
            path: 'listado/:ventana&:tipo?',
            name: 'listadoUsuarios',
            component: () => import('@/modules/usuarios/views/listUsuarios.vue'),
        },
        {
            path: 'tipoUsuario/:ventana&:tipo?',
            name: 'tipoUsuario',
            component: () => import('@/modules/usuarios/views/listTiposUsuario.vue'),
        },
        {
            path: 'tipoUsuarioEmpresa/:ventana&:tipo?',
            name: 'tipoUsuarioEmpresa',
            component: () => import('@/modules/usuarios/views/tipoUsuarioEmpresa.vue'),
        },
        {
            path: 'tipoUsuarioSucursal/:ventana&:tipo?',
            name: 'tipoUsuarioSucursal',
            component: () => import('@/modules/usuarios/views/tipoUsuarioSucursal.vue'),
        },
        {
            path: 'usuarioEmpresa/:ventana&:usuario?',
            name: 'usuarioEmpresa',
            component: () => import('@/modules/usuarios/views/UsuarioEmpresa.vue'),
        },
        {
            path: 'usuarioSucursal/:ventana&:usuario?',
            name: 'usuarioSucursal',
            component: () => import('@/modules/usuarios/views/UsuarioSucursal.vue'),
        },
        {
            path: 'usuarioAlmacen/:ventana&:usuario?',
            name: 'usuarioAlmacen',
            component: () => import('@/modules/usuarios/views/UsuarioAlmacen.vue'),
        },
        {
            path: 'listPermisos/:ventana',
            name: 'listPermisos',
            component: () => import('@/modules/usuarios/views/listPermisos.vue'),
        },
        {
            path: 'permisosTipoUsuario/:ventana&:tipo?',
            name: 'permisosTipoUsuario',
            component: () => import('@/modules/usuarios/views/PermisosTipoUsuario.vue'),
        }
    ]
}