<script setup>
import { ref } from 'vue'
import buscadorMonedas from '../components/buscadorMonedas.vue';
import { useMonedas } from '../store/moneda.js'
import Swal from 'sweetalert2';

const store = useMonedas ();
const ListadoMonedas = ref([]);

const nuevoRegistro = ref({
    ClaveMoneda: '',
    Descripcion: '',
});

const modo = ref(0);
const showFrm = ref(false);

function cargarRegistros(){
    store.cargarMonedas().then(() => {
        ListadoMonedas.value = store.getMonedas;
    });
}
function agregarRegistro(){
    store.agregarMoneda(nuevoRegistro.value).then((res) => {
       if (res) {
        cargarRegistros();
        limpiarFormulario();
       }
    });
}
function actualizarRegistro(){
    store.editarMoneda(nuevoRegistro.value).then((res) => {
        if (res) {
            cargarRegistros();
            limpiarFormulario();
        }
    });
}
function subirDatos(registro){
    nuevoRegistro.value.ClaveMoneda = registro.ClaveMoneda;
    nuevoRegistro.value.Descripcion = registro.Descripcion;
    modo.value = 1;
    showFrm.value = true;
}
function eliminarRegistro(registro){
    store.borrarMoneda({ClaveMoneda: registro.ClaveMoneda}).then((res) => {
        if (res) {
            cargarRegistros();
        }
    });
}
function esperarBusqueda(txt){
    console.log('Valor: ' + txt);
    console.log('Resultados: ' + store.getMonedas.length);

    if (txt) {
        ListadoMonedas.value = store.getMonedas;
    }else{
        cargarRegistros();
    }
}
function AgregarNuevoRegistro(){
    showFrm.value = !showFrm.value;
    modo.value = 0;
    limpiarFormulario();
}
function limpiarFormulario(){;
    nuevoRegistro.value.ClaveMoneda = '';
    nuevoRegistro.value.Descripcion = '';
    modo.value = 0;
}

cargarRegistros();
</script>

<template>
    <header>
        <h1> Tipos de moneda</h1>
    </header>
    <div class="contenedorPadre">
        <h2> Listado de monedas</h2>
        <div class="linea">
            <div class="buscador">
                <buscadorMonedas
                    @eBusqueda="esperarBusqueda"
                />
            </div>
            <transition-group name="general">
                <div class="formulario" v-if="showFrm">
                    <input type="text" placeholder="Clave Moneda" class="inpClave" minlength="3" maxlength="3" v-model="nuevoRegistro.ClaveMoneda" :disabled="modo == 1">
                    <input type="text" placeholder="Nombre" class="inpNombre" minlength="1" v-model="nuevoRegistro.Descripcion">
                    <button class="btAgregar" @click="modo == 0 ? agregarRegistro() : actualizarRegistro()"> {{ modo == 0 ? 'Agregar' : 'Actualizar' }} </button>
                </div>
            </transition-group>
            <button class="btAgregar" @click="AgregarNuevoRegistro()"> {{ showFrm == true ? 'Cancelar' : 'Nuevo' }} </button>

        </div>

        <div class="tablaContainer animate__animated animate__fadeIn animate__fast" >
            <table>
                <thead>
                    <tr>
                        <th class="col-s"> Clave Moneda </th>
                        <th class="col-auto col-start"> Nombre </th>
                        <th class="col-xs"> Acción </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(registro, index) in ListadoMonedas" :key="index">
                        <td class="col-s"> {{ registro.ClaveMoneda }} </td>
                        <td class="col-auto col-start"> {{ registro.Descripcion }} </td>
                        <td class="col-xs">                            
                            <img src="@/assets/img/edit.svg" alt="Editar" class="btTabla" @click="subirDatos(registro)"> 
                            <img src="@/assets/img/trash.svg" alt="EliminarComprobante" class="btTabla" @click="eliminarRegistro(registro)">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.general-enter-active {
    animation: fadeIn 0.75s;
}
.general-leave-active {
    animation: fadeOut 0.25s;
}

.filaDesactivada td{
    background-color: #999;
    display: none;          /* Ocultar fila desactivada */
}
.contenedorPadre {
    background-color: #fff;
    width: 100%;
    height: 51rem;
    overflow: hidden;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
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
.btTabla{
    cursor: pointer;
}
.linea{  
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}
.linea *:not(:last-child) {
    margin-right: 1rem;
}

.buscador{
    flex: 0 0 auto;
}
.btAgregar{
    background-color: #353535;
    border: none;
    color: #fff;
    border-radius: 0.5rem;
    height: 2.1875rem;
    width: 10rem;
    font-weight: bold;
    letter-spacing: 0.25rem;
}
.formulario{
    display: flex;
    flex: 1;
    justify-content: flex-start;
    align-items: center;
}
.formulario *:not(:first-child){
    margin-left: 1rem;
}
.inpClave, .inpNombre{
    height: 2.1875rem;
    color: #000;
    border: 1px solid #D9D9D9;
    border-radius: 0.3125rem;
    padding-left: 1rem;
}
.inpNombre{
    width: 35rem;
}
.inpClave{
    width: 10rem;
}
.inpNombre:focus, .inpClave:focus{
    outline: none;
}
.labelNombre{
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 0.125rem;
}
.tablaContainer{
    display: flex;
    height: 31rem;
    min-width: 31rem;
    margin-top: 1.5rem;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
}
.tablaContainer::-webkit-scrollbar {
    display: none;
}
table{
    width: 100%;
    border-collapse: collapse;
    border: none;
    height: max-content;
    max-height: 30.375rem;
}
th{
    background-color: #353535;
    color: #fff;
    font-weight: bold;
    font-size: 1rem;
    height: 3rem;
    max-height: 3rem;
}
td{
    background-color: #d9d9d9;
    color: #000;
    font-size: 1rem;
    height: 2.5rem;
    max-height: 2.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}
.col-xs{
    width: 10rem;
    max-width: 10rem;
}
.col-s{
    width: 15rem;
    max-width: 15rem;
}
.col-auto{
    width: auto;
}
.col-start{
    text-align: start;
    word-break: break-all;
    padding-left: 1rem;
}
td:not(:last-child){
    border-right: 0.125rem solid #fff;
}
thead tr, tbody tr:not(:last-child){
    border-bottom: 0.25rem solid #fff;
}
th:first-child, td:first-child{
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
}
th:last-child, td:last-child{
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
}
.botonesPaginado{
    display: flex;
    justify-content: center;
    gap: 1rem;
}
.botonesPaginado button{
    background-color: #353535;
    font-size: 1.25rem;
    font-weight: bold;
    color: #fff;
    width: 4rem;
    height: 2rem;
    line-height: 1rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color .5s;
}
.botonesPaginado button:hover{
    background-color: #000;
}
.contadorPaginado{
    font-size: 1rem;
    font-weight: bold;
    color: #000;
    margin-top: .5rem;
    align-self: center;
    text-align: start;
    width: 19rem;
}
input:disabled{
    background-color: #d9d9d9;
    color: #000;
}
</style>