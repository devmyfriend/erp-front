<template>
    <div class="buscadorEmpresa">
        <input type="text" v-model="txtBusqueda" @keyup.enter="buscar(txtBusqueda)" placeholder="iva 16%">
        <img src="@/assets/img/buscador.svg" alt="Icono de buscador" class="iconoBuscador" @click="buscar(txtBusqueda)">
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useImpuestos } from '@/modules/impuestos/store/impuestos.js';
const emit = defineEmits('eBusqueda');
const store = useImpuestos();
const txtBusqueda = ref('');

function buscar(texto) {
    if (txtBusqueda.value === '') {
        store.cargarImpuestosPropios().then(() => {
            emit('eBusqueda');
        });   
    } else {
        store.buscarImpuestoPropios(texto).then((res) => {
            if(res) {
                emit ('eBusqueda', texto);
            } else {
                emit ('eBusqueda');
            }
        });
    }
    txtBusqueda.value = '';
}
</script>

<style scoped>
input{
    width: 20rem;
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