<script setup>
import { ref } from 'vue'
import buscadorCP from '../components/buscadorCP.vue';
import { useCodigosPostales } from '../store/codigosPostales.js'
import Swal from 'sweetalert2';

const store = useCodigosPostales();
const ListadoCP = ref([]);

store.cargarCodigosPostales().then(() => {
    ListadoCP.value = store.getCodigosPostales;
});
</script>

<template>
    <header>
        <h1> Códigos Postales</h1>
    </header>
    <div class="contenedorPadre">
        <h2> Listado de códigos postales</h2>
        <div class="linea">
            <div class="buscador">
                <buscadorCP/>
            </div>                                
        </div>

        <div class="tablaContainer animate__animated animate__fadeIn animate__fast">
            <table>
                <thead>
                    <tr>
                        <th class="col-s col-start"> País </th>
                        <th class="col-s"> Código Postal </th>
                        <th class="col-s col-start"> Estado </th>
                        <th class="col-s col-start"> Municipio </th>
                        <th class="col-auto col-start"> Localidad </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(cp, index) in ListadoCP" :key="index" :class="{td1: index % 2 == 0, td2: index % 2 != 0}">
                        <td class="col-xs"> {{ cp.pais }} </td>
                        <td class="col-xs"> {{ cp.codigo_postal }} </td>
                        <td class="col-xs"> {{ cp.estado }} </td>
                        <td class="col-xs"> {{ cp.municipio }} </td>
                        <td class="col-auto col-start"> {{ cp.localidad }} </td>
                    </tr>
                </tbody>
            </table>
        </div>
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
/*     height: 31rem;
    min-width: 31rem; */
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