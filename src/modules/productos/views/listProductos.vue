<script setup>
import { ref, onMounted } from 'vue'
import ventanas from '../components/ventanas.vue'
import buscadorProductos from '../components/buscadorProductos.vue';
import btNuevoProducto from '../components/btNuevoProducto.vue';
import { useRoute } from 'vue-router';
import TablaInfinita from '@/shared/sTablaInfinita.vue';
const route = useRoute();
const { useProductos } = require('../store/productos.js')
const store = useProductos();

const btActivo = ref(1);
const tipoProducto = ref(route.params.tipo || 'Productos');
const idProducto = ref(0);
const ListadoProductos = ref([]);

const encabezados = ref(['','Clave Producto', 'Tipo de Producto', 'Nombre', 'ID de Linea']);
const paginado = ref(5);
const acciones = ref(2);

onMounted(() => {
    cargarDatos();
});

function cargarDatos(){
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
}
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
                        <option value="Productos">Productos</option>
                        <option value="Servicios">Servicios</option>
                        <option value="Insumos">Insumos</option>
                        <option value="Activos">Activos</option>
                        <option value="Productos_Terminados">Productos Terminados</option>
                        <option value="Productos_Terceros">Productos de Terceros</option>
                        <option value="Suscripciones">Suscripciones</option>
                        <option value="Combos">Combos</option>
                    </select>
                    <btNuevoProducto :tipoProducto="tipoProducto" :idProducto="idProducto"/>
                    <!-- <input class="" type="number" min="0" max="99" v-model="idProducto"> -->
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
                            <td> {{ producto.ClaveProducto }}</td>
                            <td> {{ producto.TipoProducto }}</td>
                            <td> {{ producto.Nombre }}</td>
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
    height: 100%;
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
    margin-top: 1.5rem;
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
</style>