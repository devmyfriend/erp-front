<template>
    <div class="buscador">
        <input type="text" v-model="txtBusqueda" @keyup.enter="buscar(txtBusqueda)" placeholder="Peso Argentino">
        <img src="@/assets/img/buscador.svg" alt="Icono de buscador" class="iconoBuscador" @click="buscar(txtBusqueda)">
    </div>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits('eBusqueda');
const { useEmpresas } = require('@/modules/empresas/store/empresas.js')
const store = useEmpresas();

const txtBusqueda = ref('');

function buscar() {
    if (txtBusqueda.value === '') {
        store.cargarEmpresas().then(() => {
            emit('eBusqueda');
        });    
    }else{
        store.busquedaEmpresas(txtBusqueda.value).then(() => {
            emit ('eBusqueda');
        });
    }
}
</script>

<style scoped>
.buscador{
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
}
input{
    width: 41rem;
    height: 2.1875rem;
    color: #CBCBCB;
    border: none;
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
    margin-left: 0.5rem;
}
</style>