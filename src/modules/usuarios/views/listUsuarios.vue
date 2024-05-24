<script setup>
import { onMounted, ref } from 'vue';
import {Modal} from 'bootstrap';
import Swal from 'sweetalert2';

import ventanasUsuarios from '../components/ventanas.vue';
import buscadorUsuarios from '../components/buscadorUsuarios.vue';

import { useUsuarios } from '../store/usuarios';

const store = useUsuarios();

const ListadoUsuarios = ref([]);
const modoFrm = ref(0);
const valorVentana = 1;

const ModalNuevoRegistro = ref(null);
let mNuevoRegistro = null;

const nuevoRegistro = ref({
    UsuarioId: 0,
    TipoUsuario: '',
    ApellidoPaterno: '',
    ApellidoMaterno: '',
    Nombres: ''
});

onMounted(() => {
    cargarDatos();
    mNuevoRegistro = new Modal(ModalNuevoRegistro.value);
});

function cargarDatos(){
  store.cargarUsuarios().then((res) => {
if (res) {
        ListadoUsuarios.value = store.getUsuarios;
    }
  });
}

function crearUsuario(){
    Swal.fire({
        title: 'Creando impuesto propio',
    })
}

function subirDatos(usuario){
    nuevoRegistro.value.UsuarioId = usuario.UsuarioId;
    nuevoRegistro.value.TipoUsuario = usuario.TipoUsuario;
    nuevoRegistro.value.ApellidoPaterno = usuario.ApellidoPaterno;
    nuevoRegistro.value.ApellidoMaterno = usuario.ApellidoMaterno;
    nuevoRegistro.value.Nombres = usuario.Nombres;
    modoFrm.value = 1;
    mNuevoRegistro.show();
}

function actualizarUsuario(){
    nuevoRegistro.value.ActualizadoPor = 2;
/*     store.actualizarImpuestoPropio(nuevoRegistro.value).then(() => {
        store.cargarImpuestosPropios().then(() => {
            ListadoImpuestosPropios.value = store.getListadoImpuestosPropios;
            limpiarFrm();
        });
    }); */
    Swal.fire({
        title: 'Actualizando impuesto propio',
    })
}

function borrarUsuario(usuario){
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

function limpiarFrm(){
    mNuevoRegistro.hide();
    nuevoRegistro.value = {
        UsuarioId: 0,
        TipoUsuario: '',
        ApellidoPaterno: '',
        ApellidoMaterno: '',
        Nombres: ''
    }
    modoFrm.value = 0;
}

function esperarBusqueda(txt){
    if (txt) {
        ListadoUsuarios.value = store.getUsuarios;
    }else{
        cargarDatos();
    }
}
</script>

<template>
    <header>
        <h1> Listado de Usuarios </h1>
    </header>
    <div class="contenedorPadre">
      <ventanasUsuarios :valorVentana="valorVentana"/>
      <div class="contenedorHijo">
        <div class="linea">
            <buscadorUsuarios @eBusqueda="esperarBusqueda"/>
            <button class="btAgregar btNuevo" @click="mNuevoRegistro.show()"> Nuevo </button>
          </div>  
          <div class="tablaContainer animate__animated animate__fadeIn animate__fast">
              <table>
                  <thead>
                      <tr>
                          <th class="col-s">Usuario ID</th>
                          <th class="col-m col-start">Tipo de usuario</th>
                          <th class="col-auto col-start">Nombre completo</th>
                          <th class="col-xs Acciones">Acciones</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(usuario, index) in ListadoUsuarios" :key="index" :class="{td1: index % 2 == 0, td2: index % 2 != 0}">
                          <td>{{ usuario.UsuarioId }}</td>
                          <td class="col-start">{{ usuario.TipoUsuario }}</td>
                          <td class="col-start"> {{ usuario.ApellidoPaterno }} {{ usuario.ApellidoMaterno }} {{ usuario.Nombres }} </td>
                          <td class="col-xs">
                            <img src="@/assets/img/edit.svg" class="btTabla" alt="Editar" @click="subirDatos(usuario)">
                            <img src="@/assets/img/trash.svg" class="btTabla" alt="Eliminar" @click="borrarUsuario(usuario.UsuarioId)">
                        </td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
    </div>

    <div class="modal fade" id="mNuevoRegistro" tabindex="-1" ref="ModalNuevoRegistro">
        <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
            <h3 class="modal-title fs-5" id="mNuevoRegistro">{{ modoFrm == 0 ? 'Agregar nuevo Usuario' : 'Actualizar usuario' }}</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="limpiar"></button>
            </div>
            <div class="modal-body">
                <div class="subfrm" v-if="modoFrm == 0">
                    <div>
                        <label for="UsuarioId"> Usuario Id </label>
                        <input type="text" name="UsuarioId" class="inpClave" placeholder="Usuario Id" v-model="nuevoRegistro.UsuarioId" :disabled="true">
                    </div>

                    <div>
                        <label for="tipoUsuario"> Tipo de usuario </label>
                        <select name="tipoUsuario" id="tipoUsuario" class="selectTipoUsuario">
                            <option value="1"> Administrador </option>
                            <option value="2"> Usuario </option>
                            <option value="3"> Gerente </option>
                            <option value="4"> Contador </option>
                        </select>
                    </div>
                </div>

                <div v-else>
                    <div>
                        <label for="tipoUsuario"> Tipo de usuario </label>
                        <select name="tipoUsuario" id="tipoUsuario" class="selectTipoUsuario">
                            <option value="1"> Administrador </option>
                            <option value="2"> Usuario </option>
                            <option value="3"> Gerente </option>
                            <option value="4"> Contador </option>
                        </select>
                    </div>
                </div>

                <label for="apPaterno">Apellido Paterno</label>
                <input class="inpNombre" name="apPaterno" type="text" placeholder="Apellido Paterno" v-model="nuevoRegistro.ApellidoPaterno">
                <label for="apMaterno">Apellido Materno</label>
                <input class="inpNombre" name="apMaterno" type="text" placeholder="Apellido Materno" v-model="nuevoRegistro.ApellidoMaterno">
                <label for="Nombres">Nombres</label>
                <input class="inpNombre" name="Nombres" type="text" placeholder="Nombres" v-model="nuevoRegistro.Nombres">
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="modoFrm == 0 ? crearUsuario() : actualizarUsuario()"> {{ modoFrm == 0 ? 'Agregar ' : 'Actualizar'}} </button>  
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="limpiar">Cerrar</button>
            </div>
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
        justify-content:space-between;
        align-items: center;
        flex-wrap: nowrap;
    }
    .inpClave, .inpNombre, .inpApellido{
        height: 2.1875rem;
        color: #000;
        border: 1px solid #D9D9D9;
        border-radius: 0.3125rem;
        padding-left: 1rem;
        outline: none;
    }
    input:active, input:focus{
        outline: none;
    }
    .selectTipoUsuario{
        height: 2.1875rem;
        color: #000;
        border: 1px solid #D9D9D9;
        background-color: #fff;
        border-radius: 0.3125rem;
        padding-left: 1rem;
        width: 100%;
    }
/*     .inpNombre{
        width: 20rem;
    }
    .inpClave{
        width: 7rem;
    }
    .inpApellido{
      width: 12rem;
    } */
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
    .modal-body{
        width: 100%;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        padding: 1rem;
    }
    .modal-body *:not(label, div){
        margin-bottom: 1rem;
        width: 100%;
    }
    label{
        margin-bottom: 0.5rem;
        text-align: start;
        width: 100%;
    }
    .subfrm{
        display: grid;
        grid-template-columns: 1fr 3fr;
        gap: 0.5rem;
        margin-bottom: 0rem;
    }
    h3{
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
        letter-spacing: 0.25rem;
        text-transform: uppercase;
    }
    .modal-header{
        padding-bottom: 0.5rem;
    }
</style>