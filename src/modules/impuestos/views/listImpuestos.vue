
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useImpuestos } from '../store/impuestos.js'
import Swal from 'sweetalert2'
const store = useImpuestos();

const ListadoImpuestosSAT = ref([]);

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
    store.cargarImpuestosSAT().then(() => {
        ListadoImpuestosSAT.value = store.getListadoImpuestosSAT;
    });
}

</script>

<template>
    <header>
        <h1> Impuestos </h1>
    </header>
    <div class="contenedorPadre">
        <h2> Listado de impuestos SAT </h2>
        <!-- <div class="linea">
            <transition-group name="general">
                <div class="formulario" v-if="showFrm">
                    <input type="text" placeholder="Clave impuesto" class="inpClave" v-model="nuevoRegistro.cfgImpuestoId" v-show="modoFrm == 1" disabled>
                    <input type="text" placeholder="Descripción del impuesto" class="inpNombre" v-model="nuevoRegistro.NombreImpuesto">
                    <select name="L/F" class="inpNombre" v-model="nuevoRegistro.ClaveImpuesto">
                        <option v-for="Clave in ClavesImpuestos" :value="Clave.ClaveImpuesto"> {{Clave.Nombre}} </option>
                    </select>
                    <button class="btAgregar" alt="AñadirImpuesto" @click="modoFrm == 0 ? crearImpuestoPropio() : actualizarImpuestoPropio() "> {{ modoFrm == 0 ? 'Agregar' : 'Actualizar'}} </button>
                </div>
            </transition-group>
            <button class="btAgregar" alt="NuevoImpuesto" @click=" showFrm ? limpiarFrm() : (showFrm = true)"> {{ showFrm ? 'Cancelar' : "Nuevo"}} </button>
        </div> -->
            
        <div class="tablaContainer animate__animated animate__fadeIn animate__fast">
            <table>
                <thead>
                    <tr>
                        <th class="col-s">Clave Impuesto SAT</th>
                        <th class="col-auto col-start">Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(impuesto, index) in ListadoImpuestosSAT" :key="index" :class="{td1: index % 2 == 0, td2: index % 2 != 0}">
                        <td>{{ impuesto.ClaveImpuesto }} y {{ index }}</td>
                        <td class="col-start">{{ impuesto.Nombre }}</td>
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
        justify-content: flex-end;
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
    input:disabled{
        background-color: #d9d9d9;
        color: #000;
    }
</style>