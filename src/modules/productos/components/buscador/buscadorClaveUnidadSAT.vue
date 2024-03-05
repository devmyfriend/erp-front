<template>
    <div class="contenedor">
        <input type="text" placeholder="Clave Unidad SAT">
        <img src="@/assets/img/buscador.svg" alt="Icono de buscador" class="iconoBuscador" @click="buscar(txtBusqueda)">
    </div>
</template>

<script setup>
import { Swal } from 'sweetalert2/dist/sweetalert2';
import { ref } from 'vue';
const emit = defineEmits('eBusqueda');

const txtBusqueda = ref('');

function buscar() {
    if (txtBusqueda.value === '') { 
    }else{
    }
}
</script>

<style scoped>
input{
    width: 29rem;
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
.contenedor{
    display: flex;
    align-items: center;
    justify-content: left;
    margin-bottom: 1.5rem;
}
</style>