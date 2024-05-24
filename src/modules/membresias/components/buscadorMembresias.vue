<script setup>
import { ref, watch } from 'vue'
import { useMembresias } from '../store/membresias';
import Swal from 'sweetalert2';

const emit = defineEmits('eBusqueda');

const store = useMembresias();
const txtBusqueda = ref('');
const opcBusqueda = ref(0);

const buscarTexto = (texto, opc) => {
    console.log('La opcion es: ' + opc + ' y el texto es: ' + txtBusqueda.value);
    if(texto.length <= 0){
        emit('eBusqueda');
    }else{
        if(opc == 1){
            store.buscarMembresiaPorNombre(texto).then((res) => {
                if(res){
                    emit('eBusqueda', texto, 1);
                }else{
                    Swal.fire({
                        title: 'Alerta',
                        text: 'No se encontraron membresías con ese nombre',
                        icon: 'info',
                        confirmButtonText: 'Aceptar'
                    });
                    emit('eBusqueda');
                }
            });
        }else{
            store.buscarMembresiaPorId(texto).then((res) => {
                if(res){
                    emit('eBusqueda', texto, 0);
                }else{
                    Swal.fire({
                        title: 'Alerta',
                        text: 'No se encontró la membresía',
                        icon: 'info',
                        confirmButtonText: 'Aceptar'
                    });
                    emit('eBusqueda');
                }
            });
        }
    }
}
watch(opcBusqueda, () => {
    txtBusqueda.value = '';
});
</script>

<template>
    <div class="buscador">
        <select name="tipoBusqueda" id="tipoBusqueda" v-model="opcBusqueda">
            <option value="0">ID</option>
            <option value="1">Nombre</option>
        </select>
        <input v-if="opcBusqueda == 0" type="number" placeholder="Buscar membresías por Id" v-model="txtBusqueda" @keyup.enter="buscarTexto(txtBusqueda, opcBusqueda)">
        <input v-else type="text" placeholder="Buscar membresías por nombre" v-model="txtBusqueda" @keyup.enter="buscarTexto(txtBusqueda, opcBusqueda)">
        <img src="@/assets/img/buscador.svg" alt="Icono buscador" @click="buscarTexto(txtBusqueda, opcBusqueda)">
    </div>
</template>

<style scoped>
input,select{
    height: 2.1875rem;
    color: #000;
    border: 1px solid #999;
    background-color: #fff;
    border-radius: 0.3125rem;
    padding-left: 1rem;
    font-size: 1rem;
    flex-grow: 1;
}
select{
    max-width: 8rem;
    border-right: none;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
}
input{
    border-left: none;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
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
