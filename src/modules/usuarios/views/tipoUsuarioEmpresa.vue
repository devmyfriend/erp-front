<script setup>
import ventanasUsuarios from '../components/ventanas.vue';
import buscadorUsuarios from '../components/buscadorUsuarios.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUsuarios } from '../store/usuarios';
const store = useUsuarios();
const route = useRoute();
const router = useRouter();

const valorVentana = 3;
const TipoUsuario = ref(route.params.tipo || 'Empresa');
const ListadoUsuarios = ref([]);
const ListadoUsuariosAgregados = ref([]);

onMounted(() => {
    cargarDatos();
});

function cargarDatos (){
    store.cargarUsuarios().then((res) => {
        if(res){
            ListadoUsuarios.value = store.getUsuarios;
        }
    });
}

function test(){
    console.log('Separando el array');
    ListadoUsuariosAgregados.value = ListadoUsuarios.value.slice(0, 2);
}

function subirDatos(usuario){
    ListadoUsuariosAgregados.value.push(usuario);
    ListadoUsuarios.value = ListadoUsuarios.value.filter((item) => item.UsuarioId != usuario.UsuarioId);
}

function borrarUsuario(id){
    ListadoUsuarios.value = ListadoUsuarios.value.concat(ListadoUsuariosAgregados.value.filter((item) => item.UsuarioId == id));
    ListadoUsuariosAgregados.value = ListadoUsuariosAgregados.value.filter((item) => item.UsuarioId != id);
}

function esperarBusqueda(txt){
    if (txt && txt.length > 0){
        console.log('Buscando: ' + txt);
    } else {
        cargarDatos();
        console.log('Se buscó vacío: ' + txt);
    }
}

</script>

<template>
    <header>
        <h1> Tipo usuario - Empresa</h1>
    </header>
    <div class="contenedorPadre">
        <ventanasUsuarios :valorVentana="valorVentana"/>
        <div class="contenedorHijo">
            
            <div class="title">
                <h2 @click="test"> Tipo de Usuario: {{ TipoUsuario }} </h2>
            </div>

            <div class="gridFinder">
                <buscadorUsuarios @eBusqueda="esperarBusqueda" />
            </div>

            <div class="gridTable1">
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
                                <img src="@/assets/img/add.svg" class="btTabla" alt="Editar" @click="subirDatos(usuario)">
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>

            <div class="gridTable2">
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
                            <tr v-for="(usuario, index) in ListadoUsuariosAgregados" :key="index" :class="{td1: index % 2 == 0, td2: index % 2 != 0}">
                                <td>{{ usuario.UsuarioId }}</td>
                                <td class="col-start">{{ usuario.TipoUsuario }}</td>
                                <td class="col-start"> {{ usuario.ApellidoPaterno }} {{ usuario.ApellidoMaterno }} {{ usuario.Nombres }} </td>
                                <td class="col-xs">
                                    <img src="@/assets/img/trash.svg" class="btTabla" alt="Eliminar" @click="borrarUsuario(usuario.UsuarioId)">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>



<!--             <div class="linea">
                <buscadorUsuarios @eBusqueda="esperarBusqueda" />
                <transition-group name="general">
                <div class="formulario" v-if="showFrm"> 
                    <input type="text" class="inpClave" placeholder="Usuario Id" v-model="nuevoRegistro.UsuarioId" :disabled="true">
                    <input type="text" class="inpApellido" placeholder="Apellido Paterno" v-model="nuevoRegistro.ApellidoPaterno">
                    <input type="text" class="inpApellido" placeholder="Apellido Materno" v-model="nuevoRegistro.ApellidoMaterno">
                    <select name="tipoUsuario" id="tipoUsuario" class="selectTipoUsuario">
                        <option value="1"> Administrador </option>
                        <option value="2"> Usuario </option>
                        <option value="3"> Gerente </option>
                        <option value="4"> Contador </option>
                    </select>
                    <input type="text" class="inpNombre" placeholder="Nombres" v-model="nuevoRegistro.Nombres">
                    <button class="btAgregar" @click="modoFrm == 0 ? crearUsuario() : actualizarUsuario() "> {{ modoFrm == 0 ? 'Agregar ' : 'Actualizar'}} </button>
                    </div>
                </transition-group>
                <button class="btAgregar btNuevo" @click=" showFrm ? limpiarFrm() : (showFrm = true)"> {{ showFrm ? 'Cancelar' : "Nuevo"}} </button>
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
            </div> -->
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
    .contenedorHijo {
        padding: 1rem;
        width: 100%;
        background-color: red;
        display: grid;
        grid-template-areas:
            "title title title"
            "gridFinder gridFinder gridFinder"
            "gridTable1 auto gridTable2";

    .title {
        grid-area: title;
        background-color: blue;
    }

    .gridFinder {
        grid-area: gridFinder;
        background-color: green;
    }

    .gridTable1 {
        grid-area: gridTable1;
        background-color: yellow;
    }

    .gridTable2 {
        grid-area: gridTable2;
        background-color: pink;
    }
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