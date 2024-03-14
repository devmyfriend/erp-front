<script setup>
import { ref } from 'vue'
import ventanas from '../components/ventanas.vue'
import { useRoute } from 'vue-router';
const route = useRoute();
const tipoProducto = ref(route.params.tipo || '');
const idProducto = ref( parseInt(route.params.id) || 0);
const btActivo = ref(6);

const listadoAlmacenes = ref([
    {id: 1, nombre: 'Almacen 1', cantidad: 1231},
    {id: 2, nombre: 'Almacen 2', cantidad: 7234},
    {id: 3, nombre: 'Almacen 3', cantidad: 4267}
]);
const Almacen = ref(-1);

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
<!--             <div class="frm">
                <label for="Almacen"> Almacén: </label>
                <select name="Almacen" id="Almacen" v-model="Almacen">
                    <option value="-1" v-if="Almacen == -1"> Selecciona un almacén </option>
                    <option v-for="almacen in listadoAlmacenes" :value="almacen.id">{{ almacen.nombre }}</option>
                </select>
            </div> -->
            
            <div class="contenedorTabla">
                <table>
                    <thead>
                        <tr>
                            <th> Almacén </th>
                            <th> Cantidad </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="registro in listadoAlmacenes" :key="registro.id">
                            <td class="col80"> {{registro.nombre}}   </td>
                            <td class="col20"> {{registro.cantidad}} </td>
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