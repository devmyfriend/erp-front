<script setup>
import { ref } from 'vue'
import ventanas from '../components/ventanas.vue'
import { useRoute } from 'vue-router';

const route = useRoute();
const idProducto = ref( route.params.id || '0');
const tipoProducto = ref(route.params.tipo || '');
const btActivo = ref(7);

const listadoProveedores = ref([
    {id: 1, nombre: 'Proveedor 1', costo: 22.34},
    {id: 2, nombre: 'Proveedor 2', costo: 36.36},
    {id: 3, nombre: 'Proveedor 3', costo: 54.67},
    {id: 4, nombre: 'Proveedor 4', costo: 88.62},
    {id: 5, nombre: 'Proveedor 5', costo: 19.69},
]);

</script>

<template>
    <header>
        <h1> Productos: {{ idProducto }} - {{ tipoProducto }} </h1>
    </header>
    <div class="contenedor">
        <div class="ventanas">
            <ventanas :tipoProducto="tipoProducto" :btActivo="btActivo" :idProducto="idProducto"/>
          </div>
        <div class="contenido">
            <div class="contenedorTabla animate__animated animate__fadeIn">
                <table>
                    <thead>
                        <tr>
                            <th> Proveedor </th>
                            <th> Costo </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="registro in listadoProveedores" :key="registro.id">
                            <td class="col80"> {{registro.nombre}}   </td>
                            <td class="col20"> {{registro.costo}} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
}
.contenido{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}
.btActivo{
    background-color: #D9D9D9;
    border: 2px solid #999999;
    border-bottom: none;
    border-right: none;
}
.frm{
    display: flex;
    width: 100%;
    text-align: start;
    margin-bottom: 1.75rem;
}
label{
    font-size: 1.25rem;
    font-weight: bold;
    margin-right: 1rem;
}
select{
    width: 35rem;
    height: 2rem;
    font-size: 1rem;
    border: none;
    padding: 0.25rem 0.5rem;
    outline: none;
}

.contenedorTabla{
    width: 100%;
    height: 100%;
    overflow: auto;
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
  padding: 0rem 1rem 0rem 1rem;
  text-align: start;
}
.col20{
    width: 20%;
    text-align: center;
}
.col80{
    width: 80%;
    text-align: start;
}
</style>