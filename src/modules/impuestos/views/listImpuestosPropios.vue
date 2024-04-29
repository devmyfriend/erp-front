<script setup>
import { ref, onMounted, computed } from 'vue'
import { useImpuestos } from '../store/impuestos.js'
import buscadorImpuestoPropio from  '../components/buscadorImpuestoPropio.vue';
import Swal from 'sweetalert2'
const store = useImpuestos();

const ListadoImpuestosSAT = ref([]);
const ListadoImpuestosPropios = ref([]);

const nuevoRegistro = ref({
    NombreImpuesto: '', 
    ClaveImpuesto: '', 
    CreadoPor: 2
})

const showFrm = ref(false);
const modoFrm = ref(0);

onMounted(() => {
    cargarDatos();
})

function cargarDatos(){
    store.cargarImpuestosSATCompletos().then(() => {
        ListadoImpuestosSAT.value = store.getListadoImpuestosSAT;
    });

    store.cargarImpuestosPropios().then(() => {
        ListadoImpuestosPropios.value = store.getListadoImpuestosPropios;
    });
}

function crearImpuestoPropio(){
    nuevoRegistro.value.CreadoPor = 2;
    store.crearImpuestoPropio(nuevoRegistro.value).then(() => {
        cargarDatos();
        limpiarFrm();
    });
}

function subirDatos(impuesto){
    nuevoRegistro.value.cfgImpuestoId = impuesto.cfgImpuestoId;
    nuevoRegistro.value.NombreImpuesto = impuesto.NombreImpuesto;
    nuevoRegistro.value.ClaveImpuesto = impuesto.ClaveImpuesto;
    showFrm.value = true;
    modoFrm.value = 1;
}

function actualizarImpuestoPropio(){
    nuevoRegistro.value.ActualizadoPor = 2;
    store.actualizarImpuestoPropio(nuevoRegistro.value).then(() => {
        store.cargarImpuestosPropios().then(() => {
            ListadoImpuestosPropios.value = store.getListadoImpuestosPropios;
            limpiarFrm();
        });
    });
}

function borrarImpuestoPropio(impuesto){
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
            const request = {
                cfgImpuestoId: parseInt(impuesto),
                ActualizadoPor: 2
            }
            store.borrarImpuestoPropio(request).then(() => {
                cargarDatos();
            });
        }
    });
}

function limpiarFrm(){
    showFrm.value = !showFrm;
    nuevoRegistro.value = {
        NombreImpuesto: '', 
        ClaveImpuesto: '', 
        CreadoPor: 2
    }
    modoFrm.value = 0;
}

function esperarBusqueda(txt){
    if (txt) {
        ListadoImpuestosPropios.value = store.getListadoImpuestosPropios;
    }else{
        cargarDatos();
    }
}
</script>

<template>
    <header>
        <h1> Impuestos</h1>
    </header>
    <div class="contenedorPadre">
        <h2> Listado de impuestos propios </h2>
        <div class="linea">
            <div class="buscador">
                <buscadorImpuestoPropio @eBusqueda="esperarBusqueda" />
            </div>
            <transition-group name="general">
                <div class="formulario" v-if="showFrm">
                    <input type="text" placeholder="Clave impuesto" class="inpClave" v-model="nuevoRegistro.cfgImpuestoId" v-show="modoFrm == 1" disabled>
                    <input type="text" placeholder="Descripción del impuesto" class="inpNombre" v-model="nuevoRegistro.NombreImpuesto">
                    <select name="L/F" class="selectNombre" v-model="nuevoRegistro.ClaveImpuesto">
                        <option v-for="Clave in ListadoImpuestosSAT" :value="Clave.ClaveImpuesto"> {{Clave.Nombre}} </option>
                    </select>
                    <button class="btAgregar" alt="AñadirImpuesto" @click="modoFrm == 0 ? crearImpuestoPropio() : actualizarImpuestoPropio() "> {{ modoFrm == 0 ? 'Agregar' : 'Actualizar'}} </button>
                </div>
            </transition-group>
            <button class="btAgregar" alt="NuevoImpuesto" @click=" showFrm ? limpiarFrm() : (showFrm = true)"> {{ showFrm ? 'Cancelar' : "Nuevo"}} </button>
        </div>
            
            <div class="tablaContainer animate__animated animate__fadeIn animate__fast">
            <table>
                <thead>
                    <tr>
                        <th class="col-s">Clave Impuesto Propio</th>
                        <th class="col-auto col-start">Descripción</th>
                        <th class="col-s col-start">Impuesto SAT</th>
                        <th class="col-xs">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(impuesto, index) in ListadoImpuestosPropios" :key="impuesto.IdImpuesto" :class="{td1: index % 2 == 0, td2: index % 2 != 0}">
                        <td class="col-s">{{ impuesto.cfgImpuestoId }}</td>
                        <td class="col-auto col-start">{{ impuesto.NombreImpuesto }}</td>
                        <td class="col-s col-start">{{ impuesto.NombreSAT }}</td>
                        <td class="col-xs">
                            <img src="@/assets/img/edit.svg" class="btTabla" alt="Editar" @click="subirDatos(impuesto)">
                            <img src="@/assets/img/trash.svg" class="btTabla" alt="Eliminar" @click="borrarImpuestoPropio(impuesto.cfgImpuestoId)">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>

    @import url('../../../styles/checkbox.css');
    @import url('../../../styles/tablaListado.css');

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
        min-height: calc(100vh - 11rem);
        max-height: calc(100vh - 11rem);
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
    th{
        padding: 0.25rem;
        height: 2.75rem;
    }
    .linea{  
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
    }
    .linea *:not(:last-child) {
        margin-right: 1rem;
    }
    .buscador{
        display: flex;
        flex-grow: 1;
        align-items: flex-start;
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
    .inpClave, .inpNombre, .selectNombre{
        height: 2.1875rem;
        color: #000;
        border: 1px solid #D9D9D9;
        border-radius: 0.3125rem;
        padding-left: 1rem;
        outline: none;
    }
    .inpNombre{
        width: 25rem;
    }
    .selectNombre{
        width: 20rem;
        overflow: hidden;
        word-break: break-all;
        white-space: nowrap;
        text-overflow: ellipsis;
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
    input:disabled{
        background-color: #d9d9d9;
        color: #000;
    }
</style>