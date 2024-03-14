import listProductos from '@/modules/productos/views/listProductos.vue'
import frmProductos from '@/modules/productos/views/frmProductos.vue'
import almacenProductos from '@/modules/productos/views/almacenProductos.vue'
import detalleCombo from '@/modules/productos/views/detalleCombo.vue'
import politicasProductos from '@/modules/productos/views/politicasProductos.vue'
import cantidadAlmacen from '@/modules/productos/views/cantidadAlmacen.vue'
import proveedoresProductos from '@/modules/productos/views/proveedoresProductos.vue'

export default{
    name:'productos',
    path:'/productos',
    component: () => import('@/modules/empresas/layout/layout.vue'),
    redirect: '/productos/listado/',
    children:[
        {
            path: 'listado/:tipo?',
            name: 'listadoProductos',
            component: listProductos,
        },
        {
            path: 'formulario/:tipo?&:id?',
            name: 'formularioProducto',
            component: frmProductos,
        },
        {
            path: 'almacen/:tipo?&:id?',
            name: 'almacenProducto',
            component: almacenProductos,
        },
        {
            path: 'detalleCombo/:id?',
            name: 'detalleCombo',
            component: detalleCombo,
        },
        {
            path: 'politicas/:id?',
            name: 'politicasProducto',
            component: politicasProductos,
        },
        {
            path: 'cantidadAlmacen/:tipo?&:id?',
            name: 'cantidadAlmacen',
            component: cantidadAlmacen,
        },{
            path: 'proveedores/:tipo?&:id?',
            name: 'proveedoresProducto',
            component: proveedoresProductos,
        }
    ]
}