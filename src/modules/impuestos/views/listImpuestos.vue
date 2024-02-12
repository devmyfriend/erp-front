<template lang="es">
    <div class="contenedor">
        <header>
            <h1> Tipos de impuesto</h1>
        </header>
        <div class="contenido">
            <div class="formulario">
                <div class="fila">
                    <input type="text" placeholder="Clave Impuesto" class="ClaveImpuesto">
                    <input type="text" placeholder="Descripción del impuesto" class="NombreImpuesto">
                </div>

                <div class="fila">
                    <label for="Retención">Retención</label>
                    <input name="Retención" type="checkbox">
                    <label for="Traslado">Traslado</label>
                    <input name="Traslado" type="checkbox">
                    <label for="L/F">Local/Federal</label>
                    <select name="L/F" class="LocalFederal" v-model="LocalFederal">
                        <option v-if="!LocalFederalSelected" value=""></option>
                        <option value="1">Federal</option>
                        <option value="2">Local</option>
                    </select>
                    <img src="@/assets/img/plus.png" alt="AñadirComprobante" class="iconoAgregar">
                </div>
            </div>
            

            <button @click="test"> test </button>
            <table class="table-bordered">
                <thead>
                    <tr>
                        <th>Clave Impuesto</th>
                        <th>Descripción</th>
                        <th>Retención</th>
                        <th>Traslado</th>
                        <th>Local o Federal</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>601</td>
                        <td>ISR</td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/check.svg" alt="Checkmark"></a>
                        </td>
                        <td></td>
                        <td>Federal</td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2" href="#"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>603</td>
                        <td>IVA</td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/check.svg" alt="Checkmark"></a>
                        </td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/check.svg" alt="Checkmark"></a>
                        </td>
                        <td>Federal</td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2" href="#"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>605</td>
                        <td>IEPS</td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/check.svg" alt="Checkmark"></a>
                        </td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/check.svg" alt="Checkmark"></a>
                        </td>
                        <td>Federal</td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2" href="#"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</template>

<script setup>
/* import tablaInfinita from '@/shared/tablaInfinita.vue' */
import { ref, watch, onMounted } from 'vue'


const { useImpuestos } = require('../store/impuestos.js')
const store = useImpuestos();

const ListadoImpuestos = ref([]);

const LocalFederal = ref(0);
const LocalFederalSelected = ref(false);
watch(LocalFederal, (val) => {
    if (val != 0) {
        LocalFederalSelected.value = true;
    }
})

onMounted(() => {
    store.cargarImpuestos().then(() => {
        ListadoImpuestos.value = store.getImpuestos;
        console.log('[Front] [Carga]: ' + JSON.stringify(ListadoImpuestos.value));
    })
})

function test() {
    store.buscarImpuestos().then(() => {
        ListadoImpuestos.value = store.getImpuestos;
        console.log('[Front] [Carga]: ' + JSON.stringify(ListadoImpuestos.value));
    })
}
</script>

<style>
    
    @import url('../../../styles/checkbox.css');

    .contenedor {
        background-color: #D9D9D9;
        width: 100%;
        height: 100%;
    }
    header {
        width: 100%;
        text-align: start;
    }
    .contenido{
        width: auto;
        margin: 1rem;
    }
    h1{
        margin: 0;
        padding-bottom: 1rem;
        width: 100%;
        background-color: white;
    }
    .formulario{
        width: 100%;
    }
    .fila{
        display: flex;
        margin-bottom: 1rem;
    }
    label{
        color: #999999;
    }
    label:first-child{
        color: #999999;
        margin-right: 0.5rem;
    }
    label:not(:first-child), 
    select{
        font-size: 1rem;
        margin: auto 0.5rem auto 1rem;
        margin-right: 0.5rem;
    }
    .LocalFederal{
        width: 12.6875rem;
    }
    .ClaveImpuesto, .NombreImpuesto, select, label {
        height: 2.1875rem;
        border: none;
        border-radius: 5px;
        padding: 0.5rem;
        font-size: 1rem;
        outline: none;
    }
    .ClaveImpuesto{
        width: 32.5rem;
    }
    .NombreImpuesto{
        width: 43.625rem;
        margin-left: 0.5rem;
    }
    .iconoAgregar{
    width: 1.375rem;
    height: 1.375rem;
    margin: auto;
    margin-left: 0.5rem;
    vertical-align: middle;
    }
    ::placeholder {
        font-style: italic;
        color: #bdbdbdda;
    }
</style>