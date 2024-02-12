<template lang="es">
    <div class="contenedor">
        <header>
            <h1> Regimenes fiscales</h1>
        </header>
        <div class="contenido">
            <div class="formulario">
                <div class="fila">
                    <input type="text" placeholder="Clave Regimen" class="ClaveRegimen">
                    <input type="text" placeholder="Descripción del Regimen" class="NombreRegimen">
                </div>

                <div class="fila">
                    <label for="PersonaMoral">Persona Moral</label>
                    <input id="PersonaMoral" type="checkbox">
                    <label for="PersonaFisica">Persona Fisica</label>
                    <input id="PersonaFisica" type="checkbox">
                    
                    <label for="FechaInicio">Fecha de Inicio</label>
                    <input type="date" id="FechaInicio" value="2024-01-26">
                    <label for="FechaInicio">Fecha de Fin</label>
                    <input type="date" id="FechaFin" value="2024-01-26">
                    
                    <img src="@/assets/img/plus.png" alt="AñadirComprobante" class="iconoAgregar">
                </div>
            </div>

            <table class="table-bordered">
                <thead>
                    <tr>
                        <th>Clave Regimen Fiscal</th>
                        <th>Descripción</th>
                        <th>Fisica</th>
                        <th>Moral</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>CFDi</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Personas Morales con Fines Lucrativos</td>
                        <td></td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/check.svg" alt="Checkmark"></a>
                        </td>
                        <td>2024/01/26</td>
                        <td>2025/01/26</td>
                        <td>I05</td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2" href="#"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Sueldos y Salarios e Ingresos Asimilados a Salarios</td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/check.svg" alt="Checkmark"></a>
                        </td>
                        <td></td>
                        <td>2024/01/26</td>
                        <td>2025/01/26</td>
                        <td>N</td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2" href="#"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Arrendamiento</td>
                        <td></td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/check.svg" alt="Checkmark"></a>
                        </td>
                        <td>2024/01/26</td>
                        <td>2025/01/26</td>
                        <td>I03</td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2" href="#"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Régimen de Enajenación o Adquisición de Bienes</td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/check.svg" alt="Checkmark"></a>
                        </td>
                        <td></td>
                        <td>2024/01/26</td>
                        <td>2025/01/26</td>
                        <td>I02</td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2" href="#"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Demás ingresos</td>
                        <td></td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/check.svg" alt="Checkmark"></a>
                        </td>
                        <td>2024/01/26</td>
                        <td>2025/01/26</td>
                        <td>I01</td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2" href="#"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>Residentes en el Extranjero sin Establecimiento Permanente en México</td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/check.svg" alt="Checkmark"></a>
                        </td>
                        <td></td>
                        <td>2024/01/26</td>
                        <td>2025/01/26</td>
                        <td>G03</td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2" href="#"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>Ingresos por Dividendos (socios y accionistas)</td>
                        <td></td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/check.svg" alt="Checkmark"></a>
                        </td>
                        <td>2024/01/26</td>
                        <td>2025/01/26</td>
                        <td>G02</td>
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
        margin-bottom: 1rem;
        display: flex;
    }
    label:first-child{
        margin-right: 0.5rem;
    }
    label:not(:first-child), 
    select{
        font-size: 1rem;
        margin: auto 0.5rem auto 1rem;
        margin-right: 0.5rem;
    }
    .ClaveRegimen, .NombreRegimen, select, label, input[type="date"] {
        color: #999999;
        height: 2.1875rem;
        border: none;
        border-radius: 5px;
        padding: 0.5rem;
        font-size: 1rem;
        outline: none;
    }
    .ClaveRegimen{
        width: 32.5rem;
    }
    .NombreRegimen{
        width: 43.625rem;
        margin-left: 0.5rem;
    }
    input[type="date"]{
        width: 20rem;
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