<template lang="es">
    <div class="contenedor">
        <header>
            <h1>Formas de Pago</h1>
        </header>
        <div class="contenido">
            <buscadorFormasPago/>
            <div class="formulario">
                <input type="text" placeholder="Clave Formas de Pago" class="ClaveFormasPago">
                <input type="text" placeholder="Descripción" class="DescripcionFormasPago">
                <img src="@/assets/img/plus.png" alt="AñadirComprobante" class="iconoAgregar">
            </div>
            

            <button @click="test"> test </button>
            <table class="table-bordered">
                <thead>
                    <tr>
                        <th>Clave Forma Pago</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Efectivo</td>
                        <td class="Acciones"> 
                            <a class="mx-2"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Cheque nominativo</td>
                        <td class="Acciones"> 
                            <a class="mx-2"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Transferencia electrónica de fondos</td>
                        <td class="Acciones"> 
                            <a class="mx-2"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Tarjeta de crédito</td>
                        <td class="Acciones"> 
                            <a class="mx-2"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Monedero electrónico</td>
                        <td class="Acciones"> 
                            <a class="mx-2"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>Dinero electrónico</td>
                        <td class="Acciones"> 
                            <a class="mx-2"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>Vales de despensa</td>
                        <td class="Acciones"> 
                            <a class="mx-2"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import buscadorFormasPago from '@/modules/formasPago/components/buscadorFormasPago.vue'
/* import tablaInfinita from '@/shared/tablaInfinita.vue' */

onMounted(() => {
    
})

function test(){
    console.log("test")
}
</script>

<style>
    

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
        display: flex;
        justify-content: flex-start;
        width: 100%;
        margin-top: 1rem;
    }
    .ClaveFormasPago, .DescripcionFormasPago {
        height: 2.1875rem;
        border: none;
        border-radius: 5px;
        padding: 0.5rem;
        font-size: 1rem;
        outline: none;
    }
    .ClaveFormasPago{
        width: 20rem;
    }
    .DescripcionFormasPago{
        width: 55.8125rem;
        margin-left: 0.5rem;
    }
    .iconoAgregar{
    width: 1.375rem;
    height: 1.375rem;
    margin: auto;
    margin-left: 0.5rem;
    vertical-align: middle;
    }
    
</style>