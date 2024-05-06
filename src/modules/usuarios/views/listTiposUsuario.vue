<script setup>
import ventanasUsuarios from '../components/ventanas.vue';
import buscadorTiposUsuario from '../components/buscadorTiposUsuario.vue';
const valorVentana = 2;

import { ref, onMounted } from 'vue';
import { useUsuarios } from '../store/usuarios.js';
import Swal from 'sweetalert2';
const store = useUsuarios();

const showFrm = ref(false);
const modoFrm = ref(0);
const ListadoTiposUsuario = ref([]);
const nuevoRegistro = ref({
    TipoUsuarioId: 0,
    TipoUsuario: ''
});

onMounted(() => {
    cargarDatos();
});

function cargarDatos(){
    store.cargarTiposUsuario().then((res) => {
        if (res) {
            ListadoTiposUsuario.value = store.getTiposUsuario;
        }
    });
}

function limpiarFrm(){
    showFrm.value = !showFrm.value;
    nuevoRegistro.value = {
        TipoUsuarioId: 0,
        TipoUsuario: '',
        CreadorPor: 2,
    }
    modoFrm.value = 0;
}

function crearTiposUsuario(){
    Swal.fire({
        title: 'Creando tipo de usuario',
    })

/*     store.crearTiposUsuario(nuevoRegistro.value).then((res) => {
        if (res) {
            ListadoTiposUsuario.value = store.getTiposUsuario;
            limpiarFrm();
        }
    }); */
} 

function actualizarTiposUsuario(){
    nuevoRegistro.value.ActualizadoPor = 2;
    Swal.fire({
        title: 'Actualizando tipo de usuario',
    })
}

function borrarTiposUsuario(id){
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
/*             const request = {
                cfgImpuestoId: parseInt(impuesto),
                ActualizadoPor: 2
            }
            store.borrarUsuario(request).then(() => {
                cargarDatos();
            }); */
        }
    });
}

function esperarBusqueda(txt){
    if (txt) {
        ListadoTiposUsuario.value = store.getTiposUsuario;
    }else{
        cargarDatos();
    }
}
function subirDatos(usuario){
    nuevoRegistro.value.TipoUsuarioId = usuario.TipoUsuarioId;
    nuevoRegistro.value.TipoUsuario = usuario.TipoUsuario;
    modoFrm.value = 1;
    showFrm.value = true;
}

function handlerTooltip(id){
    console.log('Handler tooltip');
    Swal.fire({
        title: 'Permisos del tipo de usuario',
        html: `<ul style="list-style: none;">
            <li style="text-align: start">Permiso 1</li>
            <li style="text-align: start">Permiso 2</li>
            <li style="text-align: start">Permiso 3</li>
        </ul style="">`,
        showConfirmButton: false
    });
}
</script>

<template>
    <header>
        <h1> Tipos usuario</h1>
    </header>
    <div class="contenedorPadre">
        <ventanasUsuarios :valorVentana="valorVentana"/>
        <div class="contenedorHijo">
            <div class="linea">
                <buscadorTiposUsuario @eBusqueda="esperarBusqueda" />
                <transition-group name="general">
                <div class="formulario" v-if="showFrm"> 
                    <input type="text" class="inpClave" placeholder="Usuario Id" v-model="nuevoRegistro.TipoUsuarioId" :disabled="true">
                    <input type="text" class="inpNombre" placeholder="Nombres" v-model="nuevoRegistro.TipoUsuario">

                    <button class="btAgregar" @click="modoFrm == 0 ? crearTiposUsuario() : actualizarTiposUsuario() "> {{ modoFrm == 0 ? 'Agregar ' : 'Actualizar'}} </button>
                    </div>
                </transition-group>
                <button class="btAgregar btNuevo" @click=" showFrm ? limpiarFrm() : (showFrm = true)"> {{ showFrm ? 'Cancelar' : "Nuevo"}} </button>
            </div>  
            <div class="tablaContainer animate__animated animate__fadeIn animate__fast">
                <table>
                    <thead>
                        <tr>
                            <th class="col-s"> Tipo Usuario Id </th>
                            <th class="col-auto col-start"> Nombre </th>
                            <th class="col-xs Acciones"> Acciones </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(tipoUsuario, index) in ListadoTiposUsuario" 
                        :key="index" 
                        :class="{td1: index % 2 == 0, td2: index % 2 != 0}">
                            <td>{{ tipoUsuario.TipoUsuarioId }}</td>
                            <td 
                            class="col-start"
                            @click="handlerTooltip(tipoUsuario.TipoUsuarioId)"
                            v-tooltip="'Clickea para ver los permisos del tipo de usuario'"
                            >
                                {{ tipoUsuario.TipoUsuario }}
                            </td>
                            <td class="col-xs">
                                <img src="@/assets/img/edit.svg" class="btTabla" alt="Editar" @click="subirDatos(tipoUsuario)">
                                <img src="@/assets/img/trash.svg" class="btTabla" alt="Eliminar" @click="borrarTiposUsuario(tipoUsuario.TipoUsuarioId)">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
    }
    .contenedorHijo{
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
        flex-direction: row;
        justify-content: flex-start;
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
    .btNuevo{
      margin-left: auto;
    }
    .formulario{
        display: flex;
        /* flex: 1; */
        flex-shrink: 1;
        flex-grow: 1;
        justify-content: flex-end;
        align-items: center;
    }
    .inpClave, .inpNombre, .inpApellido{
        height: 2.1875rem;
        color: #000;
        border: 1px solid #D9D9D9;
        border-radius: 0.3125rem;
        padding-left: 1rem;
    }
    .selectTipoUsuario{
        height: 2.1875rem;
        color: #000;
        border: 1px solid #D9D9D9;
        background-color: #fff;
        border-radius: 0.3125rem;
        padding-left: 1rem;
        width: 10rem;
    }
    .inpNombre{
        width: 25rem;
    }
    .inpClave{
        width: 8rem;
    }
    .inpApellido{
      width: 12rem;
    }
    .inpNombre:focus, .inpClave:focus, .inpApellido:focus{
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