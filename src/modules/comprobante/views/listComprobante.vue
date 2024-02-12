<template lang="es">
    <div class="contenedor">
        <header>
            <h1> Tipos de comprobante</h1>
        </header>
        <div class="contenido">
            <div class="formulario">
                <input type="text" placeholder="Clave Comprobante" class="ClaveComprobante">
                <input type="text" placeholder="Descripción del comprobante" class="NombreComprobante">
                <img src="@/assets/img/plus.png" alt="AñadirComprobante" class="iconoAgregar">
            </div>
            


            <table class="table-bordered">
                <thead>
                    <tr>
                        <th>Clave tipo de comprobante</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>I</td>
                        <td>Ingresos</td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2" href="#"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>E</td>
                        <td>Egresos</td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2" href="#"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>T</td>
                        <td>Traslado</td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2" href="#"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>N</td>
                        <td>Nómina</td>
                        <td class="Acciones">
                            <a class="mx-2" href="#"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                            <a class="mx-2" href="#"><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                        </td>
                    </tr>
                    <tr>
                        <td>P</td>
                        <td>Pago</td>
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
    }

    .ClaveComprobante, .NombreComprobante {
        height: 2.1875rem;
        border: none;
        border-radius: 5px;
        padding: 0.5rem;
        font-size: 1rem;
        outline: none;
    }
    .ClaveComprobante{
        width: 18.75rem;
    }
    .NombreComprobante{
        width: 41.0625rem;
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