<template lang="es">
    <div class="contenedor">
        <header>
            <h1> Tipos de moneda</h1>
        </header>
        <div class="contenido">
            <buscadorMonedas/>
            <div class="formulario">
                <input type="text" placeholder="Clave Moneda" class="ClaveMoneda">
                <input type="text" placeholder="Nombre" class="NombreMoneda">
                <img src="@/assets/img/plus.png" alt="AñadirComprobante" class="iconoAgregar">
            </div>
            
            <!-- <tablaInfinita></tablaInfinita> -->
            <!-- En su lugar, se usa una tabla estatica de muestra -->

            <table class="table-bordered">
                <thead>
                    <tr>
                        <th>Clave Moneda</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ARS</td>
                        <td>Peso Argentino</td>
                        <td class="Acciones"> 
                            <a class="mx-2"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>BOB</td>
                        <td>Boliviano</td>
                        <td class="Acciones"> 
                            <a class="mx-2"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>CAD</td>
                        <td>Dólar Canadiense</td>
                        <td class="Acciones"> 
                            <a class="mx-2"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>CLP</td>
                        <td>Peso Chileno</td>
                        <td class="Acciones"> 
                            <a class="mx-2"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>COP</td>
                        <td>Peso Colombiano</td>
                        <td class="Acciones"> 
                            <a class="mx-2"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>USD</td>
                        <td>Dólar Americano</td>
                        <td class="Acciones"> 
                            <a class="mx-2"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>EUR</td>
                        <td>Euro</td>
                        <td class="Acciones"> 
                            <a class="mx-2"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>EGP</td>
                        <td>Libra Egipcia</td>
                        <td class="Acciones"> 
                            <a class="mx-2"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import buscadorMonedas from '@/modules/moneda/components/buscadorMonedas.vue'
/* import tablaInfinita from '@/shared/tablaInfinita.vue' */
</script>

<style>
    @import url('../../../styles/tablaInfinita.css');

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
        justify-content: start;
        width: 100%;
        margin-top: 1rem;
    }
    .ClaveMoneda, .NombreMoneda, .ValorMoneda {
        height: 2.1875rem;
        border: none;
        border-radius: 5px;
        padding: 0.5rem;
        font-size: 1rem;
        outline: none;
    }
    .ClaveMoneda{
        width: 18.75rem;
    }
    .NombreMoneda{
        width: 21.875rem;
        margin-left: 0.5rem;
    }
    .ValorMoneda{
        width: 13.1875rem;
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