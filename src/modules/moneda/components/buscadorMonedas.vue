<template>
    <div class="main">
        <input type="text" v-model="txtBusqueda" @keyup.enter="buscar(txtBusqueda)" placeholder="Peso Argentino">
        <img src="@/assets/img/buscador.svg" alt="Icono de buscador" class="iconoBuscador" @click="buscar(txtBusqueda)">
    </div>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits('eBusqueda');
const { useMonedas } = require('../store/moneda.js')
const store = useMonedas();

const txtBusqueda = ref('');

function buscar() {
    if (txtBusqueda.value === '') {
        emit('eBusqueda');
    }else{
        store.buscarMoneda(txtBusqueda.value).then(() => {
            emit ('eBusqueda', txtBusqueda.value);
        });
    }
}
</script>

<style scoped>
.main{
    display: flex;
    align-items: center;
    width: 100%;
}
input{
    width: 29rem;
    height: 2.1875rem;
    border: 1px solid #d9d9d9;
    border-radius: 0.3125rem;
    padding-left: 1rem;
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
</style>