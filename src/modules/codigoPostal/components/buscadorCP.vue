<template>
    <div class="contenedor">
        <input type="text" placeholder="77500" v-model="txtBusqueda" minlength="4" maxlength="5" @keyup.enter="buscar(txtBusqueda)">
        <img src="@/assets/img/buscador.svg" alt="Icono de buscador" class="iconoBuscador" @click="buscar(txtBusqueda)">
    </div>
</template>

<script setup>
import Swal from 'sweetalert2';
import { ref } from 'vue';
const { useCodigosPostales } = require('../store/codigosPostales.js')
const store = useCodigosPostales();

const txtBusqueda = ref('');

function buscar() {
    if (txtBusqueda.value === '') {
        Swal.fire({
            icon: 'info',
            title: 'Ingrese un valor para buscar',
            showConfirmButton: false,
            timer: 1000
        });
    }else{
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
</style>