<script setup>
import { ref, watch } from 'vue'
import { useComprobantes } from '../store/comprobantes.js'
import Swal from 'sweetalert2';

const store = useComprobantes();
const ListadoComprobantes = ref([]);
const showFrm = ref(false);
const modo = ref(0);    

const nuevoRegistro = ref({
    ClaveTipoDeComprobante: '',
    Descripcion: ''
});

function cargarDatos(){
    store.cargarComprobantes().then(() => {
        ListadoComprobantes.value = store.getComprobantes;
        limpiarFormulario();
    });
}

function agregarRegistro(){
    store.crearComprobante({ ...nuevoRegistro.value }).then((res) => {
        if(res){
            cargarDatos();
        }
    })
}
function actualizarRegistro(){
    store.editarComprobante(nuevoRegistro.value).then((res) => {
        if(res){
            cargarDatos();
            modo.value = 0;
            showFrm.value = false;
            limpiarFormulario();
        }
    })
}
function subirDatos(registro){
    modo.value = 1;
    showFrm.value = true;
    nuevoRegistro.value.ClaveTipoDeComprobante = registro.ClaveTipoDeComprobante;
    nuevoRegistro.value.Descripcion = registro.Descripcion;
}
function borrarRegistro(registro){
    store.borrarComprobante(registro.ClaveTipoDeComprobante).then((res) => {
        if(res){
            cargarDatos();
        }
    })
}
function limpiarFormulario(){
    nuevoRegistro.value.ClaveTipoDeComprobante = '';
    nuevoRegistro.value.Descripcion = '';
}
cargarDatos();
</script>

<template>
    <header>
        <h1> Tipos de comprobantes</h1>
    </header>
    <div class="contenedorPadre">
        <h2> Listado de tipos de comprobantes</h2>
        <div class="linea">
            <!-- <div class="buscador">
                <buscadorCP/>
            </div> -->
            <div class="formulario" v-if="showFrm">
                <input type="text" class="inpClave" placeholder="Clave" v-model="nuevoRegistro.ClaveTipoDeComprobante" minlength="1" maxlength="1" :disabled="modo==1">
                <input type="text" class="inpNombre" placeholder="Nombre de Comprobante" v-model="nuevoRegistro.Descripcion" minlength="1">
                <button class="btAgregar" @click="modo == 0 ? agregarRegistro() : actualizarRegistro()"> {{ modo == 0 ? 'Agregar' : 'Editar' }} </button>
            </div>
            <button class="btAgregar" @click="(showFrm = !showFrm, ( showFrm ? limpiarFormulario() : '')) "> {{ showFrm == true ? 'Cancelar' : 'Nuevo' }} </button>
        </div>

        <div class="tablaContainer animate__animated animate__fadeIn animate__fast" >
            <table>
                <thead>
                    <tr>
                        <th class="col-s col-start"> Clave </th>
                        <th class="col-auto col-start"> Nombre </th>
                        <th class="col-xs"> Acciones </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(registro, index) in ListadoComprobantes" :key="index">
                        <td class="col-s"> {{ registro.ClaveTipoDeComprobante }} </td>
                        <td class="col-auto col-start"> {{ registro.Descripcion }} </td>
                        <td class="col-xs"> 
                            <img src="@/assets/img/edit.svg" alt="Editar" class="btTabla" @click="subirDatos(registro)">
                            <img src="@/assets/img/trash.svg" alt="Borrar" class="btTabla" @click="borrarRegistro(registro)">
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
    display: none;
}
.contenedorPadre {
    background-color: #fff;
    width: 100%;
    min-height: calc(100vh - 11rem);
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
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
}
.buscador{
    width: 30%;
}
.btAgregar{
    background-color: #353535;
    border: none;
    color: #fff;
    border-radius: 0.5rem;
    height: 2.1875rem;
    /* width: 10rem; */
    width: 9%;
    font-weight: bold;
    letter-spacing: 0.25rem;
}
.formulario{
    display: flex;
    justify-content: flex-start;
    width: 81%;
    margin-right: 10%;
    align-items: center;
}
.formulario h3{
    margin: 0rem;
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
.labelNombre{
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 0.125rem;
}
input:focus{
    outline: none;
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