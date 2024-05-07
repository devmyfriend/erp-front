<template>
    <div class="mainContainer">
        <input type="text" placeholder="Clave Unidad SAT" @keyup.enter="buscar(txtBusqueda)" v-model="txtBusqueda">
        <img src="@/assets/img/buscador.svg" alt="Icono de buscador" class="iconoBuscador" @click="buscar(txtBusqueda)">
    </div>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits('eBusqueda');
import { useProductos } from '../../store/productos';
const store = useProductos();

const txtBusqueda = ref('');

function buscar(texto) {
    if (texto === '') {
        store.cargarClavesUnidades(1).then(() => {
            emit('eBusqueda');
        });
    }else{
        store.buscarClavesUnidades(texto).then((res) => {
            if (res) {
                emit('eBusqueda', texto);
            }else{
                emit('eBusqueda');
            }
        });
    }
}
</script>

<style scoped>
input{
    flex-grow: 1;
    height: 2.1875rem;
    color: #CBCBCB;
    border: 1px solid #D9D9D9;
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
.mainContainer{
    display: flex;
    align-items: center;
    justify-content: left;
    margin-bottom: 1.5rem;
}
</style>