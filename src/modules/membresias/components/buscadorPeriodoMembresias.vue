<script setup>
import { ref } from 'vue'
import { useMembresias } from '../store/membresias';
import Swal from 'sweetalert2';

const emit = defineEmits('eBusqueda');

const store = useMembresias();
const txtBusqueda = ref('');

const buscarTexto = (texto) => {
    if(texto.length <= 0){
        emit('eBusqueda');
    }else{
        store.buscarPeriodoMembresiasPorNombre(texto).then((res) => {
            if(res){
                emit('eBusqueda', texto);
            }else{
                emit('eBusqueda');
            }
        });
    }
}
</script>

<template>
    <div class="buscador">
        <input type="text" placeholder="Buscar periodos membresía por Nombre" v-model="txtBusqueda" @keyup.enter="buscarTexto(txtBusqueda)">
        <img src="@/assets/img/buscador.svg" alt="Icono buscador" @click="buscarTexto(txtBusqueda)">
    </div>
</template>

<style scoped>
input{
    height: 2.1875rem;
    color: #000;
    border: 1px solid #999;
    border-radius: 0.3125rem;
    padding-left: 1rem;
    font-size: 1rem;
    flex-grow: 1;
}
input:focus, input::placeholder{
    outline: none;
}
input::placeholder{
    color: #353535;
}
img{
    cursor: pointer;
    height: 1.375rem;
    margin-left: 1rem;
}
.buscador{
    display: flex;
    align-items: center;
    max-height: 2.1875rem;
    flex-grow: 1;
}

input[type="number"]::-webkit-inner-spin-button, 
input[type="number"]::-webkit-outer-spin-button{ 
  -webkit-appearance: none; 
  margin: 0; 
  display: none;
}
</style>
