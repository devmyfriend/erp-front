<template>
    <div class="contenedor">
        <input type="text" placeholder="Efectivo" v-model="txtBusqueda" @keyup.enter="buscar(txtBusqueda)">
        <img src="@/assets/img/buscador.svg" alt="Icono de buscador" class="iconoBuscador" @click="buscar(txtBusqueda)">
    </div>
</template>

<script setup>
import Swal from 'sweetalert2';
import { ref } from 'vue';
const { useFormasMetodosPago } = require('../store/formasPago.js')
const store = useFormasMetodosPago();
const emit = defineEmits('eBusqueda');

const txtBusqueda = ref('');

function buscar(val) {
    if (txtBusqueda.value === '') {
        store.cargarFormasMetodos().then(() => {
            emit('eBusqueda', val);
        });
    }else{
        store.buscarFormasPago(txtBusqueda.value).then((res) => {
            if(res){
                emit('eBusqueda', val);
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Forma de pago no encontrada',
                    showConfirmButton: false,
                    timer: 1000
                });
                emit('eBusqueda', '');
            }
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