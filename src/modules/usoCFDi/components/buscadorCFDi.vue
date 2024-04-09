<template>
    <div class="contenedor">
        <input type="text" placeholder="Gastos en general" v-model="txtBusqueda" @keyup.enter="buscar(txtBusqueda)">
        <img src="@/assets/img/buscador.svg" alt="Icono de buscador" class="iconoBuscador" @click="buscar(txtBusqueda)">
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
const { useCFDi } = require('../store/CFDi.js')
const emit = defineEmits('eBusqueda');
const store = useCFDi();


const txtBusqueda = ref('');
const txtLargo = computed(() => txtBusqueda.value.toString().length);

function buscar(txt) {

    if (txtBusqueda.value === '' || txtLargo.value == 0) {
        emit('eBusqueda', '');
    }
    else{
        store.buscarCFDi(txtBusqueda.value).then(() => {
            emit('eBusqueda', txt);
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