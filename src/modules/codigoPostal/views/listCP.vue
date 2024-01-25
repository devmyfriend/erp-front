<template lang="es">
    <div class="contenedor">
        <header>
            <h1> Códigos postales</h1>
        </header>
        <div class="contenido">
            <buscadorCP/>
            <!-- <tablaInfinita></tablaInfinita> -->
            <!-- En su lugar, se usa una tabla estatica de muestra -->

            <table class="table-bordered">
                <thead>
                    <tr>
                        <th>Código Postal</th>
                        <th>Estado</th>
                        <th>Municipio</th>
                        <th>Localidad</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>77500</td>
                        <td>Quintana Roo</td>
                        <td>Benito Juárez</td>
                        <td>Cancún</td>
                    </tr>
                    <tr>
                        <td>77501</td>
                        <td>Quintana Roo</td>
                        <td>Cozumel</td>
                        <td>Cozumel</td>
                    </tr>
                    <tr>
                        <td>77502</td>
                        <td>Quintana Roo</td>
                        <td>Solidaridad</td>
                        <td>Playa del Carmen</td>
                    </tr>
                    <tr>
                        <td>77503</td>
                        <td>Quintana Roo</td>
                        <td>Tulum</td>
                        <td>Tulum</td>
                    </tr>
                    <tr>
                        <td>77504</td>
                        <td>Quintana Roo</td>
                        <td>Isla Mujeres</td>
                        <td>Isla Mujeres</td>
                    </tr>
                    <tr>
                        <td>77505</td>
                        <td>Quintana Roo</td>
                        <td>Lázaro Cárdenas</td>
                        <td>Kantunilkin</td>
                    </tr>
                    <tr>
                        <td>77506</td>
                        <td>Quintana Roo</td>
                        <td>Othón P. Blanco</td>
                        <td>Chetumal</td>
                    </tr>                    
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import buscadorCP from '@/modules/codigoPostal/components/buscadorCP.vue'
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
</style>