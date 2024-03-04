<template>
    <div class="buscador">
        <input type="text" v-model="txtBusqueda" @keyup.enter="buscar(txtBusqueda)" placeholder="Coca-Cola 600ml">
        <img src="@/assets/img/buscador.svg" alt="Icono de buscador" class="IconoBuscador" @click="buscar(txtBusqueda)">
    </div>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits('eBusqueda');
const { useProductos } = require('@/modules/productos/store/productos.js')
const store = useProductos();

const txtBusqueda = ref('');

function buscar() {
    if (txtBusqueda.value === '') {
        store.cargarProductos().then(() => {
            emit('eBusqueda');
        });    
    }else{
        store.busquedaProductos(txtBusqueda.value).then(() => {
            emit ('eBusqueda');
        });
    }
}
</script>

<style scoped>
.buscador{
    display: flex;
    align-items: center;
}
input{
    width: 31rem;
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
.IconoBuscador{
    cursor: pointer;
    margin-left: 1rem;
}
</style>