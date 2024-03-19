<template lang="es">
    <div class="contenedor">
        <header>
            <h1> Uso de CFDi </h1>
        </header>
        <div class="contenido">
            <div class="fila">
                <buscadorCFDi/>
                <btNuevoCFDi/>
            </div>

            <button @click="test"> test </button>
            <table class="table-bordered">
                <thead>
                    <tr>
                        <th>Clave CFDi</th>
                        <th>Descripción</th>
                        <th>Persona Moral</th>
                        <th>Persona Física</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>G01</td>
                        <td>Adquisición de mercancías</td>
                        <td class="Acciones">
                           <a class="mx-2" href="#"><img src="@/assets/img/check.svg" alt="Checkmark"></a>
                        </td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/check.svg" alt="Checkmark"></a>
                        </td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2" href="#"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>G02</td>
                        <td>Devoluciones, descuentos o bonificaciones</td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/check.svg" alt="Checkmark"></a>
                        </td>
                        <td></td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2" href="#"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>G03</td>
                        <td>Gastos en general</td>
                        <td></td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/check.svg" alt="Checkmark"></a>
                        </td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2" href="#"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>I01</td>
                        <td>Construcciones</td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/check.svg" alt="Checkmark"></a>
                        </td>
                        <td></td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2" href="#"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>I02</td>
                        <td>Mobiliario y equipo de oficina por inversiones</td>
                        <td></td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/check.svg" alt="Checkmark"></a>
                        </td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2" href="#"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>I03</td>
                        <td>Equipo de transporte</td>
                        <td></td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/check.svg" alt="Checkmark"></a>
                        </td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2" href="#"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>I04</td>
                        <td>Equipo de computo y accesorios</td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/check.svg" alt="Checkmark"></a>
                        </td>
                        <td></td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2" href="#"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>I05</td>
                        <td>Dados, troqueles, moldes, matrices y herramental</td>
                        <td></td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/check.svg" alt="Checkmark"></a>
                        </td>
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
import { ref, onMounted } from 'vue'
import buscadorCFDi from '@/modules/usoCFDi/components/buscadorCFDi.vue'
import btNuevoCFDi from '@/modules/usoCFDi/components/btNuevoCFDi.vue';
import { storeToRefs } from 'pinia';
/* import tablaInfinita from '@/shared/tablaInfinita.vue' */
const { useCFDi } = require('../store/CFDi.js')
const store = useCFDi();

const ListadoCFDi = ref([]);

onMounted(() => {
    store.cargarCFDi().then(() => {
        ListadoCFDi.value = store.getCFDi;
        console.log('[Front] [Carga]: ' + JSON.stringify(ListadoCFDi.value));
    })
})

function test () {
    store.buscarCFDi('G01').then(() => {
        console.log('[Front] [Busqueda]: ');
    })
}

</script>

<style scoped>
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
    .fila {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>