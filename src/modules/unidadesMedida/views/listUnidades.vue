<script setup>
import { ref } from 'vue'
import buscadorUnidades from '../components/buscadorUnidades.vue';
import { useUnidades } from '../store/unidades.js'
import Swal from 'sweetalert2';

const store = useUnidades();
const ListadoUnidades = ref([]);
const showFrm = ref(0);
const modoFrm = ref(1);
const infoPaginado= ref({pagTotales: 1, pagAct: 1, regTotales: 1});
const ClaveUnidadSat = ref('');
const NombreUnidadSat = ref('');
const busquedaActiva = ref(false);

store.cargarUnidades(infoPaginado.value.pagAct).then( () => {
    ListadoUnidades.value = store.getUnidades.items;
    infoPaginado.value.pagTotales = store.getUnidades.info.totalPages;
    infoPaginado.value.regTotales = store.getUnidades.info.totalItems;
});

function paginado(opc){
    if(opc == 1){
        infoPaginado.value.pagAct = 1;
    }else if(opc == 2){
        if(infoPaginado.value.pagAct > 1){
            infoPaginado.value.pagAct--;
        }
    }else if(opc == 3){
        if(infoPaginado.value.pagAct < infoPaginado.value.pagTotales){
            infoPaginado.value.pagAct++;
        }
    }else if(opc == 4){
        infoPaginado.value.pagAct = infoPaginado.value.pagTotales;
    }

    store.cargarUnidades(infoPaginado.value.pagAct).then( () => {
        ListadoUnidades.value = store.getUnidades.items;
        infoPaginado.value.pagTotales = store.getUnidades.info.totalPages;
        infoPaginado.value.regTotales = store.getUnidades.info.totalItems;
        infoPaginado.value.pagAct = store.getUnidades.info.currentPage;
    });

}
function mostrarFrm(opc){
    showFrm.value = opc;
    if(opc == 0){
        modoFrm.value = 1;
        ClaveUnidadSat.value = '';
        NombreUnidadSat.value = '';
    }
}
function esperarBusqueda(txt){
    if(txt == ''){
        store.cargarUnidades(1).then( () => {
            ListadoUnidades.value = store.getUnidades.items;
            infoPaginado.value.pagTotales = store.getUnidades.info.totalPages;
            infoPaginado.value.regTotales = store.getUnidades.info.totalItems;
            infoPaginado.value.pagAct = store.getUnidades.info.currentPage;
            busquedaActiva.value = false;
        });
    }else{
        ListadoUnidades.value = store.getUnidades.response;
        busquedaActiva.value = true;
    }
}
function frmUnidad(opc){
    const body = {
        ClaveUnidadSat: ClaveUnidadSat.value,
        NombreUnidadSat: NombreUnidadSat.value,
    }
    if (opc == 1){
        store.crearUnidad(body).then( () => {
            store.cargarUnidades(infoPaginado.value.pagAct).then( (res) => {
                if(res){
                    ListadoUnidades.value = store.getUnidades.items;
                    infoPaginado.value.pagTotales = store.getUnidades.info.totalPages;
                    infoPaginado.value.regTotales = store.getUnidades.info.totalItems;
                    infoPaginado.value.pagAct = store.getUnidades.info.currentPage;
                }
                mostrarFrm(0);
            });
        });
    }else if (opc == 2){
        store.editarUnidad(body).then( (res) => {
            if(res){
                store.cargarUnidades(infoPaginado.value.pagAct).then( () => {
                    ListadoUnidades.value = store.getUnidades.items;
                    infoPaginado.value.pagTotales = store.getUnidades.info.totalPages;
                    infoPaginado.value.regTotales = store.getUnidades.info.totalItems;
                    infoPaginado.value.pagAct = store.getUnidades.info.currentPage;
                });
                mostrarFrm(0);
            }
        });
    }
}
function ActualizandoUnidad(unidad){
    ClaveUnidadSat.value = unidad.ClaveUnidadSat;
    NombreUnidadSat.value = unidad.NombreUnidadSat;
    mostrarFrm(1);
    modoFrm.value = 2;
}
function borrarUnidad(id){
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

            store.borrarUnidad(id).then( (res) => { 
                if(res){
                    store.cargarUnidades(infoPaginado.value.pagAct).then( () => {
                        ListadoUnidades.value = store.getUnidades.items;
                        infoPaginado.value.pagTotales = store.getUnidades.info.totalPages;
                        infoPaginado.value.regTotales = store.getUnidades.info.totalItems;
                        infoPaginado.value.pagAct = store.getUnidades.info.currentPage;
                    });
                }
            });




        }
    });
}
</script>

<template>
    <header>
        <h1> Unidades de medida</h1>
    </header>
    <div class="contenedorPadre">
        <h2> Listado de unidades de medida</h2>
        <div class="linea">
            <div class="buscador">
                <buscadorUnidades
                    @eBusqueda="esperarBusqueda"
                />
            </div>
            <transition-group name="general">
                <div class="formulario" v-if="showFrm != 0">
                    <input class="inpClaveUnidad" type="text" placeholder="Clave Unidad" maxlength="3" v-model="ClaveUnidadSat" :disabled="modoFrm == 2">
                    <input class="inpNombreUnidad" type="text" placeholder="Nombre de Unidad de Medida" v-model="NombreUnidadSat">
                    <button class="btAgregar" @click="modoFrm == 1 ? frmUnidad(1) : frmUnidad(2)"> {{ modoFrm == 1 ? 'Nuevo' : 'Actualizar' }} </button>
                </div>
            </transition-group>                                 
            <button class="btAgregar" @click="showFrm == 0 ? mostrarFrm(1) : mostrarFrm(0)"> {{ showFrm == 0 ? 'Agregar' : 'Cancelar' }} </button>
        </div>

        <div class="tablaContainer animate__animated animate__fadeIn animate__fast" >
            <table>
                <thead>
                    <tr>
                        <th class="col-xs">ID de Unidad</th>
                        <th class="col-auto">Nombre</th>
<!--                         <th class="col-s">Status</th>
                        <th class="col-xs">Acciones</th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr :class="{filaDesactivada: !unidad.Activo, td1: index % 2 == 0, td2: index % 2 != 0}" v-for="(unidad, index) in ListadoUnidades" :key="index">
                        <td class="col-xs"> {{ unidad.ClaveUnidadSat }} </td>
                        <td class="col-auto col-start"> {{ unidad.NombreUnidadSat }} </td>
<!--                         <td class="col-s"> {{ unidad.Activo ? 'Activado' : 'Desactivado' }} </td>
                        <td class="col-xs"> 
                            <svg v-if="!unidad.Activo" alt="Editar" class="btTabla" @click="ActualizandoUnidad(unidad)" width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.9525 3.24673L19.3977 6.77085C19.5428 6.91932 19.5428 7.16155 19.3977 7.31002L11.056 15.8429L7.51155 16.2454C7.03794 16.3001 6.6369 15.8898 6.69037 15.4054L7.08377 11.7796L15.4254 3.24673C15.5706 3.09826 15.8074 3.09826 15.9525 3.24673ZM22.14 2.35202L20.2761 0.445399C19.6956 -0.148466 18.7522 -0.148466 18.1678 0.445399L16.8157 1.82848C16.6706 1.97695 16.6706 2.21918 16.8157 2.36765L20.2609 5.89178C20.406 6.04024 20.6428 6.04024 20.7879 5.89178L22.14 4.50869C22.7206 3.91092 22.7206 2.94589 22.14 2.35202ZM15.2421 13.5222V17.4995H3.01988V4.99707H11.797C11.9192 4.99707 12.0338 4.94628 12.1216 4.86032L13.6494 3.29752C13.9397 3.00059 13.7334 2.49658 13.3247 2.49658H2.40877C1.39662 2.49658 0.575439 3.33659 0.575439 4.37195V18.1246C0.575439 19.16 1.39662 20 2.40877 20H15.8532C16.8654 20 17.6865 19.16 17.6865 18.1246V11.9594C17.6865 11.5413 17.1938 11.3342 16.9036 11.6273L15.3758 13.1901C15.2918 13.2799 15.2421 13.3971 15.2421 13.5222Z" fill="#fff"/>
                            </svg>
                            <img v-else src="@/assets/img/edit.svg" alt="Editar" class="btTabla" @click="ActualizandoUnidad(unidad)"> 
                            <img src="@/assets/img/trash.svg" alt="Borrar" class="btTabla" @click="borrarUnidad(unidad.ClaveUnidadSat)" v-if="unidad.Activo == true">
                        </td> -->
                    </tr>
                </tbody>
            </table>
        </div>

        <transition-group name="general">
            <div class="paginado" v-if="!busquedaActiva">
                <span class="contadorPaginado"> 
                    Página {{ infoPaginado.pagAct }} de {{ infoPaginado.pagTotales }}. Total registros: {{ infoPaginado.regTotales }}
                </span>
                
                <div class="botonesPaginado">
                    <button @click="paginado(1)"> &lt;&lt; </button>
                    <button @click="paginado(2)"> &lt; </button>
            
                    <button @click="paginado(3)"> &gt; </button>
                    <button @click="paginado(4)"> &gt;&gt; </button>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<style scoped>

.general-enter-active {
    animation: fadeIn 0.75s;
}
.general-leave-active {
    animation: fadeOut 0.25s;
}

@import url('../../../styles/tablaListado.css');

.filaDesactivada td{
    background-color: #999;
    display: none;          /* Ocultar fila desactivada */
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
    justify-content: space-between;
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
    width: 10rem;
    font-weight: bold;
    letter-spacing: 0.25rem;
}
.formulario{
    display: flex;
    justify-content: flex-start;
    width: 60%;
    align-items: center;
}
.formulario *:not(label){
    margin-left: 1rem;
}
.inpClaveUnidad, .inpNombreUnidad{
    height: 2.1875rem;
    color: #000;
    border: 1px solid #D9D9D9;
    border-radius: 0.3125rem;
    padding-left: 1rem;
}
.inpNombreUnidad{
    width: 35rem;
}
.inpClaveUnidad{
    width: 10rem;
}
.inpNombreUnidad:focus, .inpClaveUnidad:focus{
    outline: none;
}
.labelNombreUnidad{
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 0.125rem;
}
.tablaContainer{
    display: flex;
    height: 31rem;
    min-width: 31rem;
    flex-grow: 0;
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