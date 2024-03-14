export default{
    name:'productos',
    path:'/productos',
    component: () => import('@/modules/empresas/layout/layout.vue'),
    redirect: '/productos/listado/',
    children:[
        {
            path: 'listado/:tipo?',
            name: 'listadoProductos',
            component: () => import('@/modules/productos/views/listProductos.vue'),
        },
        {
            path: 'formulario/:tipo?&:id?',
            name: 'formularioProducto',
            component: () => import('@/modules/productos/views/frmProductos.vue'),
        },
        {
            path: 'almacen/:tipo?&:id?',
            name: 'almacenProducto',
            component: () => import('@/modules/productos/views/almacenProductos.vue'),
        },
        {
            path: 'detalleCombo/:id?',
            name: 'detalleCombo',
            component: () => import('@/modules/productos/views/detalleCombo.vue'),
        },
        {
            path: 'politicas/:id?',
            name: 'politicasProducto',
            component: () => import('@/modules/productos/views/politicasProductos.vue'),
        },
        {
            path: 'cantidadAlmacen/:tipo?&:id?',
            name: 'cantidadAlmacen',
            component: () => import('@/modules/productos/views/cantidadAlmacen.vue'),
        },{
            path: 'proveedoresProducto/:tipo?&:id?',
            name: 'proveedoresProducto',
            component: () => import('@/modules/productos/views/proveedoresProductos.vue'),
        }
    ]
}