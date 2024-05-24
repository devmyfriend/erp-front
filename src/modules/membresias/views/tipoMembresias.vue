<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref, watch, computed } from 'vue';
import { useMembresias } from '../store/membresias';
import buscador from '../components/buscadorTIpoMembresias.vue';
import ventanas from '../components/ventanas.vue'
import Swal from 'sweetalert2';

const route = useRoute();

const store = useMembresias();
const modoFrm = ref(0);

const ListadoTiposMembresias = ref([]);
const ListadoPeriodoMembresias = ref([]);
const nuevoRegistro = ref({})

const moduloActivo = ref( route.params.tipo ? parseInt(route.params.tipo) : 2);

onMounted(() => {
    cargarDatos();
})

const cargarDatos = () => {
    store.cargarTiposMembresias().then((res) => {
        if(res){
            ListadoTiposMembresias.value = store.getTiposMembresias;
        }
    });

    store.cargarPeriodoMembresias().then((res) => {
        if(res){
            ListadoPeriodoMembresias.value = store.getPeriodosMembresias;
        }
    });
}
const crearRegistro = () => {
    nuevoRegistro.value.CreadoPor = 2;
    store.crearTipoMembresia(nuevoRegistro.value).then((res) => {
        if(res){
            cargarDatos();
            modoFrm.value = 0;
        }
    });
}
const borrarRegistro = (registro) => {
    Swal.fire({
        title: 'Borrar Registro',
        text: 'Estás seguro de borrar este registro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Si, borrarlo',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if(result.isConfirmed){
            registro.BorradoPor = 2;
            store.borrarTipoMembresia(registro).then((res) => {
                if(res){
                    cargarDatos();
                }
            });
        }
    });
}
const subirDatos = (registro) => {
    Object.assign(nuevoRegistro.value, registro);
    modoFrm.value = 2;
}
const actualizarRegistro = () => {
    nuevoRegistro.value.ActualizadoPor = 2;
    store.editarTipoMembresia(nuevoRegistro.value).then((res) => {
        if(res){
            cargarDatos();
            modoFrm.value = 0;
        }
    });
}
const esperarBusqueda = (texto) => {
    if(texto != undefined){
        ListadoTiposMembresias.value = store.getTiposMembresias;
        if(ListadoTiposMembresias.value.length <= 0){
            cargarDatos();
            Swal.fire({
                title: 'No se encontraron resultados con ese texto',
                icon: 'info',
                confirmButtonText: 'Aceptar'
            });
        }
    }else{
        cargarDatos();
    }
}
const limpiarFrm = () => {
    nuevoRegistro.value = {};
}

const getNombrePeriodo = (TipoPeriodoId) => {
  const periodo = ListadoPeriodoMembresias.value.find(periodo => periodo.TipoPeriodoId === TipoPeriodoId);
  return periodo ? periodo.NombrePeriodo : '';
}

watch(modoFrm, (newValue) => {
    if(newValue == 0){
        limpiarFrm();
    }
})
</script>

<template>
    <h2> Tipos de Membresias </h2>
    <div class="contenedorListado">
        <ventanas :moduloActivo="moduloActivo" />   
        <div class="contenedorHijo">
            <div class="lineaFormulario">
                <transition name="general" mode="out-in" appear>
                    <div class="componenteBuscador" v-if="modoFrm == 0">
                        <buscador @eBusqueda="esperarBusqueda" />
                    </div>
                    <div class="formulario" v-else>
                        <input type="text" placeholder="ID Tipo" class="inpId" disabled v-if="modoFrm == 2" v-model="nuevoRegistro.TipoMembresiaId">
                        <input type="text" placeholder="Nombre Tipo" class="inpNombre" v-model="nuevoRegistro.NombreTipoMembresia">
                        <select class="selectNombre" v-model="nuevoRegistro.TipoPeriodoId">
                            <option v-for="Periodo in ListadoPeriodoMembresias" :value="Periodo.TipoPeriodoId"> {{ Periodo.NombrePeriodo }} </option>
                        </select>
                        <div class="divCheckbox">
                            <span class="spanCita" for="Cita"> Cita: </span>
                            <input type="checkbox" name="Cita" id="Cita" v-model="nuevoRegistro.Cita" :checked="nuevoRegistro.Cita">
                        </div>
                        <input class="inpNombre" min="0" type="number" placeholder="Mínimo Asociados" v-model="nuevoRegistro.MinimoAsociados">
                        <button class="btAgregar btNuevo" @click="modoFrm == 1 ? crearRegistro() : actualizarRegistro()"> {{ modoFrm == 1 ? 'Guardar' : 'Actualizar' }} </button>
                    </div>
                </transition>
                <transition name="general" appear>
                    <button class="btAgregar" :class="{btNuevo: modoFrm == 0, 'ms-3': modoFrm == 0}" @click=" modoFrm != 0 ? modoFrm = 0 : modoFrm = 1"> {{ modoFrm != 0 ? 'Cancelar' : 'Agregar' }} </button>
                </transition>

            </div>
            <transition name="tabla" appear>
                <div class="tablaContainer">
                    <table>
                        <thead>
                            <tr>
                                <th class="col-xxs">ID</th>
                                <th class="col-auto col-start">Nombre</th>
                                <th class="col-s col-start">Tipo Periodo</th>
                                <th class="col-xxs">Cita</th>
                                <th class="col-xs">Min. Asociado</th>
                                <th class="col-xs">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
    
                            <tr v-for="registroTabla in ListadoTiposMembresias">
                                <td class="col-xxs"> {{  registroTabla.TipoMembresiaId }}</td>
                                <td class="col-auto col-start"> {{  registroTabla.NombreTipoMembresia }}</td>
                                <td class="col-s col-start">{{ getNombrePeriodo(registroTabla.TipoPeriodoId) ? getNombrePeriodo(registroTabla.TipoPeriodoId) : '' }}</td>
                                <td class="col-xxs"> {{  registroTabla.Cita ? 'Si' : 'No' }}</td>
                                <td class="col-xs"> {{  registroTabla.MinimoAsociados }}</td>
                                <td class="Acciones col-xs">
                                    <img class="IcoFrm" src="@/assets/img/edit.svg" alt="Icono tabla editar" @click="subirDatos(registroTabla)">
                                    <img class="IcoFrm" src="@/assets/img/trash.svg" alt="Icono tabla borrar" @click="borrarRegistro(registroTabla)">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </transition>
        </div>

    </div>
</template>

<style scoped>
.general-enter-active {
    animation: fadeIn 0.75s;
}
.general-leave-active {
    animation: fadeOut 0.75s;
}
.tabla-enter-active {
    animation: fadeIn 1s;
}
.tabla-leave-active {
    animation: fadeOut 1s;
}
.buscador-enter-active {
    animation: slideInLeft 0.75s;
}
.buscador-leave-active {
    animation: slideOutLeft 0.25s;
}
.formulario-enter-active {
    animation: slideInRight 0.75s;
}
.formulario-leave-active {
    animation: slideOutRight 0.25s;
}
@import url('../../../styles/tablaListado.css');
@import url('../../../styles/checkbox.css');

.contenedorListado{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 10.5rem); 
    min-height: calc(100vh - 10.5rem);
    max-height: calc(100vh - 10.5rem);
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    background-color: #fff;
    color: #000;
    font-size: 1.5rem;
    text-align: center;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none;
    border-radius: 1rem;
}
.contenedorHijo{
    padding: 1rem;
    width: 100%;
    max-height: calc(100% - 2rem);
    flex-grow:1;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
}
h2{
    height: 2rem;
    margin-bottom: 1.5rem;
    color: #fff;
    text-transform: uppercase;
    text-align: start;
    font-weight: bold;
}
h1{
    height: 100%;
    border: 1px solid red;
    margin: 1rem;
    overflow-y: scroll;
    scrollbar-width: none;
}
.componenteBuscador{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 25rem;
}
.lineaFormulario{
    display: flex;
    flex-direction: row;
    max-height: 2.1875rem;
    width: 110.9375rem;
    max-width: 110.9375rem;
    margin-bottom: 1.5rem;
    justify-content: space-between;
}
.lineaFormulario:first-child{
    margin-bottom: 1.5rem;
}
.formulario{
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    gap: 1rem;
    transition: opacity 0.75s ease;
}
.btAgregar{
    height: 2.1875rem;
    width: 10rem;
    background-color: #353535;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    margin-left: 1rem;
    letter-spacing: 0.25rem;
}
.btNuevo{
    margin-left: auto;
}
.lineaCompleta{
    margin-left: 0rem;
    height: 2.1875rem;
}
.lineaSola{
    margin-bottom: 0rem;
}
input:not([type="checkbox"]), select{
    height: 2.1875rem;
    color: #000;
    border: 1px solid #999;
    border-radius: 0.3125rem;
    font-size: 1rem;
    background-color: #fff;
    padding-left: 1rem;
    padding-right: 1rem;
    outline: none;
}
input:disabled{
    background-color: #d9d9d9;
    color: #000;
    border: none;
}
.inpNombre{
    width: 20rem;
}
.inpDescripcion{
    width: 25rem;
    flex-grow: 1;
}
.inpId{
    width: 10rem;
}
.selectNombre{
    width: 20rem;
    max-width: 20rem;
    min-width: 20rem;
}
.selectId{
    width: 15rem;
    max-width: 15rem;
}
.tablaContainer{
    margin-top: 0rem;
}
.divCheckbox{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
}
.btNuevo{
    margin-left: auto;
}
.spanCita{
    font-size: 1.25rem;
}

th{
    height: 2.75rem;
}
</style>
  