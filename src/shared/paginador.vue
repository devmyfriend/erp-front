//Establecer @change en el input de PaginaActual y lógica para cambiar página al cambiar directamente el input (Es necesario un cambio en la lógica del paginador en back)
<template>
    <div class="paginador">
        <div class="paginacion d-flex align-items-center justify-content-center mx-auto mt-4" style="width: 44rem; height: 1.5rem; font-size: 0.75rem;">
            <img class="btPag h-100 mx-3 bg-light px-3 py-1 rounded" src="@/assets/img/firstIco.svg" alt="Primera página" @click="cambio(0)">
            <img class="btPag h-100 ms-2 me-4 bg-light px-3 py-1 rounded" src="@/assets/img/prevIco.svg" alt="Página anterior" @click="cambio(1)">
            <div class="inp d-flex" style="max-width: 10rem;">
                <input class="w-50 ms-1 bg-light text-center border-0 text-decoration-underline rounded" type="number" v-model="PaginaActual">
                <img class="h-100 mx-3 px-0 py-1" src="@/assets/img/midIco.svg" alt="separador">
                <input class="w-50 ms-1 bg-light text-center border-0 text-decoration-underline rounded" type="number" v-model="PaginaMaxima" disabled>
            </div>
            <img class="btPag h-100 ms-4 me-2 bg-light px-3 py-1 rounded" src="@/assets/img/nxtIco.svg" alt="Página siguiente" @click="cambio(2)">
            <img class="btPag h-100 mx-3 bg-light px-3 py-1 rounded" src="@/assets/img/lastIco.svg" alt="Última página" @click="cambio(3)">
        </div>
    </div>
</template>

<script>
import { defineProps, defineEmits , ref, onUpdated, computed } from 'vue';
const { useEmpresas } = require('../modules/empresas/store/empresas')

export default {
    name: 'Paginador',
    emits: ['nuevaPagina', 'nuevaLista'],
    props: {
        pagina: {
            type: Array,
            required: true
        },
        lista: {
            type: Array,
            required: true
        }
    },

    setup(props , { emit }) {
        const store = useEmpresas();
        let PaginaActual = ref(1);
        let PaginaMaxima = ref(1);
        let lista = ref( [] );

        computed(() => {
            lista.value = props.lista;
            PaginaActual.value = props.pagina.PaginaActual;

        })
        onUpdated(() => {
            PaginaMaxima.value = props.pagina.PaginaMaxima;
        })
        function cambio(opcion){
            store.paginador(opcion).then(() => {
                lista.value = store.getListado;
                PaginaActual.value = store.getPaginas.PaginaActual;
                emit('nuevaPagina', PaginaActual.value);
                emit('nuevaLista', lista.value);
            })
        }   
        return {
            PaginaActual,
            PaginaMaxima,
            cambio
        };
    }
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.paginacion{
    width: 40%;
}
.btPag{
    cursor: pointer;
}
</style>