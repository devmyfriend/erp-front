<script setup>
import { ref, onMounted, watch } from 'vue'
import ventanas from '../components/ventanas.vue'
import buscadorProductos from '../components/buscadorProductos.vue';
import btNuevoProducto from '../components/btNuevoProducto.vue';
import { useRoute } from 'vue-router';
import TablaInfinita from '@/shared/sTablaInfinita.vue';
const route = useRoute();
const { useProductos } = require('../store/productos.js')
const store = useProductos();

const btActivo = ref(1);
const tipoProducto = ref(route.params.tipo);
const idProducto = ref(0);
const ListadoProductos = ref([]);

const encabezados = ref(['','Clave Producto', 'Tipo de Producto', 'Nombre', 'ID de Linea']);
const paginado = ref(5);
const acciones = ref(2);

onMounted(() => {
    cargarDatos();
});

function cargarDatos(t){
    if(t === undefined){
        store.cargarProductos().then(() =>{
            ListadoProductos.value = store.getProductos;
            ListadoProductos.value = ListadoProductos.value.map(producto => {
                return {
                    void: '',
                    ClaveProducto: producto.CodigoProducto,
                    TipoProducto: producto.TipoProductoId,
                    Nombre: producto.NombreProducto,
                    LineaId: producto.LineaId,
                };
            });
        })
    }else{
        store.cargarProductos(t).then(() =>{
            ListadoProductos.value = store.getProductos;
            ListadoProductos.value = ListadoProductos.value.map(producto => {
                return {
                    void: '',
                    ClaveProducto: producto.CodigoProducto,
                    TipoProducto: producto.TipoProductoId,
                    Nombre: producto.NombreProducto,
                    LineaId: producto.LineaId,
                };
            });
        })
    }
}

watch(tipoProducto, (newValue, oldValue) => {
    cargarDatos(newValue);
});
</script>

<template>
    <header>
        <h1> Productos: {{ idProducto }} - {{ tipoProducto }}</h1>
    </header>
    <div class="contenedor">
        <div class="ventanas">
            <ventanas :tipoProducto="tipoProducto" :btActivo="btActivo" :idProducto="idProducto"/>
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
                        <option value="pos">Productos</option>
                        <option value="servicio">Servicios</option>
                        <option value="insumo">Insumos</option>
                        <option value="activo">Activos</option>
                        <option value="final">Productos Terminados</option>
                        <option value="proveedor">Productos de Terceros</option>
                        <option value="suscripcion">Suscripciones</option>
                        <option value="combo">Combos</option>
                    </select>
                    <btNuevoProducto :tipoProducto="tipoProducto" :idProducto="idProducto"/>
                </div>
            </div>
            <div class="tablaContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Clave Producto</th>
                            <th>Tipo de Producto</th>
                            <th>Nombre</th>
                            <th>ID de Linea</th>
                            <th> Acciones </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="producto in ListadoProductos" :key="producto.ClaveProducto">
                            <td class="colStart"> {{ producto.ClaveProducto }}</td>
                            <td> {{ producto.TipoProducto }}</td>
                            <td class="colStart"> {{ producto.Nombre }}</td>
                            <td> {{ producto.LineaId }}</td>
                            <td> <img src="@/assets/img/edit.svg" alt="Editar" class="me-3"> <img src="@/assets/img/trash.svg" alt="Borrar"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>  
.contenedor {
    background-color: #D9D9D9;
    width: 100%;
    height: 51rem;
    overflow: hidden;
}
header{
    margin-bottom: 1.5rem;
}
h1{
    text-align: start;
    color: #000;
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
table {
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
}
.colStart{
    text-align: start;
}
</style>