<template>
    <div class="buscadorEmpresa">
        <input type="text" v-model="txtBusqueda" @keyup.enter="buscar(txtBusqueda)" placeholder="Nombre Oficial">
        <img src="@/assets/img/buscador.svg" alt="Icono de buscador" class="iconoBuscador" @click="buscar(txtBusqueda)">
    </div>
</template>

<script setup>
import { Swal } from 'sweetalert2/dist/sweetalert2';
import { ref } from 'vue';
const emit = defineEmits('eBusqueda');
const { useEmpresas } = require('@/modules/empresas/store/empresas.js')
const store = useEmpresas();

const txtBusqueda = ref('');

function buscar() {
    if (txtBusqueda.value === '') {
        store.cargarEmpresas().then(() => {
            emit('eBusqueda', true);
        });    
    }else{
        store.busquedaEmpresas(txtBusqueda.value).then(() => {
            emit ('eBusqueda', true);
        });
    }
}
</script>

<style scoped>
input{
    width: 29rem;
    height: 2.1875rem;
    color: #CBCBCB;
    border: none;
    border-radius: 0.3125rem;
}
input:focus{
    outline: none;
}
input::placeholder{
    color: #CBCBCB;
    padding-left: 1rem;
}
img{
    cursor: pointer;
    height: 1.375rem;
    margin-left: 0.5rem;
}
.buscardorEmpresa{
    margin-right: 1.5rem;
}
</style>