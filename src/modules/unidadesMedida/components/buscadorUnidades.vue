<template>
    <div class="contenedor">
        <select name="tipoBusqueda" id="tipoBusqueda" v-model="modoBusqueda">
            <option value="Clave">Clave:</option>
            <option value="Nombre">Nombre:</option>
        </select>
        <input type="text" placeholder="05" v-model="txtBusqueda" v-if="modoBusqueda=='Clave'" minlength="1" maxlength="3" @keyup.enter="buscar(txtBusqueda)">
        <input type="text" placeholder="Caja" v-model="txtBusqueda" v-if="modoBusqueda=='Nombre'" minlength="1" @keyup.enter="buscar(txtBusqueda)">
        <img src="@/assets/img/buscador.svg" alt="Icono de buscador" class="iconoBuscador" @click="buscar(txtBusqueda)">
    </div>
</template>

<script setup>
import Swal from 'sweetalert2';
import { ref, watch } from 'vue';
const emit = defineEmits('eBusqueda');
const { useUnidades } = require('../store/unidades.js')
const store = useUnidades();

const txtBusqueda = ref('');
const modoBusqueda = ref('Clave');

function buscar() {
    if (txtBusqueda.value === '') {
        store.cargarUnidades(1).then(() => {
            emit('eBusqueda', '');
        });
    }else{
        store.buscarUnidades(txtBusqueda.value, modoBusqueda.value).then((res) => {
            if(res){
                if(res.response.length === 0){
                    Swal.fire({
                        icon: 'info',
                        title: 'No se encontraron resultados',
                        showConfirmButton: false,
                        timer: 1000
                    });
                    store.cargarUnidades(1);
                    emit('eBusqueda', '');
                }else{
                    emit('eBusqueda', txtBusqueda.value);
                }
            }
        });
    }
}

watch(modoBusqueda, () => {
    console.log('modoBusqueda: ', modoBusqueda.value);
    txtBusqueda.value = '';
});
</script>

<style scoped>
input, select{
    height: 2.1875rem;
    color: #000;
    border: 1px solid #D9D9D9;
    border-radius: 0.3125rem;
    padding-left: 1rem;
}
input{
    width: 29rem;
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
select{
    width: 6rem;
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
}
input:focus, select:focus{
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