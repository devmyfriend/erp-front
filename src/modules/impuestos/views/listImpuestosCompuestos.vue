<script setup>
import { ref, onMounted, computed } from 'vue'
import { useImpuestos } from '../store/impuestos.js'
import Swal from 'sweetalert2'
const store = useImpuestos();

const ListadoImpuestosPropios = ref([]);
const ListadoImpuestosCompuestos = ref([]);

const nuevoRegistro1 = ref({
    Nombre: '', 
    Predeterminado: false, 
    CreadoPor: 2
})
const nuevoRegistro2 = ref({
    ClaveImpuesto: '',
    Nombre: '', 
    Predeterminado: false, 
    CreadoPor: 2
})

const showFrm1 = ref(false);
const modoFrm1 = ref(0);
const showFrm2 = ref(false);
const modoFrm2 = ref(0);

onMounted(() => {
    cargarDatos();
})

function cargarDatos(){
    store.cargarImpuestosPropios().then(() => {
        ListadoImpuestosPropios.value = store.getListadoImpuestosPropios;
    });

    store.cargarImpuestosCompuestos().then(() => {
        ListadoImpuestosCompuestos.value = store.getListadoImpuestosCompuestos;
    });
}

function crearImpuestoCompuesto(){
    nuevoRegistro1.value.CreadoPor = 2;
    store.crearImpuestoCompuesto(nuevoRegistro1.value).then(() => {
        cargarDatos();
        limpiarFrm1();
    });
}

function subirDatos1(impuesto){
    nuevoRegistro1.value= impuesto;
    showFrm1.value = true;
    modoFrm1.value = 1;
}
function subirDatos2(impuesto){
    nuevoRegistro2.value= impuesto;
    showFrm2.value = true;
    modoFrm2.value = 1;
}

function actualizarImpuestoCompuesto(){
    nuevoRegistro1.value.ActualizadoPor = 2;
    store.actualizarImpuestoCompuesto(nuevoRegistro1.value).then(() => {
        store.cargarImpuestosCompuestos().then(() => {
            ListadoImpuestosCompuestos.value = store.getListadoImpuestosCompuestos;
            limpiarFrm1();
        });
    });
}

function borrarImpuestoCompuesto(impuesto){
    Swal.fire({
        title: '¿Estás seguro?',
        text: `¡Borrarás el impuesto compuesto con id: ${impuesto}!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrarlo!'
    }).then((result) => {
        if (result.isConfirmed) {
            store.borrarImpuestoCompuesto(impuesto).then(() => {
                cargarDatos();
            });
        }
    });
}

function limpiarFrm1(){
    showFrm1.value = !showFrm1;
    nuevoRegistro1.value = {
        Nombre: '', 
        ClaveImpuesto: '', 
        CreadoPor: 2
    }
    modoFrm1.value = 0;
}
function limpiarFrm2(){
    showFrm2.value = !showFrm2;
    nuevoRegistro2.value = {
        Nombre: '', 
        ClaveImpuesto: '', 
        CreadoPor: 2
    }
    modoFrm2.value = 0;
}

</script>

<template>
    <header>
        <h1> Impuestos</h1>
    </header>
    <div class="contenedorPadre">
        <h2> Listado de impuestos compuestos </h2>
        <div class="linea">
            <transition-group name="general">
                <div class="formulario" v-if="showFrm1">
                    <input type="text" placeholder="Clave impuesto" class="inpClave" v-model="nuevoRegistro1.ImpuestoCompuestoId" v-show="modoFrm1 == 1" disabled>
                    <input type="text" placeholder="Descripción del impuesto" class="inpNombre" v-model="nuevoRegistro1.Nombre">
                    <label for="inpNombre" class="labelNombre"> Predeterminado </label>
                    <input type="checkbox" v-model="nuevoRegistro1.Predeterminado" :checked="nuevoRegistro1.Predeterminado">
                    <button class="btAgregar" alt="AñadirImpuesto" @click="modoFrm1 == 0 ? crearImpuestoCompuesto() : actualizarImpuestoCompuesto() "> {{ modoFrm1 == 0 ? 'Agregar' : 'Actualizar'}} </button>
                </div>
            </transition-group>
            <button class="btAgregar" alt="NuevoImpuesto" @click=" showFrm1 ? limpiarFrm1() : (showFrm1 = true)"> {{ showFrm1 ? 'Cancelar' : "Nuevo"}} </button>
        </div>
            
        <div class="tablaContainer animate__animated animate__fadeIn animate__fast">
            <table>
                <thead>
                    <tr>
                        <th class="col-s">Clave Impuesto Compuesto</th>
                        <th class="col-auto col-start">Descripción</th>
                        <th class="col-s">Predeterminado</th>
                        <th class="col-xs">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(impuesto, index) in ListadoImpuestosCompuestos" :key="index" :class="{td1: index % 2 == 0, td2: index % 2 != 0}">
                        <td>{{ impuesto.ImpuestoCompuestoId }}</td>
                        <td class="col-start">{{ impuesto.Nombre }}</td>
                        <td>{{ impuesto.Predeterminado == true ? 'Si' : 'No' }}</td>
                        <td>
                            <img src="@/assets/img/edit.svg" class="btTabla" alt="Editar" @click="subirDatos1(impuesto)">
                            <img src="@/assets/img/trash.svg" class="btTabla" alt="Eliminar" @click="borrarImpuestoCompuesto(impuesto.ImpuestoCompuestoId)">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

<!--         <div class="linea">
            <transition-group name="general">
                <div class="formulario" v-if="showFrm2" :key="'form2'">
                    <input type="text" placeholder="Clave impuesto" class="inpClave" v-model="nuevoRegistro2.ImpuestoCompuestoId" v-show="modoFrm2 == 1" disabled>
                    <input type="text" placeholder="Clave impuesto" class="inpClave" v-model="nuevoRegistro2.ImpuestoCompuestoId">
                    <input type="text" placeholder="Descripción del impuesto" class="inpNombre inpNombre2" v-model="nuevoRegistro2.Nombre">
                    <label for="inpNombre" class="labelNombre line2"> Retención </label>
                    <input type="checkbox" v-model="nuevoRegistro2.Predeterminado" :checked="nuevoRegistro2.Predeterminado">
                    <label for="inpNombre" class="labelNombre"> Tipo Factor </label>
                    <input type="checkbox" v-model="nuevoRegistro2.Predeterminado" :checked="nuevoRegistro2.Predeterminado">
                    <label for="inpNombre" class="labelNombre"> IVA s IEPS </label>
                    <input type="checkbox" v-model="nuevoRegistro2.Predeterminado" :checked="nuevoRegistro2.Predeterminado">
                    <label for="inpNombre" class="labelNombre"> Desglozar </label>
                    <input type="checkbox" v-model="nuevoRegistro2.Predeterminado" :checked="nuevoRegistro2.Predeterminado">
                    <button class="btAgregar" alt="AñadirImpuesto" @click="modoFrm2 == 0 ? crearImpuestoCompuesto() : actualizarImpuestoCompuesto() "> {{ modoFrm2 == 0 ? 'Agregar' : 'Actualizar'}} </button>                
                </div>
                <button class="btAgregar" alt="NuevoImpuesto" @click=" showFrm2 ? limpiarFrm2() : (showFrm2 = true)" :key="'button2'"> {{ showFrm2 ? 'Cancelar' : "Nuevo"}} </button>
            </transition-group>
        </div>

        <div class="tablaContainer animate__animated animate__fadeIn animate__fast">
            <table>
                <thead>
                    <tr>
                        <th class="col-xxs">Clave</th>
                        <th class="col-s">Clave Impuesto propio</th>
                        <th class="col-auto col-start">Nombre</th>
                        <th class="col-xxs">Tasa</th>
                        
                        <th class="col-xs">Retención</th>
                        <th class="col-xs">TipoFactor</th>
                        <th class="col-xs">IVA S IEPS</th>
                        <th class="col-xs">Desglozar</th>

                        <th class="col-xs">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="impuesto in ListadoImpuestosCompuestos" :key="impuesto.ImpuestoCompuestoId">
                        <td>{{ impuesto.ImpuestoCompuestoId }}</td>
                        <td>{{ impuesto.ImpuestoCompuestoId }}</td>
                        <td class="col-start    ">{{ impuesto.Nombre }}</td>
                        <td>{{ impuesto.ImpuestoCompuestoId }}</td>

                        <td>{{ impuesto.Predeterminado == true ? 'Si' : 'No' }}</td>
                        <td>{{ impuesto.Predeterminado == true ? 'Si' : 'No' }}</td>
                        <td>{{ impuesto.Predeterminado == true ? 'Si' : 'No' }}</td>
                        <td>{{ impuesto.Predeterminado == true ? 'Si' : 'No' }}</td>
                        <td>
                            <img src="@/assets/img/edit.svg" class="btTabla" alt="Editar" @click="subirDatos2(impuesto)">
                            <img src="@/assets/img/trash.svg" class="btTabla" alt="Eliminar" @click="borrarImpuestoCompuesto(impuesto.ImpuestoCompuestoId)">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div> -->
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
    .linea2{  
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 50%;
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
    .linea:not(:first-of-type){
        margin-top: 0.75rem;
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
    .inpNombre2{
        width: 25rem;
    }
    .inpClave{
        width: 10rem;
    }
    .inpClave2{
        width: 5rem;
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
    .tablaContainer{
        /* height: 16rem; */
        flex-grow: 1;
    }
    .line2{
        padding-left: 0.25rem;
    }
    .frm2{
        margin-bottom: 2rem;
    }
</style>