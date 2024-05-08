<script setup>
import { ref, onMounted, watch } from 'vue'
import ventanas from '../components/ventanas.vue'
import buscadorProductos from '../components/buscadorProductos.vue';
import btNuevoProducto from '../components/btNuevoProducto.vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();

const { useProductos } = require('../store/productos.js')
const store = useProductos();

const btActivo = ref(1);
const tipoProducto = ref(parseInt(route.params.tipo) || 1);
const codigoProducto = ref(0);
const ListadoProductos = ref([]);
const ListadoTiposProducto = ref([]);

onMounted(() => {
    cargarDatos();
});

function cargarDatos(){
    store.cargarProductos().then(() =>{
        ListadoProductos.value = store.getProductos.filter(producto => producto.TipoProductoId == tipoProducto.value);
        console.log('El primer registro es: ' + JSON.stringify(ListadoProductos.value[0]));
    });

    store.cargarTiposProducto().then(() => {
        ListadoTiposProducto.value = store.getTiposProducto;
    });

}

function transfromarTipo(tipoP){
  const t = {       /* Solve: Debería traer estos datos desde una consulta a ref_ComboBox */
    '2': 'Producto POS',
    '3': 'Servicios',
    '4': 'Insumos',
    '5': 'Activos',
    '6': 'Terminados',
    '7': 'Terceros',
    '8': 'Suscripciones',
    '9': 'Combos'
  };
  
  return t[tipoP] || tipoP;
};

function borrarProducto(t, id){
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrarlo!'
    }).then((result) => {
        if (result.isConfirmed) {
            store.borrarProducto(t, id).then(() => {
                cargarDatos();
            });
        }
    })
}

function editarProducto(p){
    codigoProducto.value = p.CodigoProducto;
    router.push({ name: 'formularioProducto', params: { id: codigoProducto.value, tipo: tipoProducto.value } });
}

watch (tipoProducto, (newValue, oldValue) => {
    ListadoProductos.value = store.getProductos.filter(producto => producto.TipoProductoId == newValue);

    if (ListadoProductos.value.length == 0) {
            Swal.fire({
                icon: 'info',
                title: 'No hay productos',
                text: 'No hay productos de este tipo'
            });
            tipoProducto.value = oldValue;
        }
});
</script>

<template>
    <header>
        <h1> Productos {{ tipoProducto }} </h1>
    </header>
    <div class="contenedor">
        <div class="ventanas">
            <ventanas :tipoProducto="tipoProducto" :btActivo="btActivo" :codigoProducto="codigoProducto"/>
        </div>
        <div class="contenido">
            <h2> Listado de Productos</h2>
            <div class="frm">
                <div>
                    <buscadorProductos/>
                </div>
                <div class="formulario">
                    <label for="tipoProducto" class="labelTipo"> Tipo: </label>
                    <select name="tipoProducto" id="tipoProducto" v-model="tipoProducto">
                        <option v-for="Tipo in ListadoTiposProducto" :value="Tipo.TipoProductoId"> {{ Tipo.NombreTipoProducto }}</option>
                    </select>
                    <btNuevoProducto :tipoProducto="tipoProducto"/>
                </div>
            </div>
            <div class="tablaContainer animate__animated animate__fadeIn animate__fast" >
                <table>
                    <thead>
                        <tr>
                            <th>Producto Id</th>
                            <th class="col-start">Código de Producto</th>
                            <th>Tipo Producto Id</th>
                            <th class="col-start">Nombre</th>
                            <th>ID de Linea</th>
                            <th>Creado En</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(producto, index) in ListadoProductos" :key="index" :class="{td1: index % 2 == 0, td2: index % 2 != 0}">
                            <td class="col-xxs">
                                {{ producto.ProductoId }}
                            </td>
                            <td class="col-s col-start">
                                {{ producto.CodigoProducto }}
                            </td>
                            <td class="col-xxs">
                                {{ producto.TipoProductoId }}
                            </td>
                            <td class="col-auto col-start">
                                {{ producto.NombreProducto }}
                            </td>
                            <td class="col-xxs">
                                {{ producto.LineaId }}
                            </td>
                            <td class="col-s">
                                {{ producto.CreadoEn }}
                            </td>
<!--                             <td :class="{ productoDeshabilitado: (producto.Borrado == 1) }" class="colStart"> {{ producto.ClaveProducto }}</td>
                            
                            <td :class="{ productoDeshabilitado: (producto.Borrado == 1) }"> 
                                {{ transfromarTipo(producto.TipoProducto) }}
                            </td>
                            
                            <td :class="{ productoDeshabilitado: (producto.Borrado == 1) }" class="colStart"> {{ producto.Nombre }}</td>
                            <td :class="{ productoDeshabilitado: (producto.Borrado == 1) }" > {{ producto.LineaId }}</td>
                            <td :class="{ productoDeshabilitado: (producto.Borrado == 1) }"> {{ (typeof producto.Borrado === 'number' && (producto.Borrado === 0 || producto.Borrado === 1) 
                                ? (producto.Borrado === 1 ? 'Si' : 'No') 
                                : ( typeof producto.Borrado === 'boolean' && (producto.Borrado === true || producto.Borrado === false) 
                                    ? (producto.Borrado === true ? 'Si' : 'No') 
                                    : producto.Borrado )) 
                                }} 
                            </td> -->
                            <td class="col-xs" :class="{ productoDeshabilitado: (producto.Borrado == 1) }"> 
                                <img src="@/assets/img/edit.svg" alt="Editar" class="btTabla" @click="editarProducto(producto)"> 
                                <img src="@/assets/img/trash.svg" alt="Borrar" class="btTabla" @click="borrarProducto(tipoProducto, producto.ClaveProducto)" v-if="producto.Borrado == 0">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('../../../styles/tablaListado.css');
.contenedor {
    background-color: #fff;
    width: 100%;
    height: 51rem;
    overflow: hidden;
    border-radius: 1rem;
}
header{
    margin-bottom: 1.5rem;
}
h1{
    text-align: start;
    color: #fff;
    font-size: 1.75rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    text-transform: capitalize;
}
h2{
    text-align: start;
    color: #000;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;

}
.contenido{
    width: 100%;
    overflow: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
}
.frm{
    display: flex;
    justify-content: space-between;
}
.formulario{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.formulario *{
    margin: 0rem 0rem 0rem 1rem;
}
.formulario select {
    width: 41rem;
    height: 2.1875rem;
    color: #000;
    border: none;
    border-radius: 0.3125rem;
    padding-left: 1rem;
    margin-right: 0.5rem;
    border: 1px solid #000;
}
.formulario select:focus {
    outline: none;
}
.labelTipo{
    font-size: 1rem;
    font-weight: 600;
    color: #000;
    padding-right: 0.5rem;
}
.tablaContainer{
    width: 100%;
    margin: 0rem auto;
    margin-top: 1.75rem;
    max-height: 39.5rem;
}
/* table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #000;
}
td, th {
  border: 1px solid #000;
  padding: 0.25rem 0.5rem;
  margin: 0rem 0.25rem 0rem 0.25rem;
}
th {
  background-color: #999999;
  color: #fff;
  height: 1rem;
}
td{
  background-color: #fff;
  color: #999999;
  height: 2rem;
  padding: 0rem 0.5rem 0rem 0.5rem;
} */

th{
    padding: 0.25rem;
    height: 2.75rem;
}

.colStart{
    text-align: start;
}
.productoDeshabilitado{
    background-color: #c9c9c9;
    color: #fff;
}
.btTabla{
    cursor: pointer;
}
</style>