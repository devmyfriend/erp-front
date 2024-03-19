<script setup>
import { ref, watch } from 'vue'
import ventanas from '../components/ventanas.vue'
import { useRoute } from 'vue-router';
const route = useRoute();
const idProducto = ref( route.params.id || '0');
const tipoProducto = ref(route.params.tipo || '');
const btActivo = ref(3);

const registros = ref([
    {
        Nombre: 'Almacén 1',
        StockMaximo: 100,
        StockMinimo: 10,
        UltimoPrecio: 9.99
    },
    {
        Nombre: 'Almacén 2',
        StockMaximo: 200,
        StockMinimo: 20,
        UltimoPrecio: 19.99
    },
    {
        Nombre: 'Almacén 3',
        StockMaximo: 300,
        StockMinimo: 30,
        UltimoPrecio: 29.99
    }
]);

const Almacen = ref('');
const Sucursal = ref('');
const Seccion = ref('');
const Anaquel = ref('');
const Nivel = ref('');
const Lugar = ref('');
const CantidadMaxima = ref('');
const CantidadMinima = ref('');

const Existencia = ref(1826);
const Costo = ref(84);
const UltimoPrecio = ref(90);

const nSeccion = ref(false);
const nAnaquel= ref(false);
const nNivel = ref(false);
const nLugar = ref(false);

function obtenerRegistro(r){
    console.log( JSON.stringify(r) );
    Almacen.value = r.Nombre;
    CantidadMaxima.value = r.StockMaximo;
    CantidadMinima.value = r.StockMinimo;
}
watch(() => Almacen.value, (newVal, oldVal) => {
    Almacen.value = newVal;
    Sucursal.value = 'Sucursal 1';
});
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
            <h2> Productos por Almacén </h2>
            <div class="frm">
                <div class="columna1 animate__animated animate__fadeIn">
                    <h3> Formulario </h3>   
                    <div class="formulario">
                        <div class="contenidoFrm">
                            <div class="fila">
                            <label for="Almacen"> Almacén: </label>
                            <select id="Almacen" v-model="Almacen">
                                <option value="Almacen1"> Almacén 1 </option>
                            </select>
                        </div>
                        <div class="fila">
                            <label for="Sucursal"> Sucursal: </label>
                            <input type="text" disabled v-model="Sucursal" id="Sucursal">
                        </div>
                        <div class="fila">
                            <label for="Seccion"> Sección: </label>
                            <select v-if="!nSeccion" id="Seccion" v-model="Seccion">
                                <option value="Seccion1"> Seccion 1 </option>
                            </select>
                            <input type="text" v-model="Seccion" placeholder="Nueva Sección" v-if="nSeccion">
                            <img class="Ico" src="@/assets/img/add.svg" @click="nSeccion = !nSeccion">
                        </div>
                        <div class="fila">
                            <label for="Anaquel"> Anaquel: </label>
                            <select v-if="!nAnaquel" name="Anaquel" id="Anaquel" v-model="Anaquel">
                                <option value="Anaquel1"> Anaquel 1 </option>
                            </select>
                            <input type="text" v-model="Anaquel" placeholder="Nuevo Anaquel" v-if="nAnaquel">
                            <img class="Ico" src="@/assets/img/add.svg" @click="nAnaquel = !nAnaquel">
                        </div>
                        <div class="fila">
                            <label for="Nivel"> Nivel: </label>
                            <select v-if="!nNivel" name="Nivel" id="Nivel" v-model="Nivel">
                                <option value="Nivel1"> Nivel 1 </option>
                            </select>
                            <input type="text" v-model="Nivel" placeholder="Nuevo Nivel" v-if="nNivel">
                            <img class="Ico" src="@/assets/img/add.svg" @click="nNivel = !nNivel">
                        </div>
                        <div class="fila">
                            <label for="Lugar"> Lugar: </label>
                            <select v-if="!nLugar" name="Lugar" id="Lugar" v-model="Lugar">
                                <option value="Lugar1"> Lugar 1 </option>
                            </select>
                            <input type="text" v-model="Lugar" placeholder="Nuevo Lugar" v-if="nLugar">
                            <img class="Ico" src="@/assets/img/add.svg" @click="nLugar = !nLugar">
                        </div>
                        <div class="fila">
                            <label for="CantidadMinima"> Cantidad Mínima: </label>
                            <input type="number" min="0" placeholder="Cantidad Mínima" id="CantidadMinima" v-model="CantidadMinima">
                        </div>
                        <div class="fila">
                            <label for="CantidadMaxima"> Cantidad Máxima: </label>
                            <input type="number" min="0" placeholder="Cantidad Máxima" id="CantidadMaxima" v-model="CantidadMaxima">
                        </div>
                        </div>
                        <button class="btGuardarTodo" @click="GuardarTodo">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M30.9958 6.99579L25.0042 1.00421C24.3612 0.361231 23.4892 4.75483e-06 22.5799 0H3.42857C1.535 0 0 1.535 0 3.42857V28.5714C0 30.465 1.535 32 3.42857 32H28.5714C30.465 32 32 30.465 32 28.5714V9.42014C32 8.51083 31.6388 7.63876 30.9958 6.99579ZM16 27.4286C13.4753 27.4286 11.4286 25.3819 11.4286 22.8571C11.4286 20.3324 13.4753 18.2857 16 18.2857C18.5247 18.2857 20.5714 20.3324 20.5714 22.8571C20.5714 25.3819 18.5247 27.4286 16 27.4286ZM22.8571 5.67714V12.8571C22.8571 13.3305 22.4734 13.7143 22 13.7143H5.42857C4.95521 13.7143 4.57143 13.3305 4.57143 12.8571V5.42857C4.57143 4.95521 4.95521 4.57143 5.42857 4.57143H21.7514C21.9788 4.57143 22.1968 4.66171 22.3575 4.8225L22.6061 5.07107C22.6857 5.15065 22.7488 5.24514 22.7919 5.34913C22.835 5.45312 22.8572 5.56458 22.8571 5.67714Z" fill="#fff"/>
                            </svg>
                            <span> Guardar Productos </span>
                        </button>
                    </div>
                </div>
                <div class="columna2 animate__animated animate__fadeIn">
                     <div class="Datos">
                         <span class="datosAlmacenTitulo"> Existencia: </span>
                         <span class="datosAlmacenValor"> {{Existencia}}  </span>
                         <span class="datosAlmacenTitulo"> Costo: </span>
                         <span class="datosAlmacenValor"> ${{Costo}} </span>
                         <span class="datosAlmacenTitulo">  Último Precio de Compra: </span>
                         <span class="datosAlmacenValor">  ${{UltimoPrecio}} </span>
                     </div>
                     <div class="tablaContainer">
                        <table>
                            <thead>
                                <tr>
                                    <th> Nombre del almacén </th>
                                    <th> Stock Mínimo </th>
                                    <th> Stock Máximo </th>
                                    <th> Último precio compra </th>
                                    <th> Acciones </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="registro in registros">
                                    <td class="colNombre"> {{     registro.Nombre       }} </td>
                                    <td class="td2"> {{     registro.StockMinimo  }} </td>
                                    <td class="td2"> {{     registro.StockMaximo  }} </td>
                                    <td class="td3"> {{     registro.UltimoPrecio }} </td>
                                    <td class="td3"> <img class="btTabla" @click="obtenerRegistro(registro)" src="@/assets/img/details.svg" alt="Detalles"> </td>
                                </tr>
                            </tbody>
                        </table>
                     </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.contenedor {
    background-color: #fff;
    width: 100%;
    height: 51rem;
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
    width: 100%;
    padding: 1rem;
}
.frm{
    display: grid;
    width: 100%;
    grid-template-columns: 33% 62%;
    gap: 5%;
    justify-content: space-between;
    padding: 0rem 5rem;
}
.formulario{
    width: 100%;
    height: 40rem;
    display: flex;
    flex-direction: column;
}
h2{
    text-align: start;
    color: #000;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
}
.columna1{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #D9D9D9;
    height: 40rem;
    max-height: 40rem;
    border: 1px solid #000;
    border-radius: 0.5rem;
}
.columna2{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    height: 40rem;
    max-height: 40rem;
}
h3{
    margin-bottom: 1.5rem;
    margin-top: 1rem;
    font-weight: bold;
}
.Datos{
    width: 100%;
    height: 2rem;
    margin-bottom: 1rem;
}
.datosAlmacenTitulo{
    font-size: 1.25rem;
    font-weight: bold;
    margin-left: 1.5rem;
}
.datosAlmacenValor{
    font-size: 1.25rem;
    font-weight: lighter;
    margin-left: 0.25rem;
}
.fila{
    display: flex;
    align-items: center;
    height: 2.1875;
    max-height: 2.1875;
    min-height: 2.1875;
    margin-bottom: 1rem;
}
.fila label{
    width: 7.5rem;
    font-size: 1rem;
    font-weight: bold;
    text-align: start;
}
.fila input, .fila select{
    width: 20.5rem;
    height: 2rem;
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
    font-weight: lighter;
    border: 1px solid #000;
    border-radius: 0.25rem;
}
.fila img{
    margin-left: 0.5rem;
    width: 1.5rem;
}
.btGuardarTodo{
    width: 80%;
    height: 2.5rem;
    margin-top: 2rem;
    background-color: #353535;
    color: #fff;
    font-size: 1.25rem;
    font-weight: bold;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
}
.btGuardarTodo svg{
    margin-right: 0.5rem;
    height: 1.5rem;
}
.btGuardarTodo span{
    font-size: 1.25rem;
    font-weight: bold;
}
.btTabla{
    width: 1.5rem;
    cursor: pointer;
}
.Ico{
    width: 1.5rem;
    cursor: pointer;
}

.tablaContainer{
    width: 100%;
    height: 100%;
    overflow: auto;
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
  padding: 0.25rem;
}
td{
  background-color: #fff;
  color: #999999;
  height: 2rem;
  padding: 0rem 0.5rem 0rem 0.5rem;
}
.td2{
    width: 7.5%;
}
.td3{
    width: 15%;
}
.colNombre{
    width: 60%;
    text-align: start;
}
input:disabled{
    background-color: #999;
    color: #fff;
}
.contenidoFrm{
    padding: 0rem 1rem;
}
</style>