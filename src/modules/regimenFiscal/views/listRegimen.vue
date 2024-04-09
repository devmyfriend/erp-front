<script setup>
import { ref } from 'vue';
import buscadorRegimenes from '../components/buscadorRegimenes.vue';
import { useRegimenFiscal } from '../store/regimenesFiscales.js';
import Swal from 'sweetalert2';

const store = useRegimenFiscal();
const ListadoRegimenes = ref([
    {
        ClaveRegimenFiscal: '',
        Descripcion: '',
        Fisica: '',
        Moral: '',
        Activo: 0
    }
]);

const example = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);


store.cargarRegimenFiscal().then(() => {
    ListadoRegimenes.value = store.getRegimenFiscal;
});

function esperarBusqueda(txt) {
    if (txt === '') {
        console.log('Buscando: ' + txt);
        store.cargarRegimenFiscal().then(() => {
            ListadoRegimenes.value = store.getRegimenFiscal;
        });
    } else {
        console.log('Buscando: ' + txt);
        store.buscarRegimenFiscal(txt).then((res) => {
            if (res.length === 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'No se encontraron resultados',
                    showConfirmButton: false,
                    timer: 1000
                });
            }else{
                ListadoRegimenes.value = res;
            }
        });
    }
}
</script>

<template>
    <header>
        <h1> Regimenes fiscales </h1>
    </header>
    <div class="contenedorPadre">
        <h2> Listado de regimenes fiscales </h2>
        <div class="linea">
            <div class="buscador">
                <buscadorRegimenes
                    @eBusqueda="esperarBusqueda"
                />
            </div>
        </div>

        <div class="tablaContainer animate__animated animate__fadeIn animate__fast">
            <table>
                <thead>
                    <tr>
                        <th class="col-xs col-start"> Clave </th>
                        <th class="col-auto col-start"> Descripción </th>
                        <th class="col-s"> Física </th>
                        <th class="col-s"> Moral </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(RegimenFiscal, index) in ListadoRegimenes" :key="index">
                        <td class="col-xs col-start"> {{ RegimenFiscal.ClaveRegimenFiscal }} </td>
                        <td class="col-auto col-start"> {{ RegimenFiscal.Descripcion }} </td>
                        <td class="col-s"> 
                            {{ typeof RegimenFiscal.Fisica === 'boolean' ? 
                            (RegimenFiscal.Fisica ? 'Aplica' : 'No Aplica') : 
                            (typeof RegimenFiscal.Fisica === 'number' && RegimenFiscal.Fisica === 1 ? 
                            'Aplica' : (typeof RegimenFiscal.Fisica === 'number' && RegimenFiscal.Fisica === 0 ?
                            'No Aplica' : RegimenFiscal.Fisica)) }} 
                        </td>
                        <td class="col-s"> 
                            {{ typeof RegimenFiscal.Moral === 'boolean' ? 
                            (RegimenFiscal.Moral ? 'Aplica' : 'No Aplica') :
                            (typeof RegimenFiscal.Moral === 'number' && RegimenFiscal.Moral === 1 ?
                            'Aplica' : (typeof RegimenFiscal.Moral === 'number' && RegimenFiscal.Moral === 0 ?
                            'No Aplica' : RegimenFiscal.Moral)) }} 
                        </td>
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


.contenedorPadre {
    background-color: #fff;
    width: 100%;
    height: 51rem;
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
.linea{
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.buscador{
    width: 30%;
}



input, select{
    height: 2.1875rem;
    color: #000;
    border: 1px solid #D9D9D9;
    border-radius: 0.3125rem;
    padding-left: 1rem;
}
input:disabled, select:disabled{
    background-color: #d9d9d9;
    color: #000;
}



.tablaContainer{
    display: flex;
    height: 31rem;
    min-width: 31rem;
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
    background-color: #d9d9d9;
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
</style>