<template>
    <div class="contenedor">
        <input type="number" placeholder="77500" v-model="txtBusqueda" @keyup.enter="buscar(txtBusqueda)">
        <img src="@/assets/img/buscador.svg" alt="Icono de buscador" class="iconoBuscador" @click="buscar(txtBusqueda)">
    </div>
</template>

<script setup>
import Swal from 'sweetalert2';
import { computed, ref } from 'vue';
const { useCodigosPostales } = require('../store/codigosPostales.js')
const store = useCodigosPostales();

const txtBusqueda = ref('');
const txtLargo = computed(() => txtBusqueda.value.toString().length);

function buscar(txt) {

    if (txtBusqueda.value === '' || txtLargo.value == 0) {
        Swal.fire({
            icon: 'info',
            title: 'Ingrese un CP para buscar',
            showConfirmButton: false,
            timer: 1000
        });
    }else if(txtLargo.value < 4 || txtLargo.value > 5){
        Swal.fire({
            icon: 'info',
            title: 'Ingrese un CP de entre 4 y 5 dígitos',
            showConfirmButton: false,
            timer: 1000
        });
    }
    else{
        //store y swal.fire con el resultado
        store.buscarCodigosPostales(txtBusqueda.value).then(() => {
        });
    }

    txtBusqueda.value = '';
}
</script>

<style scoped>
input{
    height: 2.1875rem;
    color: #000;
    border: 1px solid #D9D9D9;
    border-radius: 0.3125rem;
    padding-left: 1rem;
}
input{
    width: 29rem;
}
input:focus{
    outline: none;
}
input::placeholder{
    color: #CBCBCB;
}
img{
    cursor: pointer;
    height: 1.375rem;
    margin-left: 1rem;
}
.contenedor{
    display: flex;
    align-items: center;
    justify-content: left;
}
input[type="number"]::-webkit-inner-spin-button, 
input[type="number"]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
</style>